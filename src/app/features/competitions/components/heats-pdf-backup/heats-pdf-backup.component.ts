import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventPartition, Lane, Heat, Event, EventDetails } from '../../../../shared/interfaces/interfaces';
import { CompetitionService } from '../../services/competition.service';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { LoaderSpinnerComponent } from '../../../../shared/components/loader-spinner/loader-spinner.component';

@Component({
  selector: 'app-heats-pdf-backup',
  standalone: true,
  imports: [CommonModule, MatTabsModule, RouterModule,TranslateModule, MatIconModule, LoaderSpinnerComponent],
  templateUrl: './heats-pdf-backup.component.html',
  styleUrl: './heats-pdf-backup.component.scss'
})
export class HeatsPdfBackupComponent implements OnInit {
  resultsOpen!: any;
  eventId!: string;
  event = signal<EventDetails | null>(null)
  activeTabIndex!: number;
  partitions!: EventPartition[];
  partitionTitles!: string[];
  chosenPartition: WritableSignal<EventPartition | any> = signal('')
  chosenHeats!:Heat[];
  constructor(
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
      this.event.set(res)
      // if(!registrationIsFinished) return
      this.partitions = res.partitions;
      this.partitionTitles = this.partitions.map(item => item.title)
      this.chosenPartition.set(this.partitions[0])
      console.log(this.event)
      // this.event
      this.chosenPartition().races.sort((a: any, b: any) => a.orderNumber - b.orderNumber);
      console.log(this.chosenPartition())
    })
  }

   isDeadlinePassed(registrationEndDate:Date) {
    const currentDate = new Date();
    const endDate = new Date(registrationEndDate);
    return currentDate > endDate;
}

}
