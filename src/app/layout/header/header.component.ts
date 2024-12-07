import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { I18nService } from '../../shared/services/i18n.service';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatMenuModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public language : string = 'English'
  menuDropdownOpen:boolean = false;
  chosenItem!:string;
  @Input() footerHeaders:  {title:string, route:string}[] = [];
  @Input() navLeftItems:  {title:string, route:string}[] = [];
  @Input() navRightItems:  {title:string, route:string}[] = [];
  @Input() buttonLabel: string = 'Button';

  constructor(private i18nService:I18nService, private _router:Router){}

  switchLanguage(lang: string) {
    lang == 'en' ? this.language = 'English' : this.language = 'ქართული'
    this.i18nService.changeCurrentLanguage(lang)
    this.menuDropdownOpen = false;
  }

}
