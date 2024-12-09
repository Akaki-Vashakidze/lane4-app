import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { ContactMessage, GetRanksData, LiveEvent, SearchAthletePayload, WRTsData } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor() { }
  private readonly httpClient = inject(HttpClient);

  getCompetitions() {
    return this.httpClient
      .get<LiveEvent[]>(`/consoleApi/live/events`).pipe(
        map(events => events.filter(event => event.event))
      );
  }

  getEventResultsPDF(eventId: string) {
    return this.httpClient.post(`/consoleApi/public/events/${eventId}/pdf/`, {}, { responseType: 'blob' }).pipe(
      map(res => {
        return new Blob([res], { type: 'application/pdf', });
      })
    )
  }

  getRankings() {
    return this.httpClient.get<GetRanksData>('/consoleApi/congifuration/rankings')
  }

  getWRTs() {
    return this.httpClient.get<WRTsData>('/consoleApi/congifuration/WRT')
  }

  sendContactMessage(body: ContactMessage) {
    return this.httpClient.post<any>('/consoleApi/contact/message', { data: body })
  }

  addMailForSubscr(body: { email: string }) {
    return this.httpClient.post<any>('/consoleApi/contact/mail', { data: body })
  }

  getAthleteResults(athleteId: string) {
    return this.httpClient.get<any>('/consoleApi/athlete/results/' + athleteId)
  }

  getAthletes(data: SearchAthletePayload) {
    return this.httpClient.post<any>('/consoleApi/athlete/search', data)
  }

  getAthleteStrokeRes(athleteId: string, poolLength: any, distance: any, stroke: string,) {
    return this.httpClient.get<any>(`/consoleApi/athlete/results/${athleteId}/${poolLength}/${distance}/${stroke}`)
  }
}
