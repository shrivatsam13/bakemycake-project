import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../model/item'

@Component({
  selector: 'app-landing-view',
  templateUrl: './landing-view.component.html',
  styleUrls: ['./landing-view.component.css']
})

export class LandingViewComponent implements OnInit {
  itemList: Item[] = []
  filteredItems: Item[] = []
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItemList()
  }

  // Fetch available item List form server
  getItemList() {
    this.itemService.getItems().subscribe({
      next: (data: Item[]) => {
        this.itemList = data;
        this.filteredItems = data;
      },
      error: (error) => {
        alert("Failed to Fetch Notes Due to Server Error!!");
      },
      complete: () => console.info('complete')
    })
  }

  // Filter items based on searchText
  onSearch(searchText: string) {
    this.filteredItems = this.itemList.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  // Filter items based on selectedCategory
  onFilter(selectedCategory: string) {
    if ((!selectedCategory) || selectedCategory == 'All') {
      this.filteredItems = this.itemList;
    } else {
      this.filteredItems = this.itemList.filter(item => item.category === selectedCategory);
    }
  }
}
