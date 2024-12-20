import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() text: string = 'Click';
  @Input() height: string = '30px';
  @Input() padding: string = '10px 20px';
  @Input() width: string = '100%';
  @Input() fontSize: string = '12px';
  @Input() borderRadius: string = '50px';
}
