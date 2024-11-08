import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient , withInterceptors} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { I18nService } from './shared/services/i18n.service';
import { consoleApiRedirectInterceptor } from './shared/services/console-api-redirect.interceptor';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(),provideHttpClient(),I18nService,
    TranslateModule.forRoot({
      defaultLanguage: 'ka',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }).providers!,
    provideHttpClient(withInterceptors([consoleApiRedirectInterceptor])),
    provideRouter(routes, withHashLocation())
  ]
};
