import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CompetitionCardComponent } from '../competition-card/competition-card.component';
import { ButtonComponent } from '../button/button.component';
import { V } from '@angular/cdk/keycodes';
import { SharedService } from '../../services/shared.service';
import { LiveEvent } from '../../interfaces/interfaces';

@Component({
  selector: 'app-competitions-list',
  standalone: true,
  imports: [CommonModule,CompetitionCardComponent,ButtonComponent],
  templateUrl: './competitions-list.component.html',
  styleUrl: './competitions-list.component.scss'
})
export class CompetitionsListComponent {
  constructor(private sharedService:SharedService){
    sharedService.getCompetitions().subscribe(item => {
      this.competitions = [...item,...item,...item,...item,...item];
    })
  }
  public competitions:LiveEvent[] = [];
  public displayedCompetitions = 6; 

  loadMore() {
    this.competitions.length > this.displayedCompetitions ? this.displayedCompetitions += 6 : '';
    console.log(this.displayedCompetitions,this.competitions.length )
  }

  loadLess() {
    this.displayedCompetitions > 6 ? this.displayedCompetitions -= 6 : '';
    this.displayedCompetitions < 6 ? this.displayedCompetitions = 6 : '';
    console.log(this.displayedCompetitions,this.competitions.length )
  }
}
