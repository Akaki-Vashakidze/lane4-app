import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Event, EventDetails, EventPartition, Heat, Lane, Race, Time } from '../../../shared/interfaces/interfaces';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  constructor() { }
  private readonly httpClient = inject(HttpClient);

  getEventInfo(eventId: string) {
    return this.httpClient.get<Event>(`/consoleApi/public/events/${eventId}/info`);
  }

  getEventPartitions(eventId: string) {
    return this.httpClient.get<EventPartition[]>(`/consoleApi/public/events/${eventId}/partitions`);
  }

  getPartitionRaces(eventId: string, partitionId: string) {
    return this.httpClient.get<Race[]>(`/consoleApi/public/events/${eventId}/partitions/${partitionId}/races`);
  }

  getRaceHeats(eventId: string, partitionId: string, raceId: string) {
    return this.httpClient.get<Heat[]>(`/consoleApi/public/events/${eventId}/partitions/${partitionId}/races/${raceId}/heats`);
  }

  getHeatParticipants(eventId: string, partitionId: string, raceId: string, heatId: string) {
    return this.httpClient.get<Lane[]>(`/consoleApi/public/events/${eventId}/partitions/${partitionId}/races/${raceId}/heats/${heatId}/participants`);
  }

  convertResultToSeconds(result: Time) {
    return (result?.minutes * 60) + (result?.seconds * 1) + (result?.milliseconds / 100)
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
      )
  }

  getEventSummary(eventId: string) {
    return this.httpClient.get<EventDetails>(`/consoleApi/public/events/${eventId}/summary`)
  }
}
