import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-custom-tabs',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './custom-tabs.component.html',
  styleUrl: './custom-tabs.component.scss'
})
export class CustomTabsComponent {
  @Input() tabs:string[] = ['tab1','tab2','tab3','tab4'];
  @Input() header!:string;
  @Input() info!:string;
  activeTabIndex:number = 0; 
  @Output() tabChanged = new EventEmitter<number>();
  tabChange(index:number){
   this.activeTabIndex = index;
   this.tabChanged.emit(index); 
  }
}
