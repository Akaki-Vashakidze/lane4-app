

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
  printLoader = signal<any>(false);
  constructor(
    private _sharedService: SharedService,
    private route: ActivatedRoute,
    private _competitionService: CompetitionService,
    private _socket: SocketService
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
      if(res.partitions){
        res.partitions.map((partition, partitionIndex) => {
          partition.races.map((race, raceIndex) => {
            let isPublished = race.heats.some(heat => {
              return heat.lanes.some(lane => lane.isPublished === true);
            });
            res.partitions[partitionIndex].races[raceIndex].isPublished = isPublished;
          });
        
          res.partitions[partitionIndex].races.sort((a, b) => a.orderNumber - b.orderNumber);
        });
        this.partitions = res.partitions;
        this.partitionTitles = this.partitions.map(item => item.title)
        this.chosenPartition.set(this.partitions[0])
        this.chosenPartition().races.sort((a: any, b: any) => a.orderNumber - b.orderNumber);
        if (cb) cb();
      }

    })
  }
  onTabChange(index: number) {
    this.activeTabIndex = index;
    this.resultsOpen = 999
    this.chosenPartition.set(this.partitions[index])
  }

  //download pdf
  // onPrint(event: any) {
  //   this._sharedService.getEventResultsPDF(this.eventId).subscribe({
  //     next: (res: any) => {
  //       const blob = new Blob([res], { type: 'application/pdf' });
  //       const url = window.URL.createObjectURL(blob);
  //       const link = document.createElement('a');
  //       link.href = url;
  //       link.download = `EventResults_${this.eventId}.pdf`;
  //       link.click();
  //       window.URL.revokeObjectURL(url);
  //     },
  //     error: (err) => {
  //       console.error('Failed to fetch PDF:', err);
  //     },
  //   });
  // }

  onPrint(event: any) {
    this.printLoader.set(true)
    this._sharedService.getEventResultsPDF(this.eventId).subscribe({
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
    for (let i = 0; i < lanes.length; i++) {
      for (let j = 0; j < lanes[i].length; j++) {
        if (lanes[i][j].isPublished && lanes[i][j].result?.seconds) {
          lanes[i][j].totalSeconds = this._competitionService.convertResultToSeconds(lanes[i][j].result)
          this.allAthletesInHeatsArr.push(lanes[i][j])
        }
      }
    }
    this.allAthletesInHeatsArr.sort((a: any, b: any) => a.totalSeconds - b.totalSeconds)
    if (openFromSocket) {
      this.resultsOpen = index;
    } else this.resultsOpen != index ? this.resultsOpen = index : this.resultsOpen = 999;
  }

  onTabChanged(event: any) {
    this.resultsOpen = 999;
    this.chosenPartition.set(this.partitions[event.index])
  }
}
