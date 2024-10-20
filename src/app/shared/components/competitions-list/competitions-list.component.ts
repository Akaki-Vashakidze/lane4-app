import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CompetitionCardComponent } from '../competition-card/competition-card.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-competitions-list',
  standalone: true,
  imports: [CommonModule,CompetitionCardComponent,ButtonComponent],
  templateUrl: './competitions-list.component.html',
  styleUrl: './competitions-list.component.scss'
})
export class CompetitionsListComponent {

}
