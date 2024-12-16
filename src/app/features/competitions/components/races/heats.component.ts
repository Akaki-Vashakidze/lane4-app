import { Component, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventPartition, Lane, Heat } from '../../../../shared/interfaces/interfaces';
import { CompetitionService } from '../../services/competition.service';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { LoaderSpinnerComponent } from '../../../../shared/components/loader-spinner/loader-spinner.component';
import { CustomTabsComponent } from '../../../../shared/components/custom-tabs/custom-tabs.component';
import { Meta, Title } from '@angular/platform-browser';
import { SharedService } from '../../../../shared/services/shared.service';

@Component({
  selector: 'app-heats',
  standalone: true,
  imports: [CommonModule, MatTabsModule, RouterModule,TranslateModule, MatIconModule, LoaderSpinnerComponent, CustomTabsComponent],
  templateUrl: './heats.component.html',
  styleUrl: './heats.component.scss'
})
export class HeatsComponent {
  resultsOpen!: any;
  eventId!: string;
  event: any;
  activeTabIndex!: number;
  partitions!: EventPartition[];
  partitionTitles!: string[];
  chosenPartition: WritableSignal<EventPartition | any> = signal('')
  chosenHeats!:Heat[];
  printLoader = signal<any>(false);
  constructor(
    private _sharedService:SharedService,
    private route: ActivatedRoute,
    private _competitionService: CompetitionService
  ) {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.eventId = params.id
      }
    })
  }
  async ngOnInit() {
    this._competitionService.getEventDetails(this.eventId).subscribe(res => {
      let registrationIsFinished = this.isDeadlinePassed(res.event.registrationEndDate);
      this.event = res.event;
      if(!registrationIsFinished) return
      this.event = res.event;
      this.partitions = res.partitions.map(partition => {
        return {
            ...partition,
            races: partition.races.sort((a, b) => a.orderNumber - b.orderNumber)
        };
      });
      this.partitionTitles = this.partitions.map(item => item.title)
      this.chosenPartition.set(this.partitions[0])
      this.chosenPartition().races.sort((a: any, b: any) => a.orderNumber - b.orderNumber);
    })


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
    this.chosenPartition.set(this.partitions[index])
  }

  openResults(index: any, heats: any) {
    console.log(heats)
    this.chosenHeats = heats;
    this.chosenHeats.sort((a: any, b: any) => a.orderNumber - b.orderNumber);
    this.resultsOpen != index ? this.resultsOpen = index : this.resultsOpen = 999;
  }

  onTabChanged(event: any) {
    this.resultsOpen = 999;
    this.chosenPartition.set(this.partitions[event.index])
  }
}
