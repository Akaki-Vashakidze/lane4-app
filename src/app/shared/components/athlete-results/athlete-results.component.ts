import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'app-athlete-results',
  standalone: true,
  imports: [CommonModule, MatIconModule,SelectComponent],
  templateUrl: './athlete-results.component.html',
  styleUrl: './athlete-results.component.scss'
})
export class AthleteResultsComponent {
  currentYear: number;
  yearsForSelect:any[] = []
  constructor(public _sharedService:SharedService){
    this.currentYear = new Date().getFullYear();
    this.populateYearsForSelect();
    _sharedService.getAthleteResults('666b3c0bcdd10df634af8070').subscribe(item => console.log(item))
  }

  onSelect1(event:any){
    console.log(event)
  }

  onSelect2(event:any){
    console.log(event)
  }

  populateYearsForSelect() {
    for (let year = 2005; year <= this.currentYear; year++) {
      this.yearsForSelect.push(year);
    }
  }
}
