import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, HostListener, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-custom-autocomplete',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './custom-autocomplete.component.html',
  styleUrls: ['./custom-autocomplete.component.scss']
})
export class CustomAutocompleteComponent implements OnInit, OnChanges{
  @Input() data!: any[] | any;
  @Output() onType = new EventEmitter<any>();
  @Output() onSelect = new EventEmitter<any>();
  searchQuery: string = '';
  filteredSuggestions: any[] = [];
  chosenOption!: any;

  ngOnInit(): void {
    console.log(this.filteredSuggestions)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.searchQuery.length > 1) {
      this.filteredSuggestions = this.data;
    }
  }
  
  onInput(event: Event) {
    if(this.searchQuery.length > 1) {
    const query = this.searchQuery.toLowerCase();
      this.emitQuery(query)
    this.filteredSuggestions = this.data;
    }
  }

  emitQuery(query:string){
    this.onType.emit(query)
  }

  selectSuggestion(suggestion: any) {
    this.searchQuery = `${suggestion.lastName} ${suggestion.firstName}`;
    this.chosenOption = suggestion;
    this.onSelect.emit(this.chosenOption); 
    this.filteredSuggestions = [];
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: HTMLElement) {
    const clickedInside = targetElement.closest('.input-wrapper') || targetElement.closest('.suggestions-list');
    if (!clickedInside) {
      this.filteredSuggestions = [];
    }
  }
}
