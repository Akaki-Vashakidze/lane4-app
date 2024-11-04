import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CustomTabsComponent } from '../custom-tabs/custom-tabs.component';

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
  onTabChange(index: number) {
    this.activeTabIndex = index; 
    console.log('Active tab index:', index);
  }
}
