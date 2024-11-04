import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CustomTabsComponent } from '../custom-tabs/custom-tabs.component';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-classification',
  standalone: true,
  imports: [CommonModule,CustomTabsComponent],
  templateUrl: './classification.component.html',
  styleUrl: './classification.component.scss'
})
export class ClassificationComponent {
  tabs = ['25 კაცები','50 კაცები','25 ქალები','50 ქალები']
  activeTabIndex = 0;

  constructor(_sharedService:SharedService){
    _sharedService.getRankings().subscribe(item => {
     console.log(this.transformRanksToArray(item.rankData))
    })
  }

  array: any = []
  transformRanksToArray(rankings: any) {
    const tables: any = [];
    Object.keys(rankings).forEach(gender => {
      Object.keys(rankings[gender]).forEach(poolLength => {
        let arr: any[] = []
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
              arr.push(obj)
             let event = distance + ' ' + style;
              if(event == '1500 FREESTYLE' || event == '200 BUTTERFLY' || event == '200 BACKSTROKE' || event == '200 BREASTSTROKE' ){
                let obj = {
                  distance:null,
                  style:null,
                  gender:null,
                  poolLength:null,
                  ranks:null
                }
                arr.push(obj)
              }
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
    console.log('Active tab index:', index);
  }
}
