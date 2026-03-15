import { Component, signal } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TimeComponent } from '../time/time.component';
import { LoaderSpinnerComponent } from '../loader-spinner/loader-spinner.component';

@Component({
  selector: 'app-athlete-style-results',
  standalone: true,
  imports: [CommonModule, TranslateModule, TimeComponent, LoaderSpinnerComponent],
  templateUrl: './athlete-style-results.component.html',
  styleUrls: ['./athlete-style-results.component.scss']
})
export class AthleteStyleResultsComponent {
  athleteId!: any;
  poolLength!: any;
  distance!: any;
  stroke!: any;
  isLoading!:boolean;
  athlete!: any;
  athleteStrokeData = signal<any>(null);

  constructor(public _sharedService: SharedService, private route: ActivatedRoute) {
    this.athleteId = this.route.snapshot.paramMap.get('athleteId');
    this.poolLength = this.route.snapshot.paramMap.get('poolLength');
    this.distance = this.route.snapshot.paramMap.get('distance');
    this.stroke = this.route.snapshot.paramMap.get('stroke');
    this.isLoading = true;
    _sharedService.getAthleteStrokeRes(this.athleteId, this.poolLength, this.distance, this.stroke).subscribe(item => {
      this.isLoading = false;
      const sortedData = item.data.sort((a: any, b: any) => a.result.totalMilliseconds - b.result.totalMilliseconds);
      
      this.athleteStrokeData.set(sortedData);
      sortedData.sort((a:any, b:any) => a.result.time.totalMilliseconds - b.result.time.totalMilliseconds);
      this.athlete = this.athleteStrokeData()[0].athlete;
    });
  }
}
