import { Component, OnInit } from '@angular/core';

//Services

import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { LoggerService } from '../../../services/logger.service';

//Models

import { Category } from '../../../models/category';
import { Product } from '../../../models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  constructor(
    private logger: LoggerService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  categories: Category[];
  categoryId: number = 0;
  products: Product[];
  filterProducts: Product[];
  subscription: Subscription;

  notificationRed = false;
  notificationGreen = false;
  notificationRedAdmin = false;

  ngOnInit() {
    this.categoryService.getCategories().subscribe((res: Category[]) => {
      this.categories = res;
    });

    this.subscription = this.productService.getProducts().subscribe((res: Product[]) => {
      this.filterProducts = this.products = res;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }





  //Sleep function for notification

  sleep(time:any) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }



  //Delete product

  onDelete(id: number) {

    //Check if admin

    if (!this.logger.isAdmin()) {

      //Notification no admin

      this.notificationRedAdmin = true;
      this.sleep(2500).then(() => {
        this.notificationRedAdmin = false;
      });
      return;
    }

      this.productService.deleteProduct(id).subscribe((res: number) => {
        this.productService.getProducts().subscribe((res: Product[]) => {
          this.filterProducts = this.products = res;

          //Notification all good

          this.notificationGreen = true;
          this.sleep(2500).then(() => {
            this.notificationGreen = false;
          });
        })
      },
        err => {

          //Notification error

          this.notificationRed = true;
          this.sleep(2500).then(() => {
            this.notificationRed = false;
          });

        });
  }





  onSelect(categoryId:any) {
    this.filterProducts = (categoryId > 0) ?
      this.products.filter(p => p.categoryId == categoryId) :
      this.products;
  }






  filter(query: string) {
    this.filterProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }





}
