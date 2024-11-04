import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTabsComponent } from '../custom-tabs/custom-tabs.component';
import { SharedService } from '../../services/shared.service';
import { LoaderSpinnerComponent } from '../loader-spinner/loader-spinner.component';
import { TimeComponent } from '../time/time.component';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [CommonModule, TranslateModule,CustomTabsComponent,LoaderSpinnerComponent,TimeComponent],
  templateUrl: './records.component.html',
  styleUrl: './records.component.scss'
})
export class RecordsComponent {
  tabs = ["50m Men","50m Women"]
  constructor(public _sharedService:SharedService){
    _sharedService.getWRTs().subscribe(item => {
      this.transformRanksToArray(item)
    })
  }
  array: any = []
  transformRanksToArray(rankings: any) {
    const tables: any = [];
    let course!:string;
    Object.keys(rankings).forEach(gender => {
      Object.keys(rankings[gender]).forEach(poolLength => {
        let arr: any[] = []
        course = poolLength;
        Object.keys(rankings[gender][poolLength]).forEach(style => {
          Object.keys(rankings[gender][poolLength][style]).forEach(distance => {
            if (distance != '25') {
              let obj = {
                distance,
                style,
                gender,
                poolLength,
                ranks: rankings[gender][poolLength][style][distance]
              }
             let event = distance + ' ' + style;
              arr.push(obj)
            }
          })
        })
        this.array.push(arr)
      })
    })
    console.log(this.array)
    return this.array;
  }
}
