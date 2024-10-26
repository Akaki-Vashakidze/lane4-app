import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CostumerCardComponent } from '../costumer-card/costumer-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { CostumerComment } from '../../interfaces/interfaces';
import { CarouselModule } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-costumer-comments',
  standalone: true,
  imports: [CommonModule, CostumerCardComponent, TranslateModule,CarouselModule],
  templateUrl: './costumer-comments.component.html',
  styleUrl: './costumer-comments.component.scss'
})
export class CostumerCommentsComponent {
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
  nav: true,
  dots: true,
  dotsData: true, 
  responsive: {
    0: { items: 1 },
    600: { items: 2 },
    1000: { items: 3 }
  }
};

contents = [
  { title: 'Slide 1', description: 'Description for Slide 1' },

  { title: 'Slide 1', description: 'Description for Slide 1' },
  { title: 'Slide 2', description: 'Description for Slide 2' },
  { title: 'Slide 3', description: 'Description for Slide 3' },
  { title: 'Slide 2', description: 'Description for Slide 2' },

  { title: 'Slide 1', description: 'Description for Slide 1' },
  { title: 'Slide 2', description: 'Description for Slide 2' },
  { title: 'Slide 3', description: 'Description for Slide 3' },
  { title: 'Slide 3', description: 'Description for Slide 3' }
];

pages = this.contents.map((_, index) => index + 1);


}
