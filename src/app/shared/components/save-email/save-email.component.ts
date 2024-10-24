import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-save-email',
  standalone: true,
  imports: [CommonModule, TranslateModule, InputComponent],
  templateUrl: './save-email.component.html',
  styleUrl: './save-email.component.scss'
})
export class SaveEmailComponent {

}
