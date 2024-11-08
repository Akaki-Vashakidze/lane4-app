import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-double-custom-tabs',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './double-custom-tabs.component.html',
  styleUrl: './double-custom-tabs.component.scss'
})
export class DoubleCustomTabsComponent {
  @Input() tabs1:string[] = ['tab1','tab2'];
  @Input() tabs2:string[] = ['tab3','tab4'];
  @Input() header!:string;
  @Input() headerTopRadius:boolean = true;
  @Input() tabsWidth:string = '94%';
  @Input() infoTitle!:string;
  @Input() infoText!:string;
  active1TabIndex:number = 0; 
  active2TabIndex:number = 0; 
  @Output() tabChanged1 = new EventEmitter<number>();
  @Output() tabChanged2 = new EventEmitter<number>();
  tabChange1(index:number){
   this.active1TabIndex = index;
   this.tabChanged1.emit(index); 
  }
  tabChange2(index:number){
    this.active2TabIndex = index;
    this.tabChanged2.emit(index); 
   }
}
