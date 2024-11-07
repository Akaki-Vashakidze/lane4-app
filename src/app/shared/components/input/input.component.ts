import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() buttonText: string = '';
  @Input() width: string = '100%';
  @Input() height: string = '100%';
  @Input() inputText: string = 'confirm';
  @Input() email: boolean = true;
  @Output() onSubmit = new EventEmitter<{ value: string }>();
  inputForm !: FormGroup;
  isSubmited: boolean = false;
  showCheck: boolean = false;
  constructor() {
    if (this.email) {
      this.inputForm = new FormGroup({
        value: new FormControl(null, [Validators.required, Validators.email]),
      });
    } else {
      this.inputForm = new FormGroup({
        value: new FormControl(null, [Validators.required]),
      });
    }
  }

  checkValidation() {
    if (this.isSubmited) {
      if (this.inputForm.valid || this.inputForm.value.value == '') {
        this.showCheck = false;
      } else {
        this.showCheck = true;
      }
    }

  }

  onClick() {
    this.isSubmited = true;
    if (this.inputForm.valid) {
      this.onSubmit.emit(this.inputForm.value);
    } else {
      this.showCheck = true;
    }
  }
}
