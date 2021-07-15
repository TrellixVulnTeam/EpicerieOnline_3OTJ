import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './ components/home/home.component';
import { ProductFormComponent } from './ components/admin/product-form/product-form.component';
import { ProductsListComponent } from './ components/admin/products-list/products-list.component';
import { OrdersListComponent } from './ components/admin/orders-list/orders-list.component';
import { ProductsComponent } from './ components/products/products.component';
import { CheckOutComponent } from './ components/check-out/check-out.component';

import { AuthGuard } from '@auth0/auth0-angular';






const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products/:id', component: ProductsComponent },

  { path: 'check-out', component: CheckOutComponent },


  /*---------------For Admins ------------------*/

  { path: 'admin/product/new', component: ProductFormComponent },
  { path: 'admin/product/:id', component: ProductFormComponent },
  { path: 'admin/product', component: ProductsListComponent },
  { path: 'admin/order', component: OrdersListComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
