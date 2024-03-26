import { AfterViewInit, Component, Injectable, OnInit } from '@angular/core';
import { CanComponentDeactivate, ConfirmationGuard } from '../confirmation.guard';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent {

  constructor( private location: Location ) {}
  ngOnInit(): void {
    history.pushState(null, '');
  }
  allowNavigation: boolean = false ;

  buttonClicked() {
    this.allowNavigation = true
  }

  canDeactivate(): boolean {
    console.log("Order ka " + this.allowNavigation);
    return this.allowNavigation;
  }
  
}
