import { Component, OnInit } from '@angular/core';

//Services

import { CategoryService } from '../../../services/category.service';
import { LoggerService } from '../../../services/logger.service';
import { ProductService } from '../../../services/product.service';


//Models

import { Product } from '../../../models/product';
import { Category } from '../../../models/category';
import { Favorites } from '../../../models/favorites';

import { ActivatedRoute } from '@angular/router';
import { LoginUser } from '../../../models/loginUser';



@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {



  constructor(

    private logger: LoggerService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {

    route.params.subscribe(p => {
      if (p)
        this.productId = +p['id'];
    });
  }


  ngOnInit() {

    this.categoryService.getCategories().subscribe((res: Category[]) => {

      this.categories = res;

    })

    if (this.productId) {
      this.productService.getProduct(this.productId)
        .subscribe((res: Product) => {

          this.product = res;

        })
    }
  }



  categories: Category[];

  productId: number = 0;

  product: Product = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    unit: '',
    imageUrl: '',
    categoryId: 0
  }

  units: string[] = [
    'Pièce',
    'Kg',
    'Litre'
  ]

  isFavorite = false;

  onFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  notificationRed = false;
  notificationGreenNew = false;
  notificationGreenEdit = false;
  notificationRedAdmin = false;




  //Sleep function for count down the display time notification

  sleep(time:any) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }




  //Create product

  addProduct() {

    //Update product in form 

    if (this.product.id != 0) {

      //Check if user is admin

      if (!this.logger.isAdmin()) {

        //Notification if no admin

        this.notificationRedAdmin = true;
        this.sleep(2500).then(() => {
          this.notificationRedAdmin = false;
        });

        return;

      }
        this.productService.updateProduct(this.product)
          .subscribe((res: Product) => {
            if (res) {
              this.product = res;

              this.notificationGreenEdit = true;
              this.sleep(2500).then(() => {
                this.notificationGreenEdit = false;
              });
            }
          })

    } else {

      //Check if admin

      if (!this.logger.isAdmin()) {

        //Notification if no admin

        this.notificationRedAdmin = true;
        this.sleep(2500).then(() => {
          this.notificationRedAdmin = false;
        });
        return;
      }

      //Create new product

        this.productService.createProduct(this.product)
          .subscribe(res => {
            if (res) {

              //Notification product created

              this.notificationGreenNew = true;
              this.sleep(2500).then(() => {
                this.notificationGreenNew = false;
              });
            }
          })
    }
  }



}
