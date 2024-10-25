import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './layout/header/header.component';
import { BannerCardComponent } from './shared/components/banner-card/banner-card.component';
import { I18nService } from './shared/services/i18n.service';
import { OurServicesComponent } from './shared/components/our-services/our-services.component';
import { CompetitionsListComponent } from './shared/components/competitions-list/competitions-list.component';
import { AboutUsSectionComponent } from './shared/components/about-us-section/about-us-section.component';
import { SaveEmailComponent } from './shared/components/save-email/save-email.component';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { CostumerCommentsComponent } from './shared/components/costumer-comments/costumer-comments.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatButtonModule, HeaderComponent,CostumerCommentsComponent, SaveEmailComponent, BannerCardComponent, OurServicesComponent, CompetitionsListComponent, AboutUsSectionComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private i18nService: I18nService) {
    i18nService.setInitialLanguage();
  }

  navLeftItems = [{title:'Home', route:'Home'},{title:'Clasification', route:'Clasification'},{title:'Records', route:'Records'}];
  navRightItems =  [{title:'SwimMeets', route:'SwimMeets'},{title:'About', route:'About'},{title:'Contact', route:'Contact'}];
  footerHeaders = [{title:'Home', route:'Home'},{title:'Clasification', route:'Clasification'},{title:'Records', route:'Records'},{title:'SwimMeets', route:'SwimMeets'},{title:'About', route:'About'},{title:'Contact', route:'Contact'}];
  buttonLabel = 'Register';
}
