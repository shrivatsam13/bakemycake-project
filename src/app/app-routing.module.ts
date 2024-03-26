import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingViewComponent } from './landing-view/landing-view.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { CanDeactivateGuard } from './can-deactivate.guard';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { ConfirmationGuard } from './confirmation.guard';

const routes: Routes = [
  { path: "", component: LandingViewComponent },
  { path: "login", component: LoginViewComponent},
  { path: "orderConfirmation", component: OrderConfirmationComponent},
  { path: "admin", component: AdminViewComponent },
  { path: "orderView/:name/:price/:url/:category/:rating", component: OrderViewComponent, canDeactivate: [CanDeactivateGuard] },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
