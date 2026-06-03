import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface EventData {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
}

export interface Participant {
  name: string;
  finaPoint: number;
}

export interface TeamScore {
  podiumParticipantsCount: number;
  firstPlaceCount: number;
  secondPlaceCount: number;
  thirdPlaceCount: number;
}

export interface Team {
  title: string;
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
  imports: [CommonModule],
  templateUrl: './event-summary.component.html',
  styleUrls: ['./event-summary.component.css']
})
export class EventSummaryComponent {
  summary = input.required<OlympicFestivalJson>();

  cleanName(fullName: string): string {
    return fullName.split(' - ')[0];
  }
}
