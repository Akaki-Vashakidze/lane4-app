import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventPartition, Lane, Heat, Event, EventDetails, Race } from '../../../../shared/interfaces/interfaces';
import { CompetitionService } from '../../services/competition.service';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { LoaderSpinnerComponent } from '../../../../shared/components/loader-spinner/loader-spinner.component';
import { forkJoin, map, of, switchMap } from 'rxjs';

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
    this._competitionService.getEventInfo(this.eventId).pipe(
      switchMap(event => this.loadFullPartitions().pipe(
        map(partitions => ({ event, partitions }))
      ))
    ).subscribe(({ event, partitions }) => {
      this.partitions = partitions;
      this.partitionTitles = this.partitions.map(item => item.title);
      this.chosenPartition.set(this.partitions[0]);
      this.event.set({ event, partitions } as unknown as EventDetails);
    });
  }

  private loadFullPartitions() {
    return this._competitionService.getEventPartitions(this.eventId).pipe(
      switchMap(partitions => {
        if (partitions.length === 0) return of([]);
        return forkJoin(partitions.map(partition => this.loadPartitionWithRaces(partition)));
      })
    );
  }

  private loadPartitionWithRaces(partition: EventPartition) {
    return this._competitionService.getPartitionRaces(this.eventId, partition._id).pipe(
      switchMap(races => {
        if (races.length === 0) return of({ ...partition, races: [] as Race[] });
        return forkJoin(races.map(race => this.loadRaceWithHeats(partition._id, race))).pipe(
          map(racesWithHeats => ({
            ...partition,
            races: racesWithHeats.sort((a, b) => a.orderNumber - b.orderNumber)
          }))
        );
      })
    );
  }

  private loadRaceWithHeats(partitionId: string, race: Race) {
    return this._competitionService.getRaceHeats(this.eventId, partitionId, race._id).pipe(
      map(heats => ({ ...race, heats }))
    );
  }

   isDeadlinePassed(registrationEndDate:Date) {
    const currentDate = new Date();
    const endDate = new Date(registrationEndDate);
    return currentDate > endDate;
}

}
