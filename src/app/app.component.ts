import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { I18nService } from './shared/services/i18n.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { Subscription } from 'rxjs';
import { SocketService } from './shared/services/socket.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  public font: string = 'GeoFont';
  constructor(private i18nService: I18nService, private socketService: SocketService) {
    i18nService.setInitialLanguage();
    socketService.connect();
  }

  ngOnInit(): void {
    this.subscription = this.i18nService.changedLang.subscribe(lang => {
      if (lang) {
        lang == 'en' ? this.font = "EngFont" : this.font = "GeoFont";
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  buttonLabel = 'Register';
  navLeftItems = [{ title: 'Home', route: '/dashboard' }, { title: 'Classification', route: '/classification' }, { title: 'Records', route: '/records' }];
  navRightItems = [{ title: 'Competitions', route: '/competitions' }, { title: 'Athletes', route: '/athletes' }, { title: 'Contact', route: '/contact' }];
  footerHeaders = [{ title: 'Home', route: '/dashboard' }, { title: 'Classification', route: '/classification' }, { title: 'Records', route: '/records' }, { title: 'Competitions', route: '/competitions' }, { title: 'Athletes', route: '/athletes' }, { title: 'Contact', route: '/contact' }];

}
