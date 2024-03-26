import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from '../confirmation.guard';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements CanComponentDeactivate{
  code: string = '';
  hidePassword: boolean = true;
  checkFailed: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  // Check for enetred code against securityCode for admin access
  validateAdminCode() {
    this.authService.login(this.code);
    this.authService.isLoggedIn.subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.checkFailed = false;
        this.router.navigate(["admin"]);
      }
      else {
        this.checkFailed = true
      }
    });
  }
  
  // Toggle Password Visibility icon
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  shouldDeactivate = false

  buttonClicked() {
    this.shouldDeactivate = true
  }

  canDeactivate(): boolean {
    return this.shouldDeactivate;
  }
}
