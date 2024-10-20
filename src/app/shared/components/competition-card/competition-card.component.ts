import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-competition-card',
  standalone: true,
  imports: [CommonModule,ButtonComponent],
  templateUrl: './competition-card.component.html',
  styleUrl: './competition-card.component.scss'
})
export class CompetitionCardComponent {
  @Input() text: string = 'text';
  @Input() title: string = 'title';
  @Input() height: string = '';
  @Input() width: string = '100%';
  @Input() fontSize: string = '12px';
}
