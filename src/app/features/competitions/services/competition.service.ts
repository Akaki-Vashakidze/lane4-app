import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EventDetails, Time } from '../../../shared/interfaces/interfaces';
import { tap } from 'rxjs';

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

  getPlannedEvents(){
    return this.httpClient.get<any[]>(`/consoleApi/event/planned`);
  }

  getAllCompetitions() {
    return this.httpClient
      .get<Event[]>(`/consoleApi/event/all`).pipe(
        tap(item => console.log(item))
      )
  }
}
