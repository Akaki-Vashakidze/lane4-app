import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() navLeftItems: string[] = [];
  @Input() navRightItems: string[] = [];
  @Input() buttonLabel: string = 'Button'; // This can also come dynamically

}
