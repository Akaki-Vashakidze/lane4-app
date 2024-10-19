import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const STORAGE_KEY = 'language';

@Injectable()
export class I18nService {
  private readonly availableLanguages = ['ka', 'en'];
  constructor(private translateService: TranslateService) {}

  setInitialLanguage(): void {
    const browserLang = this.translateService.getBrowserLang() || 'en';
    let currentLanguage = localStorage.getItem(STORAGE_KEY);
    
    if (!currentLanguage) {
      const defaultLang = this.availableLanguages.includes(browserLang);
      const preferredLang = defaultLang ? browserLang : 'en';
      currentLanguage = preferredLang;
    }

    this.translateService.setDefaultLang(currentLanguage);
    this.translateService.use(currentLanguage);
  }

  changeCurrentLanguage(language: string) {
    this.translateService.use(language);
    localStorage.setItem(STORAGE_KEY, language);
  }
}
