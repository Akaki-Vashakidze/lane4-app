import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from "../button/button.component";
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { LoaderSpinnerComponent } from "../loader-spinner/loader-spinner.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatCheckboxModule, ButtonComponent,LoaderSpinnerComponent, ReactiveFormsModule, LoaderSpinnerComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  messageSent:boolean = false;
  showErrorMessage:boolean = false;
  errorMessage!:string;
  formSubmited:boolean = false;
  requestOn:boolean = false;
  constructor(public _sharedService:SharedService) {
    this.contactForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      message: new FormControl(null, [Validators.required]),
      checkAgree: new FormControl(false, [Validators.requiredTrue]), 
    });
  }

  onInputChange(){
    if (this.contactForm.valid) {
      this.showErrorMessage = false;
    } else {
      if(this.formSubmited == true) {
        this.showErrorMessage = true;
         this.errorMessage = "Form is invalid"
      }
    }
  }

  async submitForm() {
    this.formSubmited = true;
    if (this.contactForm.valid) {
        let message = { ...this.contactForm.value };
        delete message.checkAgree;
        try {
            this.requestOn = true;
            const item = await this._sharedService.sendContactMessage(message).toPromise();
            if (item.data) {
                this.showErrorMessage = false;
                this.messageSent = true;
                this.contactForm.reset(); 
            } else {
              this.errorMessage = 'Message could not send'
                this.showErrorMessage = true;
            }
            this.requestOn = false;
        } catch (error) {
            this.requestOn = false;
            this.showErrorMessage = true;
        }
    } else {
       this.showErrorMessage = true;
       this.errorMessage = "Form is invalid"
    }
}

}
