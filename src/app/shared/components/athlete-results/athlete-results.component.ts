import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-athlete-results',
  standalone: true,
  imports: [],
  templateUrl: './athlete-results.component.html',
  styleUrl: './athlete-results.component.scss'
})
export class AthleteResultsComponent {
  constructor(public _sharedService:SharedService){
    //66479f1adc0fa3765b1287c6

    //666b3c0bcdd10df634af8070
    _sharedService.getAthleteResults('666b3c0bcdd10df634af8070').subscribe(item => console.log(item))
  }
}
