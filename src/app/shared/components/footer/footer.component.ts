import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() headers!: {title:string, route:string}[];
}
