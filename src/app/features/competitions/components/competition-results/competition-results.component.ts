import { Component, signal, WritableSignal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventPartition, Lane, Heat, Race, AgeGroup } from '../../../../shared/interfaces/interfaces';
import { CompetitionService } from '../../services/competition.service';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { LoaderSpinnerComponent } from '../../../../shared/components/loader-spinner/loader-spinner.component';
import { CustomTabsComponent } from '../../../../shared/components/custom-tabs/custom-tabs.component';
import { SharedService } from '../../../../shared/services/shared.service';
import { SocketService } from '../../../../shared/services/socket.service';
import { I18nService } from '../../../../shared/services/i18n.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormatRaceTimePipe } from './formatRaceTime.pipe';
import { forkJoin } from 'rxjs';

interface AgeGroupResult {
  groupId: string;
  groupName: string;
  groupNameEn: string;
  athletes: Lane[];
  yearTo?: number;
  isAbsoluteFallback?: boolean; 
}

@Component({
  selector: 'app-competition-results',
  standalone: true,
  imports: [
    CommonModule, 
    MatTabsModule, 
    TranslateModule, 
    FormatRaceTimePipe, 
    MatIconModule, 
    LoaderSpinnerComponent, 
    CustomTabsComponent
  ],
  templateUrl: './competition-results.component.html',
  styleUrl: './competition-results.component.scss'
})
export class CompetitionResultsComponent implements OnInit {
  lang = signal<string>('en');
  resultsOpen!: any;
  eventId!: string;
  event: any;
  activeTabIndex: number = 0;
  partitions: EventPartition[] = [];
  partitionTitles: string[] = [];
  chosenPartition: WritableSignal<EventPartition | any> = signal('');
  groupedAgeResults: AgeGroupResult[] = []; 
  printLoader = signal<any>(false);
  loadingHeats = signal<boolean>(false);

