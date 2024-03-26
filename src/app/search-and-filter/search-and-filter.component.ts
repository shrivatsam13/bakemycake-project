import { Component } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-search-and-filter',
  templateUrl: './search-and-filter.component.html',
  styleUrls: ['./search-and-filter.component.css']
})
export class SearchAndFilterComponent {
  searchText = '';
  selectedCategory = 'All';

  @Output() search = new EventEmitter<string>();
  @Output() filter = new EventEmitter<string>();

  // Emits events to parent for searchText
  onSearch() {
    this.search.emit(this.searchText);
  }
  // Emits events to parent for selectedCategory
  onFilter() {
    this.filter.emit(this.selectedCategory);
  }
}
