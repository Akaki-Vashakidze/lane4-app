import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './layout/header/header.component';
import { BannerCardComponent } from './shared/components/banner-card/banner-card.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatIconModule,MatButtonModule,HeaderComponent, BannerCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  navLeftItems = ['Home', 'Categories'];
  navRightItems = ['Offers', 'Contact', 'About Us'];
  buttonLabel = 'Register';
}
