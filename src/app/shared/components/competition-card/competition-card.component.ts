import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-competition-card',
  standalone: true,
  imports: [CommonModule,ButtonComponent,TranslateModule],
  templateUrl: './competition-card.component.html',
  styleUrl: './competition-card.component.scss'
})
export class CompetitionCardComponent {
  @Input() text: string = 'text';
  @Input() title: string = 'title';
  @Input() EventId: string = '';
  @Input() date!:Date;
  @Input() height: string = '100%';
  @Input() width: string = '100%';
  @Input() fontSize: string = '12px';

  constructor(private _sharedService:SharedService, private _router:Router){}

  async getRankingsPdf(){
    (await this._sharedService.getEventResultsPDF(this.EventId)).subscribe((res:any) => {
      let blob:Blob = res as Blob
      let url = window.URL.createObjectURL(blob)
      console.log(blob,url)
      window.open(url)
   })
  }

  navigateToCompResults(){
    this._router.navigate(['/Competitions/results/' + this.EventId])
  }
}
