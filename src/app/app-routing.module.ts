import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarsComponent } from './cars/cars.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './profile/sign-in/sign-in.component';
import { SignUpComponent } from './profile/sign-up/sign-up.component';
import { ProfileSecurity } from './security/profile.security';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'cars', component: CarsComponent},
  { path: 'contacts', component: ContactsComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [ProfileSecurity],
    children: [
      
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
