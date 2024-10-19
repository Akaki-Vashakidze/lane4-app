import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './layout/header/header.component';
import { BannerCardComponent } from './shared/components/banner-card/banner-card.component';
import { I18nService } from './shared/services/i18n.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatIconModule,MatButtonModule,HeaderComponent, BannerCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private i18nService: I18nService) {
    i18nService.setInitialLanguage();
  }

  navLeftItems = ['Home', 'Clasification','Records'];
  navRightItems = ['SwimMeets', 'About', 'Contact'];
  buttonLabel = 'Register';
}
