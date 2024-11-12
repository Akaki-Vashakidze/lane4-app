import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-custom-autocomplete',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './custom-autocomplete.component.html',
  styleUrl: './custom-autocomplete.component.scss'
})
export class CustomAutocompleteComponent {
  @Input() data!:any[]
  @Output() onSelect = new EventEmitter<any>();
  searchQuery: string = '';
  filteredSuggestions: any[] = [];
  chosenOption!:any;

  onInput(event: Event) {
    const query = this.searchQuery.toLowerCase();
    this.filteredSuggestions = this.data.filter(item => {
      return  item.lastName.toLowerCase().includes(query) || item.firstName.toLowerCase().includes(query)
    });
  }

  selectSuggestion(suggestion: any) {
    this.searchQuery = suggestion.lastName + ' ' + suggestion.firstName;
    this.chosenOption = suggestion;
    this.onSelect.emit(this.chosenOption); 
    this.filteredSuggestions = [];
  }
}
