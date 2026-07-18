import { Component, signal, WritableSignal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventPartition, Heat, Race } from '../../../../shared/interfaces/interfaces';
import { CompetitionService } from '../../services/competition.service';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { LoaderSpinnerComponent } from '../../../../shared/components/loader-spinner/loader-spinner.component';
import { CustomTabsComponent } from '../../../../shared/components/custom-tabs/custom-tabs.component';
import { SharedService } from '../../../../shared/services/shared.service';
import { TimeComponent } from "../../../../shared/components/time/time.component";
import { I18nService } from '../../../../shared/services/i18n.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-heats',
  standalone: true,
  imports: [CommonModule, MatTabsModule, RouterModule, TranslateModule, MatIconModule, LoaderSpinnerComponent, CustomTabsComponent, TimeComponent],
  templateUrl: './heats.component.html',
  styleUrl: './heats.component.scss'
})
export class HeatsComponent implements OnInit {
  lang = signal<string>('en');
  resultsOpen!: any;
  eventId!: string;
  event: any;
  activeTabIndex: number = 0;
  partitions: EventPartition[] = [];
  partitionTitles: string[] = [];
  chosenPartition: WritableSignal<EventPartition | any> = signal('');
  chosenHeats: Heat[] = [];
  printLoader = signal<any>(false);
  loadingHeats = signal<boolean>(false);

  constructor(
    private _sharedService: SharedService,
    private route: ActivatedRoute,
    private _competitionService: CompetitionService,
    private _i18nService: I18nService
  ) {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.eventId = params.id;
      }
    });

    this._i18nService.changedLang
      .pipe(takeUntilDestroyed())
      .subscribe(lang => {
        this.lang.set(lang || 'en');
        this.partitionTitles = this.partitions?.map(item => (this.lang() === 'ka' ? item.title : item?.translations?.en?.title ?? item.title));
      });
  }

  ngOnInit() {
    this.getEventDetails();
  }

  getEventDetails() {
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

          this.loadPartitionRaces(currentPartition._id);
        }
      },
      error: (err) => console.error('Error fetching event initial data:', err)
    });
  }

  loadPartitionRaces(partitionId: string) {
    this._competitionService.getPartitionRaces(this.eventId, partitionId).subscribe(races => {
      races.sort((a, b) => a.orderNumber - b.orderNumber);
      if (this.chosenPartition() && this.chosenPartition()._id === partitionId) {
        this.chosenPartition().races = races;
      }
    });
  }

  isDeadlinePassed(registrationEndDate: Date) {
    const currentDate = new Date();
    const endDate = new Date(registrationEndDate);
    return currentDate > endDate;
  }

  onPrint(event: any) {
    this.printLoader.set(true);
    this._sharedService.getEventHeatsPDF(this.eventId).subscribe({
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

  onTabChange(index: number) {
    this.activeTabIndex = index;
    this.resultsOpen = 999;
    this.chosenHeats = [];
    const partition = this.partitions[index];
    this.chosenPartition.set(partition);
    this.loadPartitionRaces(partition._id);
  }

  openResults(index: any, race: Race) {
    if (this.resultsOpen === index) {
      this.resultsOpen = 999;
      this.chosenHeats = [];
      return;
    }

    this.loadingHeats.set(true);
    this._competitionService.getRaceHeats(this.eventId, this.chosenPartition()._id, race._id).subscribe({
      next: (heats: any[]) => {
        this.loadingHeats.set(false);
        if (heats && Array.isArray(heats)) {
          this.chosenHeats = heats.sort((a: any, b: any) => a.orderNumber - b.orderNumber);
        } else {
          this.chosenHeats = [];
        }
        this.resultsOpen = index;
      },
      error: (err) => {
        this.loadingHeats.set(false);
        console.error('Failed to load race heats:', err);
      }
    });
  }

  onTabChanged(event: any) {
    this.resultsOpen = 999;
    this.chosenHeats = [];
    const partition = this.partitions[event.index];
    this.chosenPartition.set(partition);
    this.loadPartitionRaces(partition._id);
  }
}