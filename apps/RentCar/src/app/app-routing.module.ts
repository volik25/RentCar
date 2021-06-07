import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarsComponent } from './cars/cars.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './profile/sign-in/sign-in.component';
import { SignUpComponent } from './profile/sign-up/sign-up.component';
import { AdminCarsComponent } from './profile/admin/admin-cars/admin-cars.component';
import { AdminPlacesComponent } from './profile/admin/admin-places/admin-places.component';
import { OrdersComponent } from './profile/orders/orders.component';
import { EditCarComponent } from './profile/admin/admin-cars/edit-car/edit-car.component';
import { EditUserComponent } from './profile/user/edit-user/edit-user.component';
import { CarInfoComponent } from './cars/car-info/car-info.component';
import { CarOrderComponent } from './cars/car-order/car-order.component';
import { AuthModalComponent } from './profile/auth-modal/auth-modal.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserComponent } from './profile/user/user.component';
import { AdminSecurity } from './_security/admin.security';
import { ProfileSecurity } from './_security/profile.security';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'cars', component: CarsComponent},
  { path: 'edit-car', component: EditCarComponent},
  { path: 'edit-user', component: EditUserComponent},
  { path: 'cars/:id', component: CarInfoComponent, children: [
    { path: 'order', component: CarOrderComponent},
  ]},
  { path: 'contacts', component: ContactsComponent},
  { path: 'sign-in', component: SignInComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'auth-modal', component: AuthModalComponent},
  { path: 'profile', component: ProfileComponent,
    canActivate: [ProfileSecurity],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'user' },
      { path: 'user', component: UserComponent},
      { path: 'orders', component: OrdersComponent },
      { path: 'admin-cars', component: AdminCarsComponent, canActivate: [AdminSecurity] },
      { path: 'admin-places', component: AdminPlacesComponent, canActivate: [AdminSecurity] },
    ]},
  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
