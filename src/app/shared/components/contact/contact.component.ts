import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from "../button/button.component";
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatCheckboxModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  showErrorMessage:boolean = false;
  constructor(public _sharedService:SharedService) {
    this.contactForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      message: new FormControl(null, [Validators.required]),
      checkAgree: new FormControl(false, [Validators.requiredTrue]), // Must be true to pass validation
    });
  }

  submitForm() {
    console.log(this.contactForm.value)
    if (this.contactForm.valid) {
      let message = {...this.contactForm.value}
      delete message.checkAgree;
      console.log(message); 
      this._sharedService.sendContactMessage(message).subscribe(item => {
        if(item.lastname) {
          this.showErrorMessage = false;
        } else {
          this.showErrorMessage = true;
        }
      })
    } else {
      console.log("Form is invalid");
    }
  }
}
