import { Component, Input } from '@angular/core';
import { Time } from '../../interfaces/interfaces';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss'
})
export class TimeComponent {
@Input() timeObj !: Time;
}
