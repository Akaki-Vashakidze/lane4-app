import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './layout/header/header.component';
import { BannerCardComponent } from './shared/components/banner-card/banner-card.component';
import { I18nService } from './shared/services/i18n.service';
import { FeaturesComponent } from './shared/components/features/features.component';
import { OurServicesComponent } from './shared/components/our-services/our-services.component';
import { CompetitionsListComponent } from './shared/components/competitions-list/competitions-list.component';
import { AboutUsSectionComponent } from './shared/components/about-us-section/about-us-section.component';
import { SaveEmailComponent } from './shared/components/save-email/save-email.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatIconModule,MatButtonModule,HeaderComponent, SaveEmailComponent, BannerCardComponent, OurServicesComponent,CompetitionsListComponent,AboutUsSectionComponent],
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
