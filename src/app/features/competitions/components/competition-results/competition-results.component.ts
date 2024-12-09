import { Component, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventPartition, Lane, Heat } from '../../../../shared/interfaces/interfaces';
import { CompetitionService } from '../../services/competition.service';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { LoaderSpinnerComponent } from '../../../../shared/components/loader-spinner/loader-spinner.component';
import { CustomTabsComponent } from '../../../../shared/components/custom-tabs/custom-tabs.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-competition-results',
  standalone: true,
  imports: [CommonModule, MatTabsModule, TranslateModule, MatIconModule, LoaderSpinnerComponent, CustomTabsComponent],
  templateUrl: './competition-results.component.html',
  styleUrl: './competition-results.component.scss'
})
export class CompetitionResultsComponent {
  resultsOpen!: any;
  eventId!: string;
  event: any;
  activeTabIndex!: number;
  partitions!: EventPartition[];
  partitionTitles!: string[];
  chosenPartition: WritableSignal<EventPartition | any> = signal('')
  allChosenResults!: Lane[];
  allAthletesInHeatsArr: Lane[] = []
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
      res.partitions.map((partition, partitionIndex) => {
        partition.races.map((race, raceIndex) => {
          let isPublished = race.heats.some(heat => {
            return heat.lanes.some(lane => {
              return lane.result;
            })
          })
          res.partitions[partitionIndex].races[raceIndex].isPublished = isPublished;
        })
      })
      console.log(res)
      this.event = res.event;
      this.partitions = res.partitions;
      this.partitionTitles = this.partitions.map(item => item.title)
      this.chosenPartition.set(this.partitions[0])
      this.chosenPartition().races.sort((a: any, b: any) => a.orderNumber - b.orderNumber);
      console.log(this.chosenPartition())
    })


  }

  onTabChange(index: number) {
    this.activeTabIndex = index;
    this.resultsOpen = 999
    this.chosenPartition.set(this.partitions[index])
  }

  openResults(index: any, heats: any) {
    let lanes = heats.map((heat: Heat) => {
      return heat.lanes
    })
    this.allAthletesInHeatsArr = [];
    for (let i = 0; i < lanes.length; i++) {
      for (let j = 0; j < lanes[i].length; j++) {
        if (lanes[i][j].result && lanes[i][j].result?.seconds) {
          lanes[i][j].totalSeconds = this._competitionService.convertResultToSeconds(lanes[i][j].result)
          this.allAthletesInHeatsArr.push(lanes[i][j])
        }
      }
    }
    this.allAthletesInHeatsArr.sort((a: any, b: any) => a.totalSeconds - b.totalSeconds)
    console.log(this.allAthletesInHeatsArr)
    this.resultsOpen != index ? this.resultsOpen = index : this.resultsOpen = 999;
  }

  onTabChanged(event: any) {
    this.resultsOpen = 999;
    this.chosenPartition.set(this.partitions[event.index])
  }
}
