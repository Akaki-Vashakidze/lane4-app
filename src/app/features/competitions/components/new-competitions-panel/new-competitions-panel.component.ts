import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateModule } from '@ngx-translate/core';

import { CompetitionService } from '../../services/competition.service';
import { SharedService } from '../../../../shared/services/shared.service';
import { I18nService } from '../../../../shared/services/i18n.service';

import { Event } from '../../../../shared/interfaces/interfaces';
import { LoaderSpinnerComponent } from '../../../../shared/components/loader-spinner/loader-spinner.component';
import { LabelComponent } from '../../../../shared/components/label/label.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-new-competitions-panel',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatExpansionModule,
    LoaderSpinnerComponent,
    ButtonComponent,
    TranslateModule,
    LabelComponent
  ],
  templateUrl: './new-competitions-panel.component.html',
  styleUrl: './new-competitions-panel.component.scss'
})
export class NewCompetitionsPanelComponent {
  private readonly _compService = inject(CompetitionService);
  private readonly _router = inject(Router);
  private readonly _sharedService = inject(SharedService);
  private readonly _i18nService = inject(I18nService);

  competitions = signal<Event[]>([]);
  lang = signal<string>('en');

  constructor() {
    this._compService.getAllCompetitions()
      .pipe(takeUntilDestroyed())
      .subscribe(item => this.competitions.set(item));

    this._i18nService.changedLang
      .pipe(takeUntilDestroyed())
      .subscribe(lang => this.lang.set(lang || 'en'));
  }

  async getRankingsPdf(eventId: string): Promise<void> {
    const request = await this._sharedService.getEventResultsPDF(eventId);
    
    request.pipe(takeUntilDestroyed()).subscribe((res: any) => {
      const blob = res as Blob;
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    });
  }

  navigateToCompResults(eventId: string): void {
    this._router.navigate(['/competitions/results', eventId]);
  }
}