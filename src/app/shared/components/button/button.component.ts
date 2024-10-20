import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() text: string = 'Click';
  @Input() height: string = '30px';
  @Input() width: string = '100px';
  @Input() fontSize: string = '16px';
}
