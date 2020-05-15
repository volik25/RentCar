import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { HomeComponent } from './home/home.component';
import { CarsComponent } from './cars/cars.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProfileComponent } from './profile/profile.component';
import { CarsFiltersComponent } from './cars/cars-filters/cars-filters.component';
import { Ng5SliderModule } from 'ng5-slider';
import { SignInComponent } from './profile/sign-in/sign-in.component';
import { SignUpComponent } from './profile/sign-up/sign-up.component';
import { ApiService } from './services/api.service';
import { LoadingService } from './services/loading.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProfileSecurity } from './security/profile.security';
import { AdminSecurity } from './security/admin.security';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserComponent } from './profile/user/user.component';
import { OrdersComponent } from './profile/orders/orders.component';
import { AdminCarsComponent } from './profile/admin/admin-cars/admin-cars.component';
import { AdminPlacesComponent } from './profile/admin/admin-places/admin-places.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    HomeComponent,
    CarsComponent,
    ContactsComponent,
    ProfileComponent,
    CarsFiltersComponent,
    SignInComponent,
    SignUpComponent,
    UserComponent,
    OrdersComponent,
    AdminCarsComponent,
    AdminPlacesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng5SliderModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    LoadingService,
    FormBuilder,
    ProfileSecurity,
    AdminSecurity,
    ApiService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
