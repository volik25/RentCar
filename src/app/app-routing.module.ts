import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarsComponent } from './cars/cars.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './profile/sign-in/sign-in.component';
import { SignUpComponent } from './profile/sign-up/sign-up.component';
import { ProfileSecurity } from './security/profile.security';
import { AdminCarsComponent } from './profile/admin/admin-cars/admin-cars.component';
import { AdminPlacesComponent } from './profile/admin/admin-places/admin-places.component';
import { OrdersComponent } from './profile/orders/orders.component';
import { AdminSecurity } from './security/admin.security';
import { EditCarComponent } from './profile/admin/admin-cars/edit-car/edit-car.component';
import { EditUserComponent } from './profile/user/edit-user/edit-user.component';
import { CarInfoComponent } from './cars/car-info/car-info.component';
import { CarOrderComponent } from './cars/car-order/car-order.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'cars', component: CarsComponent},
  { path: 'edit-car', component: EditCarComponent},
  { path: 'edit-user', component: EditUserComponent},
  { path: 'car-info', component: CarInfoComponent},
  { path: 'car-order', component: CarOrderComponent},
  { path: 'contacts', component: ContactsComponent},
  { path: 'sign-in', component: SignInComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'profile', component: ProfileComponent,
    canActivate: [ProfileSecurity],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'orders' },
      { path: 'orders', component: OrdersComponent },
      { path: 'admin-cars', component: AdminCarsComponent, canActivate: [AdminSecurity] },
      { path: 'admin-places', component: AdminPlacesComponent, canActivate: [AdminSecurity] },
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
