import { Pipe, PipeTransform } from '@angular/core';

export interface TimeResult {
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
  totalMilliseconds?: number;
}

@Pipe({
  name: 'formatRaceTime',
  standalone: true 
})
export class FormatRaceTimePipe implements PipeTransform {
  transform(result: TimeResult | null | undefined): string {
    if (!result) return '00:00.00';

    const mm = String(result.minutes ?? 0).padStart(2, '0');
    const ss = String(result.seconds ?? 0).padStart(2, '0');

    let msStr = String(result.milliseconds ?? 0);
    
    if (msStr.length > 2) {
      msStr = msStr.substring(0, 2);
    } else {
      msStr = msStr.padStart(2, '0');
    }

    return `${mm}:${ss}.${msStr}`;
  }
}