import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { TransformedRankData } from '../../../interfaces/interfaces';
import { TimeComponent } from '../../time/time.component';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderSpinnerComponent } from '../../loader-spinner/loader-spinner.component';
import { DoubleCustomTabsComponent } from '../../double-custom-tabs/double-custom-tabs.component';

@Component({
  selector: 'app-classification-mobile',
  standalone: true,
  imports: [CommonModule, TimeComponent, DoubleCustomTabsComponent, TranslateModule, LoaderSpinnerComponent, LoaderSpinnerComponent],
  templateUrl: './classification-mobile.component.html',
  styleUrl: './classification-mobile.component.scss'
})
export class ClassificationMobileComponent {  
  tabs1 = ["Long_Course","Short_Course"]
  tabs2 = ["Men","Women"]
  tab1Index:number = 0;
  tab2Index:number = 0;
  activeTabIndex = 0;
  transformedRankData = signal<TransformedRankData[][] >([])
  chosenRanksData!:TransformedRankData[] | any;
  constructor(_sharedService:SharedService){
    _sharedService.getRankings().subscribe(item => {
     this.transformedRankData.set(this.transformRanksToArrayMobile(item.rankData))
     console.log(this.transformedRankData())
     this.chosenRanksData = this.transformedRankData()[1]
    })
  }

  array: any = []
  arrayMobile: any = []
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
    this.chosenRanksData = this.arrayMobile[1];
    console.log(this.arrayMobile)
    return this.arrayMobile;
  }

  chooseClassificationArray(){
    if(this.tab1Index == 0 && this.tab2Index == 0){
      this.chosenRanksData = this.arrayMobile[1]
    } else if(this.tab1Index == 1 && this.tab2Index == 0){
      this.chosenRanksData = this.arrayMobile[0]
    } else if(this.tab1Index == 0 && this.tab2Index == 1){
      this.chosenRanksData = this.arrayMobile[3]
    } else if(this.tab1Index == 1 && this.tab2Index == 1){
      this.chosenRanksData = this.arrayMobile[2]
    }
    console.log(this.chosenRanksData)
  }

  on1TabChange(index:any){
    console.log(index)
    this.tab1Index = index;
    this.chooseClassificationArray()
  }

  on2TabChange(index:any){
    console.log(index)
    this.tab2Index = index;
    this.chooseClassificationArray()
   }

}
