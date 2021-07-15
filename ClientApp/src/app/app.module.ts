import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductFormComponent } from './ components/admin/product-form/product-form.component';
import { ProductsListComponent } from './ components/admin/products-list/products-list.component';
import { OrdersListComponent } from './ components/admin/orders-list/orders-list.component';
import { HomeComponent } from './ components/home/home.component';
import { NavMenuComponent } from './ components/nav-menu/nav-menu.component';
import { NotificationComponent } from './ components/notification/notification.component';
import { ProductsComponent } from './ components/products/products.component';
import { FooterComponent } from './ components/footer/footer.component';
import { CheckOutComponent } from './ components/check-out/check-out.component';

import { Router } from '@angular/router';












@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    ProductsListComponent,
    OrdersListComponent,
    HomeComponent,
    NavMenuComponent,
    NotificationComponent,
    ProductsComponent,
    FooterComponent,
    CheckOutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
   
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
