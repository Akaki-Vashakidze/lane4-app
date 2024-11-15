import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-athlete-style-results',
  standalone: true,
  imports: [],
  templateUrl: './athlete-style-results.component.html',
  styleUrl: './athlete-style-results.component.scss'
})
export class AthleteStyleResultsComponent {
  athleteId!:any;
  poolLength!:any;
  distance!:any;
  stroke!:any;
  constructor(public _sharedService:SharedService,private route: ActivatedRoute){
    this.athleteId = this.route.snapshot.paramMap.get('athleteId');
    this.poolLength = this.route.snapshot.paramMap.get('poolLength');
    this.distance = this.route.snapshot.paramMap.get('distance');
    this.stroke = this.route.snapshot.paramMap.get('stroke');
    
    _sharedService.getAthleteStrokeRes(this.athleteId,this.poolLength,this.distance,this.stroke).subscribe(item => console.log(item))
  }
}
