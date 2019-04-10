import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { SearchCarComponent } from './components/search-car/search-car.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { LoginComponent } from './components/login/login.component';
import { Routes, RouterModule, PreloadAllModules}from "@angular/router";
import { Page404Component } from './components/page404/page404.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { OrderComponent } from './components/order/order.component';
import { LoginGuardService } from './services/login-guard.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { RegisteredUserLoginComponent } from './components/registered-user-login/registered-user-login.component';
import { NewRegisterComponent } from './components/new-register/new-register.component';

const routes:Routes=[
    {path: "home", component:HomeComponent},
    {path: "search-cars", component:SearchCarComponent},
    {path: "contact-us", component:ContactUsComponent},
    {path: "car-details/:carID", component:CarDetailsComponent},
    {path: "order", canActivate:[LoginGuardService],component:OrderComponent},
    {path: "my-orders", component:MyOrdersComponent},
    {path: "admin", canActivate:[LoginGuardService], loadChildren:"./admin.module#AdminModule"},
    {path: "login", component:LoginComponent},
    {path: "logout", redirectTo: "/home"},
    {path:"", redirectTo:"home", pathMatch:"full"},
    {path: "**", component:Page404Component}
]

@NgModule({
  declarations: [
       LayoutComponent,
       HeaderComponent,
       FooterComponent,
       NavBarComponent,
       HomeComponent,
       SearchCarComponent,
       MyOrdersComponent,
       LoginComponent,      
       Page404Component,  
       CarDetailsComponent,
       OrderComponent,
       ContactUsComponent,
       RegisteredUserLoginComponent,
       NewRegisterComponent, 
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules}),
    HttpClientModule,
    FormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
