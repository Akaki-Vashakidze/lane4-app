import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EventDetails, Time } from '../../../shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  constructor() { }
  private readonly httpClient = inject(HttpClient);

  getEventDetails(eventId:string) {
    return this.httpClient.get<EventDetails>(`/consoleApi/event/details/${eventId}`)
  }

  convertResultToSeconds(result:Time) {
    return (result?.minutes * 60) + (result?.seconds * 1) + (result?.milliseconds / 100)
  }
}
