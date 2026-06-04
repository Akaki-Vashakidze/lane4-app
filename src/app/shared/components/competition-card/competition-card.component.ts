import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedService } from '../../services/shared.service';
import { Router, RouterModule } from '@angular/router';
import { Event } from '../../interfaces/interfaces';
import { I18nService } from '../../services/i18n.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-competition-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterModule,TranslateModule],
  templateUrl: './competition-card.component.html',
  styleUrl: './competition-card.component.scss'
})
export class CompetitionCardComponent {
  @Input() text: string = 'text';
  @Input() title: string = 'title';
  @Input() Event!: Event;
  @Input() date!: Date;
  @Input() height: string = '100%';
  @Input() paddingBottom: string = '';
  @Input() width: string = '100%';
  @Input() fontSize: string = '12px';

  lang = signal<string>('en');
  constructor(private _sharedService: SharedService, private _router: Router, private _i18nService:I18nService) { 
        this._i18nService.changedLang
          .pipe(takeUntilDestroyed())
          .subscribe(lang => this.lang.set(lang || 'en'));
  }

  async getRankingsPdf() {
    
    (await this._sharedService.getEventResultsPDF(this.Event._id,this.lang())).subscribe((res: any) => {
      let blob: Blob = res as Blob
      let url = window.URL.createObjectURL(blob)
    })
  }

  navigateToCompResults() {
    this._router.navigate(['/competitions/results/' + this.Event._id])
  }

  navigateToCompSummary() {
    this._router.navigate(['/competitions/summary/' + this.Event._id])
  }
}
