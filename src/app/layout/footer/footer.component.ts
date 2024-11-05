import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from '../../shared/components/input/input.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule,TranslateModule,RouterModule,InputComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(public _router:Router){}
  @Input() headers!: {title:string, route:string}[];
  navigate(route:string){
    this._router.navigate([route])
  }
}
