import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {
  @Input() title: string = 'Header';
  @Input() height: string = '100%';
  @Input() width: string = '100%';
  @Input() fontSize: string = '16px';
  @Input() bodyText: string = 'fjasnk fas f a l';
}
