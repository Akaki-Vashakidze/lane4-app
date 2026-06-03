import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetitionService } from '../../../features/competitions/services/competition.service';
import { ActivatedRoute } from '@angular/router';
import { EventSummaryComponent } from "../event-summary/event-summary.component";


@Component({
  selector: 'app-event-summary-page',
  standalone: true,
  imports: [CommonModule, EventSummaryComponent],
  templateUrl: './event-summary-page.component.html',
  styleUrls: ['./event-summary-page.component.css']
})
export class EventSummaryPageComponent {
  eventId: string = '';
  eventSummery: any;
  constructor(private _compService: CompetitionService, private route: ActivatedRoute) {

    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.eventId = params.id
        if (this.eventId) {
          this._compService.getEventSummary(this.eventId).subscribe(item => {
            this.eventSummery = item;
          })
        }
      }
    })
  }
}
