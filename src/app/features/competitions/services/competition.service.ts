import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Event, EventDetails, Time } from '../../../shared/interfaces/interfaces';
import { tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  constructor() { }
  private readonly httpClient = inject(HttpClient);

  getEventInfo(eventId: string): Observable<any> {
    return this.httpClient.get<any>(`/consoleApi/public/events/${eventId}/info`);
  }

  getEventPartitions(eventId: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`/consoleApi/public/events/${eventId}/partitions`);
  }

  getPartitionRaces(eventId: string, partitionId: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`/consoleApi/public/events/${eventId}/partitions/${partitionId}/races`);
  }

  getRaceHeats(eventId: string, partitionId: string, raceId: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`/consoleApi/public/events/${eventId}/partitions/${partitionId}/races/${raceId}/heats`);
  }

  convertResultToSeconds(result: Time) {
    return (result?.minutes * 60) + (result?.seconds * 1) + (result?.milliseconds / 100);
  }

    getEventDetails(eventId: string) {
    return this.httpClient.get<EventDetails>(`/consoleApi/public/events/${eventId}/details`)
  }

  getPlannedEvents() {
    return this.httpClient.get<any[]>(`/consoleApi/event/planned`);
  }

  getCompetitionStartList(id: string) {
    return this.httpClient.get<any>(`/consoleApi/public/events/${id}/participants`);
  }

  getAllCompetitions() {
    return this.httpClient
      .get<Event[]>(`/consoleApi/public/events`).pipe(
        tap(item => console.log(item))
      );
  }

  getEventSummary(eventId: string) {
    return this.httpClient.get<EventDetails>(`/consoleApi/public/events/${eventId}/summary`);
  }
}