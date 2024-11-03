import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { I18nService } from './shared/services/i18n.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{
  private subscription!: Subscription;
  public font!:string;
  constructor(private i18nService: I18nService) {
    i18nService.setInitialLanguage();
  }
  ngOnInit(): void {
    this.subscription = this.i18nService.changedLang.subscribe(lang => {
      lang == 'en' ? this.font = "EngFont" : this.font = "GeoFont";
    })
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

  buttonLabel = 'Register';
  navLeftItems = [{title:'Home', route:'/Home'},{title:'Clasification', route:'/Clasification'},{title:'Records', route:'/records'}];
  navRightItems =  [{title:'Competitions', route:'/Competitions'},{title:'About', route:'/About'},{title:'Contact', route:'/Contact'}];
  footerHeaders = [{title:'Home', route:'/Home'},{title:'Clasification', route:'/Clasification'},{title:'Records', route:'/Records'},{title:'Competitions', route:'/Competitions'},{title:'About', route:'/About'},{title:'Contact', route:'/Contact'}];
  
}
