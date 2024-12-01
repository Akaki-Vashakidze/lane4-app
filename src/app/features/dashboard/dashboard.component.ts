import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../layout/header/header.component';
import { CostumerCommentsComponent } from '../../shared/components/costumer-comments/costumer-comments.component';
import { SaveEmailComponent } from '../../shared/components/save-email/save-email.component';
import { BannerCardComponent } from '../../shared/components/banner-card/banner-card.component';
import { OurServicesComponent } from '../../shared/components/our-services/our-services.component';
import { CompetitionsListComponent } from '../../shared/components/competitions-list/competitions-list.component';
import { AboutUsSectionComponent } from '../../shared/components/about-us-section/about-us-section.component';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, SaveEmailComponent, BannerCardComponent, CompetitionsListComponent, AboutUsSectionComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
