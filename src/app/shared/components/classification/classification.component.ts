import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { CustomTabsComponent } from '../custom-tabs/custom-tabs.component';
import { SharedService } from '../../services/shared.service';
import { TransformedRankData } from '../../interfaces/interfaces';
import { TimeComponent } from '../time/time.component';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderSpinnerComponent } from "../loader-spinner/loader-spinner.component";

@Component({
  selector: 'app-classification',
  standalone: true,
  imports: [CommonModule, CustomTabsComponent, TimeComponent, TranslateModule, LoaderSpinnerComponent, LoaderSpinnerComponent],
  templateUrl: './classification.component.html',
  styleUrl: './classification.component.scss'
})
export class ClassificationComponent {
  tabs = ['25m Men','50m Men','25m Women','50m Women']
  activeTabIndex = 0;
  transformedRankData = signal<TransformedRankData[][] >([])
  chosenRanksData!:TransformedRankData[];
  constructor(_sharedService:SharedService){
    _sharedService.getRankings().subscribe(item => {
     this.transformedRankData.set(this.transformRanksToArray(item.rankData))
     console.log(this.transformedRankData())
     this.chosenRanksData = this.transformedRankData()[0]
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
              if(event == '50 FREESTYLE' ){
                let obj = {
                  distance:null,
                  style:"FREESTYLE",
                  gender:null,
                  poolLength:null,
                  ranks:null
                }
                arr.push(obj)
              } else if(event == '50 BUTTERFLY') {
                let obj = {
                  distance:null,
                  style:"BUTTERFLY",
                  gender:null,
                  poolLength:null,
                  ranks:null
                }
                arr.push(obj)
              }  else if(event == '50 BACKSTROKE' ) {
                let obj = {
                  distance:null,
                  style:"BACKSTROKE",
                  gender:null,
                  poolLength:null,
                  ranks:null
                }
                arr.push(obj)
              }  else if( event == '50 BREASTSTROKE' ) {
                let obj = {
                  distance:null,
                  style:"BREASTSTROKE",
                  gender:null,
                  poolLength:null,
                  ranks:null
                }
                arr.push(obj)
              } else if( event == '100 MEDLEY' && course == 'SHORT' ) {
                let obj = {
                  distance:null,
                  style:"MEDLEY",
                  gender:null,
                  poolLength:null,
                  ranks:null
                }
                arr.push(obj)
              } else if( event == '200 MEDLEY' && course == 'LONG' ) {
                let obj = {
                  distance:null,
                  style:"MEDLEY",
                  gender:null,
                  poolLength:null,
                  ranks:null
                }
                arr.push(obj)
              }

              arr.push(obj)
            }
          })
        })
        this.array.push(arr)
      })
    })
    return this.array;
  }

  onTabChange(index: number) {
    this.activeTabIndex = index; 
    this.chosenRanksData = this.transformedRankData()[index]
  }
}
