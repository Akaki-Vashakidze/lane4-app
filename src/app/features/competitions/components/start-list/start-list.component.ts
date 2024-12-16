
// export class StartListComponent {
//   constructor(private _competitionService:CompetitionService, private _activatedRoute:ActivatedRoute){
//     const id = this._activatedRoute.snapshot.paramMap.get('id');
//     _competitionService.getCompetitionStartList(id ?? '').subscribe(item => {
//       console.log(item)
//     })
//   }
// }



import { Component, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventPartition, Lane, Heat, Race, StartListParticipant } from '../../../../shared/interfaces/interfaces';
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
  selector: 'app-start-list',
  standalone: true,
  imports: [CommonModule, MatTabsModule, TranslateModule, MatIconModule, LoaderSpinnerComponent, CustomTabsComponent],
  templateUrl: './start-list.component.html',
  styleUrl: './start-list.component.scss'
})
export class StartListComponent {
  resultsOpen!: any;
  eventId!: string;
  event: any;
  activeTabIndex!: number;
  partitions!: EventPartition[];
  partitionTitles!: string[];
  chosenPartition: WritableSignal<EventPartition | any> = signal('')
  allChosenResults!: StartListParticipant[];
  allAthletesInHeatsArr: StartListParticipant[] = []
  printLoader = signal<any>(false);
  constructor(
    private route: ActivatedRoute,
    private _competitionService: CompetitionService,
    private _sharedService:SharedService
  ) {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.eventId = params.id
      }
    })
  }
  async ngOnInit() {
    this._competitionService.getCompetitionStartList(this.eventId).subscribe(res => {
      this.event = res.event;
      this.partitions = res.partitions.map((partition:any) => {
        return {
            ...partition,
            races: partition.races.sort((a:any, b:any) => a.orderNumber - b.orderNumber)
        };
      });
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

  openResults(index:any,race:any) {
    console.log(this.chosenPartition())
    console.log(race)
    this.allAthletesInHeatsArr = race.participants
    // this.allAthletesInHeatsArr.sort((a: any, b: any) => a.totalSeconds - b.totalSeconds)
    this.resultsOpen != index ? this.resultsOpen = index : this.resultsOpen = 999;
  }


  onPrint(event: any) {
    this.printLoader.set(true)
    this._sharedService.getEventParticipantsPDF(this.eventId).subscribe({
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

  onTabChanged(event: any) {
    this.resultsOpen = 999;
    this.chosenPartition.set(this.partitions[event.index])
  }
}
