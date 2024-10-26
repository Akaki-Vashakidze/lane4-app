import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { CostumerCardComponent } from '../costumer-card/costumer-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { CostumerComment } from '../../interfaces/interfaces';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DynamicCarouselComponent } from '../dynamic-carousel/dynamic-carousel.component';


@Component({
  selector: 'app-costumer-comments',
  standalone: true,
  imports: [CommonModule, CostumerCardComponent, TranslateModule,CarouselModule, DynamicCarouselComponent],
  templateUrl: './costumer-comments.component.html',
  styleUrl: './costumer-comments.component.scss'
})
export class CostumerCommentsComponent {
  
}
