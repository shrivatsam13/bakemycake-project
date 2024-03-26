
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from '../model/order';
import { OrderService } from '../services/order.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})

export class AdminViewComponent implements OnInit, AfterViewInit {

  searchedText: string = '';

  displayedColumns: string[] = ['id', 'totalOrderPrice', 'customerName', 'customerPhone', 'itemName', 'quantity', 'itemPrice', 'deliveryDate', 'itemCategory', 'customerEmail', 'customerAddress'];

  dataSource = new MatTableDataSource<Order>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: OrderService) { }

  ngOnInit() {
    this.loadData()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Fetch all orders and assign to datasource table
  loadData() {
    this.service.getOrders().subscribe({
      next: (data: Order[]) => {
        this.dataSource.data = data;
      },
      error: (error) => {
        alert("Failed to Fetch Orders Due to Server Error!!");
      }
    })
  }

  // Display orders based on the searchText
  searchData() {
    this.dataSource.filter = this.searchedText.trim().toLowerCase();
  }
}
