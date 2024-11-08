import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClassificationComponent } from '../classification/classification.component';
import { ClassificationMobileComponent } from '../classification-mobile/classification-mobile.component';

@Component({
  selector: 'app-classification-container',
  standalone: true,
  imports: [CommonModule, ClassificationComponent, ClassificationMobileComponent],
  templateUrl: './classification-container.component.html',
  styleUrl: './classification-container.component.scss'
})
export class ClassificationContainerComponent {

}
