import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { I18nService } from '../../services/i18n.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface EventData {
  _id: string;
  title: string;
  translations?: {
    en?: {
      title: string;
    };
  };
  startDate: string;
  endDate: string;
}

export interface Participant {
  name: string;
  finaPoint: number;
  nameEn: string;
}

export interface TeamScore {
  podiumParticipantsCount: number;
  firstPlaceCount: number;
  secondPlaceCount: number;
  thirdPlaceCount: number;
}

export interface Team {
  title: string;
  translations?: {
    en?: {
      title: string;
    };
  };
  topScores: TeamScore;
}

export interface OlympicFestivalJson {
  event: EventData;
  topParticipantsByGender: {
    MALE: Participant[];
    FEMALE: Participant[];
  };
  topTeams: Team[];
}

@Component({
  selector: 'app-event-summary',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './event-summary.component.html',
  styleUrls: ['./event-summary.component.css']
})
export class EventSummaryComponent {
  summary = input.required<OlympicFestivalJson>();
  lang = signal<string>('en');

  constructor(private _i18nService: I18nService) {
    this._i18nService.changedLang
      .pipe(takeUntilDestroyed())
      .subscribe(lang => {
        this.lang.set(lang || 'en')
      }
      );
  }


  cleanName(fullName: string): string {
    return fullName.split(' - ')[0];
  }

  toUppercaseStart(value?: string): string {
    if (!value) {
      return '';
    }

    const trimmed = value.trim();
    if (!trimmed) {
      return '';
    }

    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  }
}
