import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { I18nService } from '../../shared/services/i18n.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public language : string = 'English'
  public dropdownOpen : boolean = false;
  
  @Input() navLeftItems:  {title:string, route:string}[] = [];
  @Input() navRightItems:  {title:string, route:string}[] = [];
  @Input() buttonLabel: string = 'Button';

  constructor(private i18nService:I18nService){}

  switchLanguage(lang: string) {
    this.dropdownOpen = false;
    lang == 'en' ? this.language = 'English' : this.language = 'ქართული'
    this.i18nService.changeCurrentLanguage(lang)
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
