import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-custom-tabs',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIconModule],
  templateUrl: './custom-tabs.component.html',
  styleUrl: './custom-tabs.component.scss'
})
export class CustomTabsComponent {
  @Input() tabs:string[] = ['tab1','tab2','tab3','tab4'];
  @Input() header!:string;
  @Input() subHeader!:string;
  @Input() subHeader2!:string;
  @Input() tabsWidth:string = '94%';
  @Input() infoTitle!:string;
  @Input() infoText!:string;
  activeTabIndex:number = 0; 
  @Output() tabChanged = new EventEmitter<number>();
  @Output() onPrint = new EventEmitter<any>();
  tabChange(index:number){
   this.activeTabIndex = index;
   this.tabChanged.emit(index); 
  }

  onPrintF(){
    this.onPrint.emit(true)
  }
}
