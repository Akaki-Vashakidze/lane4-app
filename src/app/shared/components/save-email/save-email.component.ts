import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from '../input/input.component';
import { SharedService } from '../../services/shared.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-email',
  standalone: true,
  imports: [CommonModule, TranslateModule, InputComponent,MatTooltipModule],
  templateUrl: './save-email.component.html',
  styleUrl: './save-email.component.scss'
})
export class SaveEmailComponent {
  private _snackBar = inject(MatSnackBar);
  constructor(public _sharedService:SharedService){}
  onSubmit(val:{value:string}){
    this._sharedService.addMailForSubscr({email:val.value}).subscribe(item => {
      console.log(item)
      this.openSnackBar(item.data.message ?  item.data.message : 'Email sent','Ok')
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 3000
    });
  }
}