  constructor(
    private _sharedService: SharedService,
    private route: ActivatedRoute,
    private _competitionService: CompetitionService,
    private _socket: SocketService,
    private _i18nService: I18nService
  ) {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.eventId = params.id;
      }
    });

    this._socket.subscribeOnLive(async (data: any) => {
      if (data.eventId === this.eventId) {
        this.getEventDetails(() => { this.showRace(data.partition, data.race, data.heat) });
      }
    });

    this._i18nService.changedLang
      .pipe(takeUntilDestroyed())
      .subscribe(lang => {
        this.lang.set(lang || 'en');
        this.partitionTitles = this.partitions?.map(item => (this.lang() === 'ka' ? item.title : item?.translations?.en?.title ?? item?.title));
      });
  }

  async ngOnInit() {
    this.getEventDetails();
  }

  async showRace(partition: string, race: string, heat: string) {
    const pIndex = this.partitions.findIndex(p => p._id === partition);
    if (pIndex !== -1) {
      this.activeTabIndex = pIndex;
      this.chosenPartition.set(this.partitions[pIndex]);
      
      this._competitionService.getPartitionRaces(this.eventId, partition).subscribe(races => {
        races.forEach(raceItem => {
          raceItem.isPublished = true; 
        });
        races.sort((a, b) => a.orderNumber - b.orderNumber);
        this.chosenPartition().races = races;

        this.chosenPartition().races.forEach(async (r: Race, index: number) => {
          if (r._id == race) {
            if (this.resultsOpen == index) {
              await this.openResults(index, r, true);
            }
          }
        });
      });
    }
  }

  getEventDetails(cb?: () => void) {
    forkJoin({
      eventInfo: this._competitionService.getEventInfo(this.eventId),
      partitions: this._competitionService.getEventPartitions(this.eventId)
    }).subscribe({
      next: (res) => {
        this.event = res.eventInfo;
        
        if (res.partitions && res.partitions.length > 0) {
          const sortedPartitions = [...res.partitions].sort((a: any, b: any) => {
            const getDateTime = (dateStr: string, timeStr: string) => {
              const date = new Date(dateStr);
              if (!timeStr) return date;
              
              const [time, modifier] = timeStr.split(' ');
              let [hours, minutes] = time.split(':').map(Number);
              
              if (modifier === 'PM' && hours < 12) hours += 12;
              if (modifier === 'AM' && hours === 12) hours = 0;
              
              date.setUTCHours(hours, minutes, 0, 0);
              return date;
            };

            const dateTimeA = getDateTime(a.startDate, a.startTime);
            const dateTimeB = getDateTime(b.startDate, b.startTime);
            return dateTimeA.getTime() - dateTimeB.getTime();
          });

          this.partitions = sortedPartitions;
          this.partitionTitles = this.partitions.map(item => (this.lang() === 'ka' ? item.title : item?.translations?.en?.title ?? item.title));
          
          const currentPartition = this.partitions[this.activeTabIndex] || this.partitions[0];
          this.chosenPartition.set(currentPartition);

          this.loadPartitionRaces(currentPartition._id, cb);
        } else {
          if (cb) cb();
        }
      },
      error: (err) => console.error('Error fetching event initial data:', err)
    });
  }

  loadPartitionRaces(partitionId: string, cb?: () => void) {
    this._competitionService.getPartitionRaces(this.eventId, partitionId).subscribe(races => {
      races.forEach(race => {
        race.isPublished = true; 
      });
      races.sort((a, b) => a.orderNumber - b.orderNumber);
      
      if (this.chosenPartition() && this.chosenPartition()._id === partitionId) {
        this.chosenPartition().races = races;
      }

      if (cb) cb();
    });
  }
  
  onTabChange(index: number) {
    this.activeTabIndex = index;
    this.resultsOpen = 999;
    this.groupedAgeResults = [];
    const partition = this.partitions[index];
    this.chosenPartition.set(partition);
    this.loadPartitionRaces(partition._id);
  }

  onPrint(event: any) {
    this.printLoader.set(true);
    this._sharedService.getEventResultsPDF(this.eventId, this.lang()).subscribe({
      next: (res: any) => {
        this.printLoader.set(false);
        const blob = new Blob([res], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
        setTimeout(() => window.URL.revokeObjectURL(url), 1000);
      },
      error: (err) => {
        this.printLoader.set(false);
        console.error('Failed to fetch PDF:', err);
      },
    });
  }

  async openResults(index: any, race: any, openFromSocket = false) {
    if (!openFromSocket && this.resultsOpen === index) {
      this.resultsOpen = 999;
      this.groupedAgeResults = [];
      return;
    }

    this.loadingHeats.set(true);
    this._competitionService.getRaceHeats(this.eventId, this.chosenPartition()._id, race._id).subscribe({
      next: (heats: any[]) => {
        this.loadingHeats.set(false);
        console.log('Backend response (heats):', heats); // შეამოწმე კონსოლში თუ მოდის მონაცემები
        
        const eventGroups: AgeGroup[] = this.event?.ageGroups || [];
        this.groupedAgeResults = [];
        const allAthletes: Lane[] = [];

        if (heats && Array.isArray(heats)) {
          heats.forEach((heat: any) => {
            if (heat && heat.lanes && Array.isArray(heat.lanes)) {
              heat.lanes.forEach((laneItem: any) => {
                // შევარბილოთ ვალიდაცია, რადგან ზოგჯერ წამები 0-ია ან ცარიელია
                if (laneItem && laneItem.isPublished) {
                  const athleteCopy = { ...laneItem };
                  
                  if (athleteCopy.result) {
                    athleteCopy.totalSeconds = this._competitionService.convertResultToSeconds(athleteCopy.result);
                  } else {
                    athleteCopy.totalSeconds = 99999; // თუ დრო არ აქვს, ბოლოში მოექცეს
                  }
                  
                  // დავამატოთ raceType დამატებითი შემოწმებებისთვის HTML-ში
                  athleteCopy.raceType = race.type;
                  
                  allAthletes.push(athleteCopy);
                }
              });
            }
          });
        }

        console.log('Processed athletes list:', allAthletes);

        if (allAthletes.length === 0) {
          this.resultsOpen = index;
          return;
        }

        if (eventGroups.length === 0) {
          allAthletes.sort((a: any, b: any) => a.totalSeconds - b.totalSeconds);
          this.rankAthletes(allAthletes);

          this.groupedAgeResults = [{
            groupId: 'all_results_fallback',
            groupName: 'შედეგები',
            groupNameEn: 'Results',
            athletes: allAthletes,
            isAbsoluteFallback: true
          }];
        } else {
          let ageGroupsMap = new Map<string, { info: AgeGroup; athletes: Lane[] }>();

          eventGroups.forEach((group: AgeGroup) => {
            ageGroupsMap.set(group._id, {
              info: group,
              athletes: []
            });
          });

          allAthletes.forEach((laneItem) => {
            const targetGroups = laneItem.ageGroups || laneItem.participant?.ageGroups;
            
            if (targetGroups && Array.isArray(targetGroups)) {
              targetGroups.forEach((group: any) => {
                const groupId = typeof group === 'string' ? group : group._id;
                if (ageGroupsMap.has(groupId)) {
                  ageGroupsMap.get(groupId)!.athletes.push({ ...laneItem });
                }
              });
            } else {
              // თუ ათლეტს საერთოდ არ უზის ჯგუფი, დეფოლტად პირველ ჯგუფში მაინც ჩავაგდოთ ტესტისთვის
              if (eventGroups.length > 0) {
                ageGroupsMap.get(eventGroups[0]._id)!.athletes.push({ ...laneItem });
              }
            }
          });

          const rawGroupedResults: AgeGroupResult[] = [];
          
          eventGroups.forEach((group: AgeGroup) => {
            const groupData = ageGroupsMap.get(group._id);
            
            if (groupData && groupData.athletes.length > 0) {
              groupData.athletes.sort((a: any, b: any) => a.totalSeconds - b.totalSeconds);
              this.rankAthletes(groupData.athletes);
              
              rawGroupedResults.push({
                groupId: group._id,
                groupName: group.name,
                groupNameEn: group.nameEn || group.name,
                athletes: groupData.athletes,
                yearTo: group.yearTo
              });
            }
          });

          this.groupedAgeResults = rawGroupedResults.sort((a, b) => {
            const yearToA = a.yearTo !== undefined && a.yearTo !== null ? a.yearTo : Infinity;
            const yearToB = b.yearTo !== undefined && b.yearTo !== null ? b.yearTo : Infinity;
            return yearToB - yearToA;
          });
        }

        this.resultsOpen = index;
      },
      error: (err) => {
        this.loadingHeats.set(false);
        console.error('Failed to load heats:', err);
      }
    });
  }

  private rankAthletes(athletesList: Lane[]) {
    athletesList.forEach((athlete: any, index: number) => {
      if (index === 0) {
        athlete.orderNumber = 1;
      } else {
        const prev = athletesList[index - 1] as any;
        if (athlete.totalSeconds === prev.totalSeconds) {
          athlete.orderNumber = prev.orderNumber;
        } else {
          athlete.orderNumber = index + 1;
        }
      }
    });
  }

  onTabChanged(event: any) {
    this.resultsOpen = 999;
    this.groupedAgeResults = [];
    const partition = this.partitions[event.index];
    this.chosenPartition.set(partition);
    this.loadPartitionRaces(partition._id);
  }
}