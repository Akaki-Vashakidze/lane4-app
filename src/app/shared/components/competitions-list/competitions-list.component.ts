import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CompetitionCardComponent } from '../competition-card/competition-card.component';
import { ButtonComponent } from '../button/button.component';
import { V } from '@angular/cdk/keycodes';
import { SharedService } from '../../services/shared.service';
import { LiveEvent } from '../../interfaces/interfaces';
import { LoaderSpinnerComponent } from '../loader-spinner/loader-spinner.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-competitions-list',
  standalone: true,
  imports: [CommonModule,CompetitionCardComponent,ButtonComponent, LoaderSpinnerComponent, TranslateModule],
  templateUrl: './competitions-list.component.html',
  styleUrl: './competitions-list.component.scss'
})
export class CompetitionsListComponent {
  @Input() BackgroundImg: boolean = true;
  constructor(private sharedService:SharedService){
    sharedService.getCompetitions().subscribe(item => {
      this.competitions = [...item];
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
