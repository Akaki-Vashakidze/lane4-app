import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FeaturesComponent } from '../features/features.component';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [CommonModule,FeaturesComponent],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.scss'
})
export class OurServicesComponent {

}
