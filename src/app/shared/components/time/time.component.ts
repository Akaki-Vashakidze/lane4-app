import { Component, Input, OnInit } from '@angular/core';
import { Time } from '../../interfaces/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss'
})
export class TimeComponent implements OnInit{
@Input() timeObj !: Time;
ngOnInit(): void {
  console.log(this.timeObj)
}
}
