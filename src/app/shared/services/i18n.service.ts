import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

const STORAGE_KEY = 'lane4language';

@Injectable()
export class I18nService {
  private readonly availableLanguages = ['ka', 'en'];
  constructor(private translateService: TranslateService) {}
  public changedLang = new BehaviorSubject<string | null>('ka');
 
  setInitialLanguage(): void {
    // const browserLang = this.translateService.getBrowserLang() || 'ka';
    const browserLang = 'ka';
    let currentLanguage = localStorage.getItem(STORAGE_KEY);
    this.changedLang.next(currentLanguage);
    
    if (!currentLanguage) {
      const defaultLang = this.availableLanguages.includes(browserLang);
      const preferredLang = defaultLang ? browserLang : 'ka';
      currentLanguage = preferredLang;
    }
    
    this.translateService.setDefaultLang(currentLanguage);
    this.translateService.use(currentLanguage);
  }

  changeCurrentLanguage(language: string) {
    this.translateService.use(language);
    localStorage.setItem(STORAGE_KEY, language);
    this.changedLang.next(language);
  }
}
