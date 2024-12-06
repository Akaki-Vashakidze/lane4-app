import { Component, signal } from '@angular/core';
import { CompetitionService } from '../../features/competitions/services/competition.service';
import { Event } from '../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { LoaderSpinnerComponent } from '../components/loader-spinner/loader-spinner.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-new-competitions-panel',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, LoaderSpinnerComponent,TranslateModule],
  templateUrl: './new-competitions-panel.component.html',
  styleUrl: './new-competitions-panel.component.scss'
})
export class NewCompetitionsPanelComponent {
  competitions = signal<Event[] | []>([])
  constructor(private _compService:CompetitionService){
    _compService.getAllCompetitions().subscribe(item => {
      console.log(item)
      this.competitions.set(item)
    })
  }
}
