import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { I18nService } from './shared/services/i18n.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private i18nService: I18nService) {
    i18nService.setInitialLanguage();
  }
  buttonLabel = 'Register';
  navLeftItems = [{title:'Home', route:'/Home'},{title:'Clasification', route:'/Clasification'},{title:'Records', route:'/Records'}];
  navRightItems =  [{title:'Competitions', route:'/Competitions'},{title:'About', route:'/About'},{title:'Contact', route:'/Contact'}];
  footerHeaders = [{title:'Home', route:'/Home'},{title:'Clasification', route:'/Clasification'},{title:'Records', route:'/Records'},{title:'Competitions', route:'/Competitions'},{title:'About', route:'/About'},{title:'Contact', route:'/Contact'}];
  
}
