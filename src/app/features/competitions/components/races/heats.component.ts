import { Component, signal, WritableSignal } from '@angular/core';
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

@Component({
  selector: 'app-heats',
  standalone: true,
  imports: [CommonModule, MatTabsModule, RouterModule, TranslateModule, MatIconModule, LoaderSpinnerComponent, CustomTabsComponent, TimeComponent,TimeComponent],
  templateUrl: './heats.component.html',
  styleUrl: './heats.component.scss'
})
export class HeatsComponent {
  lang = signal<string>('en');
  resultsOpen!: any;
  eventId!: string;
  event: any;
  activeTabIndex!: number;
  partitions!: EventPartition[];
  partitionTitles!: string[];
  chosenPartition: WritableSignal<EventPartition | any> = signal('')
  chosenHeats!:Heat[];
  printLoader = signal<any>(false);
  racesLoading = signal<boolean>(false);
  heatsLoadingIndex: number | null = null;
  constructor(
    private _sharedService:SharedService,
    private route: ActivatedRoute,
    private _competitionService: CompetitionService,
    private _i18nService: I18nService
  ) {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.eventId = params.id
      }
    })
    this._i18nService.changedLang
      .pipe(takeUntilDestroyed())
      .subscribe(lang => {
        this.lang.set(lang || 'en')
        this.partitionTitles = this.partitions?.map(item => (this.lang() === 'ka' ? item.title : item?.translations?.en?.title ?? item.title))
      }
    );

    this._competitionService.getEventInfo(this.eventId).subscribe(event => {
      this.event = event;
    });

    this._competitionService.getEventPartitions(this.eventId).subscribe(partitions => {
      const sortedPartitions = [...partitions].sort((a: any, b: any) => {
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
      this.partitionTitles = this.partitions.map(item => (this.lang() === 'ka' ? item.title : item?.translations?.en?.title ?? item.title))

      if (this.partitions.length > 0) {
        this.selectPartition(this.partitions[0]);
      }
    });
  }

  private selectPartition(partition: EventPartition) {
    this.chosenPartition.set(partition);
    if (!partition.races) {
      this.loadRaces(partition);
    }
  }

  private loadRaces(partition: EventPartition) {
    this.racesLoading.set(true);
    this._competitionService.getPartitionRaces(this.eventId, partition._id).subscribe(races => {
      partition.races = races.sort((a, b) => a.orderNumber - b.orderNumber);
      this.racesLoading.set(false);
    });
  }

   isDeadlinePassed(registrationEndDate:Date) {
    const currentDate = new Date();
    const endDate = new Date(registrationEndDate);
    return currentDate > endDate;
}

  onPrint(event: any) {
    this.printLoader.set(true)
    this._sharedService.getEventHeatsPDF(this.eventId).subscribe({
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

  onTabChange(index: number) {
    this.activeTabIndex = index;
    this.resultsOpen = 999
    this.selectPartition(this.partitions[index]);
  }

  openResults(index: number, race: Race) {
    if (!race.heats) {
      this.heatsLoadingIndex = index;
      this._competitionService.getRaceHeats(this.eventId, race.partition, race._id).subscribe(heats => {
        race.heats = heats;
        this.heatsLoadingIndex = null;
        this.showHeats(index, heats);
      });
      return;
    }
    this.showHeats(index, race.heats);
  }

  private showHeats(index: number, heats: Heat[]) {
    this.chosenHeats = heats;
    this.chosenHeats.sort((a: any, b: any) => a.orderNumber - b.orderNumber);
    this.resultsOpen != index ? this.resultsOpen = index : this.resultsOpen = 999;
  }

  onTabChanged(event: any) {
    this.resultsOpen = 999;
    this.selectPartition(this.partitions[event.index]);
  }
}
