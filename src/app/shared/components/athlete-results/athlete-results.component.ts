import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SelectComponent } from '../select/select.component';
import { TimeComponent } from '../time/time.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-athlete-results',
  standalone: true,
  imports: [CommonModule, MatIconModule, SelectComponent, TranslateModule, TimeComponent],
  templateUrl: './athlete-results.component.html',
  styleUrl: './athlete-results.component.scss'
})
export class AthleteResultsComponent {
  currentYear: number;
  yearsForSelect: any[] = []
  resultsForTable: any = [];
  map1 = {
    '50BUTTERFLY': {},
    '100BUTTERFLY': {},
    '200BUTTERFLY': {},
    '50BACKSTROKE': {},
    '100BACKSTROKE': {},
    '200BACKSTROKE': {},
    '50BRESTSTROKE': {},
    '100BRESTSTROKE': {},
    '200BRESTSTROKE': {},
    '50FREESTYLE': {},
    '100FREESTYLE': {},
    '200FREESTYLE': {},
    '400FREESTYLE': {},
    '800FREESTYLE': {},
    '1500FREESTYLE': {},
    '100MEDLEY': {},
    '200MEDLEY': {},
    '400MEDLEY': {},
  };
  constructor(public _sharedService: SharedService) {
    this.currentYear = new Date().getFullYear();
    this.populateYearsForSelect();
    _sharedService.getAthleteResults('666b3c0bcdd10df634af8070').subscribe(item => {
      console.log(item)
      let data: any = [];
      Object.keys(this.map1).forEach(event => {
        if(item.data[event]) {
          data.push(item.data[event])
        }
      })

      this.resultsForTable = data;
      console.log(this.resultsForTable)
    })
  }

  onSelect1(event: any) {
    console.log(event)
  }

  onSelect2(event: any) {
    console.log(event)
  }

  onSelect3(event: any) {
    console.log(event)
  }

  populateYearsForSelect() {
    for (let year = 2005; year <= this.currentYear; year++) {
      this.yearsForSelect.push(year);
    }
  }

  showMoreResults(item:any){
    console.log(item)
  }
}
