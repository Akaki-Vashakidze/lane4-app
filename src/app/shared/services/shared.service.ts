import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { GetRanksData, LiveEvent, WRTsData } from '../interfaces/interfaces';

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

  getEventResultsPDF(eventId:string) {
    return this.httpClient.get('/consoleApi/event/eventPdf/' + eventId, { responseType: 'blob' }).pipe(
      map(res => {
        return new Blob([res], { type: 'application/pdf', });
    })
    )
  }

  getRankings(){
    return this.httpClient.get<GetRanksData>('/consoleApi/congifuration/rankings')
  }
  
  getWRTs(){
    return this.httpClient.get<WRTsData>('/consoleApi/congifuration/WRT')
  }
}
