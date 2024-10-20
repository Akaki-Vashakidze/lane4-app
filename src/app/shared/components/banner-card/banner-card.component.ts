import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-banner-card',
  standalone: true,
  imports: [CommonModule,ButtonComponent,TranslateModule],
  templateUrl: './banner-card.component.html',
  styleUrl: './banner-card.component.scss'
})
export class BannerCardComponent {

}
