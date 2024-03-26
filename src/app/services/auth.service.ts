import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // Define a subject to maintain logged in state across components
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // Attempt to login and check for security key
  login(adminCode: string) {
    this.isLoggedIn.next(adminCode === "1234");
    console.log(this.isLoggedIn);
  }

  // Provide option to logout
  logout() {
    this.isLoggedIn.next(false);
  }
}
