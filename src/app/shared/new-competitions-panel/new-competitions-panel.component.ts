import { Component, signal } from '@angular/core';
import { CompetitionService } from '../../features/competitions/services/competition.service';
import { Event } from '../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { LoaderSpinnerComponent } from '../components/loader-spinner/loader-spinner.component';
import { TranslateModule } from '@ngx-translate/core';
import { LabelComponent } from '../components/label/label.component';
import { ButtonComponent } from "../components/button/button.component";
import { Route, Router, RouterModule } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-new-competitions-panel',
  standalone: true,
  imports: [CommonModule, RouterModule, MatExpansionModule, LoaderSpinnerComponent, ButtonComponent,TranslateModule, LabelComponent, ButtonComponent],
  templateUrl: './new-competitions-panel.component.html',
  styleUrl: './new-competitions-panel.component.scss'
})
export class NewCompetitionsPanelComponent {
  competitions = signal<Event[] | []>([])
  constructor(private _compService:CompetitionService, private _router:Router, private _sharedService:SharedService){
    _compService.getAllCompetitions().subscribe(item => {
      console.log(item)
      this.competitions.set(item)
    })
  }

  async getRankingsPdf(EventId:string) {
    (await this._sharedService.getEventResultsPDF(EventId)).subscribe((res: any) => {
      let blob: Blob = res as Blob
      let url = window.URL.createObjectURL(blob)
    })
  }

  navigateToCompResults(EventId:string) {
    this._router.navigate(['/competitions/results/' + EventId])
  }
}
