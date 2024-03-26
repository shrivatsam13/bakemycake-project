import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from '../model/order';
import { CanComponentDeactivate } from '../can-deactivate.guard';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements CanComponentDeactivate{
  orderFormData: Order;

  // Check for Order placed status
  isCompleted: boolean = false;

  itemName: string ='';
  itemImageUrl: string ='';
  itemPrice: string ='';
  itemCategory: string = ""
  itemRating: string = ""
  minDate: Date = new Date()

  constructor( private route: ActivatedRoute, private orderSubmit: OrderService, private _snackBar: MatSnackBar, private router: Router ) {
    // fetch passed selected item details
    this.itemName = route.snapshot.paramMap.get('name') as string
    this.itemPrice = route.snapshot.paramMap.get('price') as string
    this.itemImageUrl = route.snapshot.paramMap.get('url') as string
    this.itemCategory = route.snapshot.paramMap.get('category') as string
    this.itemRating = route.snapshot.paramMap.get('rating') as string

    this.orderFormData = {
      itemName: this.itemName,
      itemCategory: this.itemCategory,
      itemPrice: Number(this.itemPrice),
      totalOrderPrice: Number(this.itemPrice),
      quantity: 1,
      deliveryDate: new Date(),
      customerName: 'Shrivats',
      customerEmail: 'shrivatsam43@gmail.com',
      customerPhone: '9982761416',
      customerAddress: {
        street: 'Sirius Road',
        city: 'Gurugram',
        state: 'Haryana',
        zipCode: '122010'
      }
    }
  }

  isFormValid(): boolean {
    return (
      this.orderFormData.quantity >=1 && 
      this.orderFormData.customerName !=null &&
      this.orderFormData.customerName.length >=2 &&
      this.orderFormData.deliveryDate != null && 
      this.isValidZipCode(this.orderFormData.customerAddress.zipCode) &&
      this.orderFormData.customerAddress.street !=null &&
      this.orderFormData.customerAddress.city !=null &&
      this.orderFormData.customerAddress.state !=null
    )
  }

  // Check for valid zipCode
  isValidZipCode(zipCode: string): boolean {
    return /^\d{5,6}(-\d{4})?$/.test(zipCode);
  }

  // Post Order details to the server
  onSubmit(): void {
    this.isCompleted = true
    this.orderSubmit.addOrder(this.orderFormData).subscribe({
      next: data => {
        this._snackBar.open('Congrats! You have placed the order!!', 'success', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary']
        })
        this.router.navigate(['orderConfirmation']);
      },
      error: err => {
        this._snackBar.open('Failed to place order! Please Try Again Later', 'Failure', {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      }
    });
  }

  // Calculate total order price based on updated quantity
  calculatePrice(): void {
    this.orderFormData.totalOrderPrice = Number(this.orderFormData.quantity) * Number(this.itemPrice)
  }

  // Authorisation Guard canDeactivate for restricting user navigation
  canDeactivate(): boolean {
    if (this.isCompleted) {
      return true; // Allow navigation if the form is valid and order is placed
    } else {
      // Prompt the user to confirm leaving with unplaced order
      return window.confirm(
        'Do you really want to leave this page without placing an order?'
      );
    }
  }
}

