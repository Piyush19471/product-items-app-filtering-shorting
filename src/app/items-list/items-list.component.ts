// import { Component, OnInit } from '@angular/core';
// import { ItemService } from '../services/item.service';
// import { NgFor } from '@angular/common';
// import { FormsModule, NgModel } from '@angular/forms';


// @Component({
//   selector: 'app-items-list',
//   standalone: true,
//   imports: [NgFor, FormsModule],
//   templateUrl: './items-list.component.html',
//   styleUrl: './items-list.component.css'
// })
// export class ItemsListComponent implements OnInit{
//   items: any[] = [];
//   filterText: string = '';
//   sortOrder: string = 'asc';

//   constructor(private itemService: ItemService) {}

//   ngOnInit(): void {
//     this.itemService.getItems().subscribe((data) => {
//       this.items = data;
//     });
//   }
//   get filteredAndSortedItems(): any[] {
//     let filteredItems = this.items.filter(item =>
//       item.title.toLowerCase().includes(this.filterText.toLowerCase())
//     );

//     return filteredItems.sort((a, b) => {
//       return this.sortOrder === 'asc'
//         ? a.title.localeCompare(b.title)
//         : b.title.localeCompare(a.title);
//     });
//   } 
// }









// items-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css'],
})
export class ItemsListComponent implements OnInit {
  items: any[] = [];
  filterText: string = '';
  sortOrder: string = 'asc';

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.itemService.getItems().subscribe({
      next: (data) => {
        this.items = data;
      },
      error: (error) => {
        // Displaying user-friendly error message
        alert(error); 
      }
    });
  }
  // Filtering and Sorting
   get filteredAndSortedItems(): any[] {
    let filteredItems = this.items.filter(item =>
      item.title.toLowerCase().includes(this.filterText.toLowerCase())
    );

    return filteredItems.sort((a, b) => {
      return this.sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });
  } 
}
