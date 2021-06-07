import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule, FormBuilder } from "@angular/forms";
import { NgbModule, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Ng5SliderModule } from "ng5-slider";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CarCommentsComponent } from "./cars/car-info/car-comments/car-comments.component";
import { CarInfoComponent } from "./cars/car-info/car-info.component";
import { CarOrderComponent } from "./cars/car-order/car-order.component";
import { CarsFiltersComponent } from "./cars/cars-filters/cars-filters.component";
import { CarsComponent } from "./cars/cars.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { LoaderComponent } from "./loader/loader.component";
import { MainMenuComponent } from "./main-menu/main-menu.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AdminCarsComponent } from "./profile/admin/admin-cars/admin-cars.component";
import { EditCarComponent } from "./profile/admin/admin-cars/edit-car/edit-car.component";
import { AdminPlacesComponent } from "./profile/admin/admin-places/admin-places.component";
import { AuthModalComponent } from "./profile/auth-modal/auth-modal.component";
import { OrdersComponent } from "./profile/orders/orders.component";
import { ProfileComponent } from "./profile/profile.component";
import { SignInComponent } from "./profile/sign-in/sign-in.component";
import { SignUpComponent } from "./profile/sign-up/sign-up.component";
import { EditUserComponent } from "./profile/user/edit-user/edit-user.component";
import { UserComponent } from "./profile/user/user.component";
import { ProgScrollComponent } from "./prog-scroll/prog-scroll.component";
import { AuthInterceptor } from "./_interceptors/auth.interceptor";
import { ProfileSecurity } from "./_security/profile.security";
import { AuthService } from "./_services/auth.service";
import { LoadingService } from "./_services/loading.service";
import { notFoundService } from "./_services/notFound.service";
import { FilesManagerComponent } from "./_utils/files-manager/files-manager.component";
import { UserService } from './_services/user.service';
import { CarService } from './_services/car.service';
import { OrderService } from './_services/order.service';


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
    AdminPlacesComponent,
    EditCarComponent,
    EditUserComponent,
    FilesManagerComponent,
    LoaderComponent,
    CarInfoComponent,
    CarOrderComponent,
    AuthModalComponent,
    NotFoundComponent,
    FooterComponent,
    ProgScrollComponent,
    CarCommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng5SliderModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    NgbActiveModal,
    LoadingService,
    FormBuilder,
    ProfileSecurity,
    AuthService,
    UserService,
    CarService,
    OrderService,
    notFoundService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
