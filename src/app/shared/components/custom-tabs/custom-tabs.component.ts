import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, signal, SimpleChanges, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderSpinnerComponent } from '../loader-spinner/loader-spinner.component';
import { fakeAsync } from '@angular/core/testing';

@Component({
  selector: 'app-custom-tabs',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIconModule,LoaderSpinnerComponent],
  templateUrl: './custom-tabs.component.html',
  styleUrl: './custom-tabs.component.scss'
})
export class CustomTabsComponent implements OnChanges{
  @Input() tabs:string[] = ['tab1','tab2','tab3','tab4'];
  @Input() print:boolean = false;
  @Input() header!:string;
  @Input() loaderOn!:false;
  @Input() subHeader!:string;
  @Input() subHeader2!:string;
  @Input() tabsWidth:string = '100%';
  @Input() infoTitle!:string;
  @Input() infoText!:string;
  activeTabIndex:number = 0; 
  @Output() tabChanged = new EventEmitter<number>();
  @Output() onPrint = new EventEmitter<any>();

  showLoader = signal<boolean>(false)
  @ViewChild('tabsContainer', { static: false }) tabsContainer!: ElementRef;

  tabChange(index:number){
   this.activeTabIndex = index;
   this.tabChanged.emit(index); 
  }

  scrollTabs(direction: 'left' | 'right') {
    if (this.tabsContainer) {
      console.log('ss')
        const scrollAmount = 150; // Scrolling distance
        this.tabsContainer.nativeElement.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    }
}

  ngOnChanges(changes: SimpleChanges): void {
    this.showLoader.set(this.loaderOn)
  }

  onPrintF(){
    this.onPrint.emit(true)
  }
}
