import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from '../../shared/components/input/input.component';
import { SharedService } from '../../shared/services/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule,TranslateModule,RouterModule,InputComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(public _router:Router, public _sharedService:SharedService){}
  @Input() headers!: {title:string, route:string}[];
  private _snackBar = inject(MatSnackBar);
  navigate(route:string){
    this._router.navigate([route])
  }
  onSubmit(val:{value:string}){
    this._sharedService.addMailForSubscr({email:val.value}).subscribe(item => {
      this.openSnackBar(item.data.message ?  item.data.message : 'Email sent','Ok')
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 3000
    });
  }
}
