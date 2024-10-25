import { Component, Input } from '@angular/core';
import { CostumerComment } from '../../interfaces/interfaces';

@Component({
  selector: 'app-costumer-card',
  standalone: true,
  imports: [],
  templateUrl: './costumer-card.component.html',
  styleUrl: './costumer-card.component.scss'
})
export class CostumerCardComponent {
  @Input() comment!:CostumerComment;
  @Input() width :string = '350px';
  @Input() height :string = '350px';
}
