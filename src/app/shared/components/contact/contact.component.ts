import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from "../button/button.component";
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatCheckboxModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor() {
    this.contactForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      message: new FormControl(null, [Validators.required]),
      checkAgree: new FormControl(false, [Validators.requiredTrue]), // Must be true to pass validation
    });
  }

  submitForm() {
    console.log(this.contactForm.value)
    if (this.contactForm.valid) {
      console.log(this.contactForm.value); // Handle form submission
    } else {
      console.log("Form is invalid");
    }
  }
}
