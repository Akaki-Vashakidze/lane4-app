import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CompetitionCardComponent } from '../competition-card/competition-card.component';
import { ButtonComponent } from '../button/button.component';
import { V } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-competitions-list',
  standalone: true,
  imports: [CommonModule,CompetitionCardComponent,ButtonComponent],
  templateUrl: './competitions-list.component.html',
  styleUrl: './competitions-list.component.scss'
})
export class CompetitionsListComponent {
  public competitions = [
    { 
      title:'comp1',
      text:'text1'
    },
    { 
      title:'comp2',
      text:'text2'
    },
    { 
      title:'comp3',
      text:'text3'
    },
    { 
      title:'comp4',
      text:'text4'
    },
    { 
      title:'comp5',
      text:'text5'
    },
    { 
      title:'comp6',
      text:'text6'
    },
    { 
      title:'comp7',
      text:'text7'
    },
    { 
      title:'comp8',
      text:'text8'
    },
    { 
      title:'comp9',
      text:'text9'
    },
    { 
      title:'comp10',
      text:'text10'
    },
    { 
      title:'comp11',
      text:'text11'
    },
    { 
      title:'comp9',
      text:'text9'
    },
    { 
      title:'comp10',
      text:'text10'
    },
    { 
      title:'comp11',
      text:'text11'
    },
    { 
      title:'comp9',
      text:'text9'
    },
    { 
      title:'comp10',
      text:'text10'
    },
    { 
      title:'comp11',
      text:'text11'
    },
    { 
      title:'comp9',
      text:'text9'
    },
    { 
      title:'comp10',
      text:'text10'
    },
    { 
      title:'comp11',
      text:'text11'
    },
  ]
  public displayedCompetitions = 6; 

  loadMore() {
    this.competitions.length > this.displayedCompetitions ? this.displayedCompetitions += 6 : '';
    console.log(this.displayedCompetitions)
  }

  loadLess(){
    this.displayedCompetitions > 6 ? this.displayedCompetitions -= 6 : '';
    this.displayedCompetitions < 6 ? this.displayedCompetitions = 6 : '';
    console.log(this.displayedCompetitions)
  }
}
