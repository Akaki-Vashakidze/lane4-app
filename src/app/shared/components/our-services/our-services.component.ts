import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FeaturesComponent } from '../features/features.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [CommonModule,FeaturesComponent,TranslateModule],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.scss'
})
export class OurServicesComponent {

}
