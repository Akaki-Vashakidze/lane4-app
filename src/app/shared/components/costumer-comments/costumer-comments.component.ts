import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CostumerCardComponent } from '../costumer-card/costumer-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { CostumerComment } from '../../interfaces/interfaces';

@Component({
  selector: 'app-costumer-comments',
  standalone: true,
  imports: [CommonModule, CostumerCardComponent, TranslateModule],
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
]
}
