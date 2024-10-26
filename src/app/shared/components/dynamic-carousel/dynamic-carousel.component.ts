import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { CostumerCardComponent } from '../costumer-card/costumer-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CostumerComment } from '../../interfaces/interfaces';

@Component({
  selector: 'app-dynamic-carousel',
  standalone: true,
  imports: [CommonModule,CostumerCardComponent, TranslateModule, CarouselModule,],
  templateUrl: './dynamic-carousel.component.html',
  styleUrl: './dynamic-carousel.component.scss'
})
export class DynamicCarouselComponent {
  @ViewChild('customOwl', { static: false }) customOwl!: any;

  public costumerComments:CostumerComment[] = [
  {
    name:'Minjulina Irina',
    comment:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae debitis vitae tenetur voluptatibus, tempora excepturi.',
    img:'assets/imgs/costumer1.svg'
  },
  {
    name:'Abzianidze Giorgi',
    comment:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae debitis vitae tenetur voluptatibus, tempora excepturi.',
    img:'assets/imgs/costumer1.svg'
  },
  {
    name:'Gelashvili Davit',
    comment:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae debitis vitae tenetur voluptatibus, tempora excepturi.',
    img:'assets/imgs/costumer1.svg'
  },
  {
    name:'Abzianidze Giorgi',
    comment:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae debitis vitae tenetur voluptatibus, tempora excepturi.',
    img:'assets/imgs/costumer1.svg'
  },
  {
    name:'Abzianidze Giorgi',
    comment:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae debitis vitae tenetur voluptatibus, tempora excepturi.',
    img:'assets/imgs/costumer1.svg'
  },
  {
    name:'Gelashvili Davit',
    comment:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae debitis vitae tenetur voluptatibus, tempora excepturi.',
    img:'assets/imgs/costumer1.svg'
  },
  {
    name:'Gelashvili Davit',
    comment:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae debitis vitae tenetur voluptatibus, tempora excepturi.',
    img:'assets/imgs/costumer1.svg'
  },
]

carouselOptions: any = {
  loop: true,
  margin: 10,
  nav: false,
  dots: true,
  dotsData: true, 
  responsive: {
    0: { items: 1 },
    600: { items: 2 },
    1000: { items: 3 }
  }
};
goNext() {
  this.customOwl.next([300]);
}

goPrev() {
  this.customOwl.prev([300]);
}
}
