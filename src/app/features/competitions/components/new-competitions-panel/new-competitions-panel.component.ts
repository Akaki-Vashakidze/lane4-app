import { Component, signal } from '@angular/core';
import { CompetitionService } from '../../services/competition.service';
import { Event } from '../../../../shared/interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { LoaderSpinnerComponent } from '../../../../shared/components/loader-spinner/loader-spinner.component';
import { TranslateModule } from '@ngx-translate/core';
import { LabelComponent } from '../../../../shared/components/label/label.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Route, Router, RouterModule } from '@angular/router';
import { SharedService } from '../../../../shared/services/shared.service';

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
