import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanComponentDeactivate, ConfirmationGuard } from '../confirmation.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent{

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {
    this.allowNavigation = true
    this.authService.isLoggedIn.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout() {
    this.authService.logout();
  }
  allowNavigation = true;

}
