import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmationGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  allowNavigation = false

  canDeactivate(
    component: CanComponentDeactivate
  ): boolean {
    console.log("CONFIRMATION GUARD");
    if (this.allowNavigation) {
      console.log("INSIDE ALLOW NAVIGATION");
      return true; // Allow navigation if the shared variable is true
    }

    if (component.canDeactivate()) {
      console.log("INSIDE CANDEACTIVATE");
      return true; // Allow navigation if the component's canDeactivate method returns true
    }
    console.log("CONFIRMATION GUARD" + this.allowNavigation + " " + component.canDeactivate() );
    return false; // Prevent navigation if both conditions are not met
  }
}
