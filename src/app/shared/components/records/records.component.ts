import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTabsComponent } from '../custom-tabs/custom-tabs.component';
import { SharedService } from '../../services/shared.service';
import { LoaderSpinnerComponent } from '../loader-spinner/loader-spinner.component';
import { TimeComponent } from '../time/time.component';
import { DoubleCustomTabsComponent } from '../double-custom-tabs/double-custom-tabs.component';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [CommonModule, TranslateModule,DoubleCustomTabsComponent,LoaderSpinnerComponent,TimeComponent],
  templateUrl: './records.component.html',
  styleUrl: './records.component.scss'
})
export class RecordsComponent {
  tabs1 = ["Long_Course","Short_Course"]
  tabs2 = ["Men","Women"]
  chosenRecords = signal<any>([])
  constructor(public _sharedService:SharedService){
    _sharedService.getWRTs().subscribe(item => {
      this.transformRanksToArray(item)
    })
  }
  array: any = []
  tab1Index:number = 0;
  tab2Index:number = 0;
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
    this.chosenRecords.set(this.array[1])
    return this.array;
  }

  chooseRecordsArray(){
    if(this.tab1Index == 0 && this.tab2Index == 0){
      this.chosenRecords.set(this.array[1])
    } else if(this.tab1Index == 1 && this.tab2Index == 0){
      this.chosenRecords.set(this.array[0])
    } else if(this.tab1Index == 0 && this.tab2Index == 1){
      this.chosenRecords.set(this.array[3])
    } else if(this.tab1Index == 1 && this.tab2Index == 1){
      this.chosenRecords.set(this.array[2])
    }
    console.log(this.chosenRecords())
  }

  on1TabChange(index:number){
    this.tab1Index = index;
    this.chooseRecordsArray()
  }

  on2TabChange(index:number){
    console.log(index)
    this.tab2Index = index;
    this.chooseRecordsArray()
   }
}
