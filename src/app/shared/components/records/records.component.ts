import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedService } from '../../services/shared.service';
import { LoaderSpinnerComponent } from '../loader-spinner/loader-spinner.component';
import { TimeComponent } from '../time/time.component';
import { DoubleCustomTabsComponent } from '../double-custom-tabs/double-custom-tabs.component';
import { CustomTabsComponent } from '../custom-tabs/custom-tabs.component';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [CommonModule, TranslateModule,DoubleCustomTabsComponent, CustomTabsComponent, LoaderSpinnerComponent,TimeComponent],
  templateUrl: './records.component.html',
  styleUrl: './records.component.scss'
})
export class RecordsComponent {
  // tabs1 = ["Long_Course","Short_Course"]
  tabs1 = ["Long_Course"]
  tabs2 = ["Men","Women"]
  // tabs = ['25m Men','50m Men','25m Women','50m Women']
  tabs = ['50m Men','50m Women']
  chosenRecords = signal<any>([])
  chosenRecordsMobile = signal<any>([])
  constructor(public _sharedService:SharedService){
    _sharedService.getWRTs().subscribe(item => {
      this.transformRanksToArray(item)
      this.transformRanksToArrayMobile(item)
    })
  }
  array: any = []
  arrayMobile: any = []
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
  transformRanksToArrayMobile(rankings: any) {
    let mobileObj:any;
    const tables: any = [];
    let course!:string;
    Object.keys(rankings).forEach(gender => {
      Object.keys(rankings[gender]).forEach(poolLength => {
        let arr: any[] = []
        course = poolLength;
        Object.keys(rankings[gender][poolLength]).forEach(style => {
           mobileObj = [];
          Object.keys(rankings[gender][poolLength][style]).forEach(distance => {
            if (distance != '25') {
              let event = distance + ' ' + style;
              let medleyDistanceForheck;
              poolLength == 'SHORT' ? medleyDistanceForheck = '100' : medleyDistanceForheck = '200';
              if (event == '50 FREESTYLE' || event == '50 BUTTERFLY' || event == '50 BACKSTROKE' || event == '50 BREASTSTROKE' || event == `${medleyDistanceForheck} MEDLEY`) {
                let style2 = ''
                switch (style) {
                  case 'FREESTYLE':
                    style2 = 'FREESTYLE';
                    break;
                  case 'BUTTERFLY':
                    style2 = 'BUTTERFLY';
                    break;
                  case 'BACKSTROKE':
                    style2 = 'BACKSTROKE';
                    break;
                  case 'BREASTSTROKE':
                    style2 = 'BREASTSTROKE';
                    break;
                  case 'MEDLEY':
                    style2 = 'MEDLEY';
                    break;
                  default:
                    break;
                }
                let obj = {
                  distance: null,
                  style: style2,
                  gender: null,
                  poolLength: null,
                  ranks: null
                }
                mobileObj.push(obj)
              }
              let obj = {
                distance,
                style,
                gender,
                poolLength,
                ranks: rankings[gender][poolLength][style][distance]
              }
              mobileObj.push(obj)
            }
          })
          arr.push(mobileObj)
        })
        this.arrayMobile.push(arr)
      })
    })
    this.chosenRecordsMobile.set(this.arrayMobile[1])
    return this.arrayMobile;
  }

  chooseRecordsArray(){
    if(this.tab1Index == 0 && this.tab2Index == 0){
      this.chosenRecords.set(this.array[1])
      this.chosenRecordsMobile.set(this.arrayMobile[1])
    } else if(this.tab1Index == 1 && this.tab2Index == 0){
      this.chosenRecords.set(this.array[0])
      this.chosenRecordsMobile.set(this.arrayMobile[0])
    } else if(this.tab1Index == 0 && this.tab2Index == 1){
      this.chosenRecords.set(this.array[3])
      this.chosenRecordsMobile.set(this.arrayMobile[3])
    } else if(this.tab1Index == 1 && this.tab2Index == 1){
      this.chosenRecords.set(this.array[2])
      this.chosenRecordsMobile.set(this.arrayMobile[2])
    }
  }

  onTabChange(index:number){
    switch (index) {
      case 0:
        this.chosenRecords.set(this.array[1])
        break;
      case 1:
        this.chosenRecords.set(this.array[3])
        break;
      // case 2:
      //   this.chosenRecords.set(this.array[2])
      //   break;
      // case 3:
      //   this.chosenRecords.set(this.array[3])
      //   break;
      default:
        break;
    }
  }

  on1TabChange(index:number){
    this.tab1Index = index;
    this.chooseRecordsArray()
  }

  on2TabChange(index:number){
    this.tab2Index = index;
    this.chooseRecordsArray()
   }
}
