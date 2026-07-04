import { Component, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventPartition, Lane, Heat, Race } from '../../../../shared/interfaces/interfaces';
import { CompetitionService } from '../../services/competition.service';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { LoaderSpinnerComponent } from '../../../../shared/components/loader-spinner/loader-spinner.component';
import { CustomTabsComponent } from '../../../../shared/components/custom-tabs/custom-tabs.component';
import { Meta, Title } from '@angular/platform-browser';
import { async } from 'rxjs';
import { SharedService } from '../../../../shared/services/shared.service';
import { SocketService } from '../../../../shared/services/socket.service';
import { I18nService } from '../../../../shared/services/i18n.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormatRaceTimePipe } from './formatRaceTime.pipe';

interface AgeGroupResult {
  groupName: string;
  athletes: Lane[];
}

@Component({
  selector: 'app-competition-results',
  standalone: true,
  imports: [CommonModule, MatTabsModule, TranslateModule, FormatRaceTimePipe, MatIconModule, LoaderSpinnerComponent, CustomTabsComponent],
  templateUrl: './competition-results.component.html',
  styleUrl: './competition-results.component.scss'
})
export class CompetitionResultsComponent {
  lang = signal<string>('en');
  resultsOpen!: any;
  eventId!: string;
  event: any;
  activeTabIndex!: number;
  partitions!: EventPartition[];
  partitionTitles!: string[];
  chosenPartition: WritableSignal<EventPartition | any> = signal('')
  allChosenResults!: Lane[];
  allAthletesInHeatsArr: Lane[] = [];
  groupedAgeResults: AgeGroupResult[] = []; 
  printLoader = signal<any>(false);

  constructor(
    private _sharedService: SharedService,
    private route: ActivatedRoute,
    private _competitionService: CompetitionService,
    private _socket: SocketService,
    private _i18nService: I18nService
  ) {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.eventId = params.id
      }
    })

    this._socket.subscribeOnLive(async (data: any) => {
      if (data.eventId === this.eventId) {
        await this.getEventDetails(() => { this.showRace(data.partition, data.race, data.heat) });
      }
    })

    this._i18nService.changedLang
      .pipe(takeUntilDestroyed())
      .subscribe(lang => {
        this.lang.set(lang || 'en')
        this.partitionTitles = this.partitions?.map(item => (this.lang() === 'ka' ? item.title : item?.translations?.en?.title ?? item?.title))
      }
    );
  }

  async ngOnInit() {
    this.getEventDetails();
  }

  async showRace(partition: string, race: string, heat: string) {
    this.partitions.forEach(p => {
      if (p._id == partition) {
        this.chosenPartition.set(p);
        this.chosenPartition().races.forEach((r: Race, index: number) => {
          if (r._id == race) {
            if (this.resultsOpen == index) {
              this.openResults(index, r.heats, true);
            }
          }
        })
      }
    })
  }

  async getEventDetails(cb?: () => void) {
    this._competitionService.getEventDetails(this.eventId).subscribe(res => {
      this.event = res.event;
      
      if (res.partitions) {
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

        sortedPartitions.forEach(partition => {
          partition.races.forEach(race => {
            race.isPublished = race.heats.some(heat => 
              heat.lanes.some(lane => lane.isPublished === true)
            );
          });
          partition.races.sort((a, b) => a.orderNumber - b.orderNumber);
        });

        this.partitions = sortedPartitions;
        this.partitionTitles = this.partitions.map(item => (this.lang() === 'ka' ? item.title : item?.translations?.en?.title ?? item.title))
        
        if (this.partitions.length > 0) {
          this.chosenPartition.set(this.partitions[0]);
        }
        
        if (cb) cb();
      }
    });
  }
  
  onTabChange(index: number) {
    this.activeTabIndex = index;
    this.resultsOpen = 999
    this.chosenPartition.set(this.partitions[index])
  }

  onPrint(event: any) {
    this.printLoader.set(true)
    this._sharedService.getEventResultsPDF(this.eventId,this.lang()).subscribe({
      next: (res: any) => {
        this.printLoader.set(false)
        const blob = new Blob([res], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
        setTimeout(() => window.URL.revokeObjectURL(url), 1000);
      },
      error: (err) => {
        console.error('Failed to fetch PDF:', err);
      },
    });
  }

  openResults(index: any, heats: any, openFromSocket = false) {
    let lanes = heats.map((heat: Heat) => {
      return heat.lanes
    })
    
    this.allAthletesInHeatsArr = [];
    let ageGroupsMap = new Map<string, Lane[]>();

    for (let i = 0; i < lanes.length; i++) {
      for (let j = 0; j < lanes[i].length; j++) {
        if (lanes[i][j].isPublished && lanes[i][j].result?.seconds) {
          const laneItem = { ...lanes[i][j] };
          laneItem.totalSeconds = this._competitionService.convertResultToSeconds(laneItem.result);
          
          this.allAthletesInHeatsArr.push(laneItem);

          if (laneItem.ageGroups && Array.isArray(laneItem.ageGroups)) {
            let athleteGroups = [...laneItem.ageGroups];
            
            if (athleteGroups.includes('Senior') && !athleteGroups.includes('Absolute')) {
              athleteGroups.push('Absolute');
            }

            athleteGroups.forEach((group: string) => {
              if (group === 'Absolute' || group === 'Senior') return;

              if (!ageGroupsMap.has(group)) {
                ageGroupsMap.set(group, []);
              }
              ageGroupsMap.get(group)!.push({ ...laneItem });
            });
          }
        }
      }
    }
    
    this.allAthletesInHeatsArr.sort((a: any, b: any) => a.totalSeconds - b.totalSeconds);
    this.rankAthletes(this.allAthletesInHeatsArr);

    this.groupedAgeResults = [];
    ageGroupsMap.forEach((athletes, groupName) => {
      athletes.sort((a: any, b: any) => a.totalSeconds - b.totalSeconds);
      this.rankAthletes(athletes);
      this.groupedAgeResults.push({
        groupName: groupName,
        athletes: athletes
      });
    });

    if (openFromSocket) {
      this.resultsOpen = index;
    } else this.resultsOpen != index ? this.resultsOpen = index : this.resultsOpen = 999;
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
    this.chosenPartition.set(this.partitions[event.index])
  }
}