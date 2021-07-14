import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { PanierService } from '../../services/panier.service';
import { FavoritesService } from '../../services/favorites.service';


import { Favorites } from '../../models/favorites';
import { Category } from '../../models/category';
import { Product } from '../../models/product';






@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private favoritesService: FavoritesService,
    private panierService: PanierService,
  ) {

  }

  categories: Category[];
  products: Product[];
  randomFiveProducts: Product[] = [];

  favorites: Favorites = {
    favorites: [],
    nbFavorites: 0
  };


  five: number = 0;




  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe((res: Category[]) => {
        if (res)
          this.categories = res;
      })

    this.productService.getProducts()
      .subscribe((res: Product[]) => {
        if (res) {

          for (let i = 0; i < res.length; i++) {
            if (Math.random() < 0.5 && this.five < 6) {
              this.randomFiveProducts.push(res[i]);
              this.five++;
            }
          }


          this.products = this.randomFiveProducts;



          //update the favorites from local storage, if needed.

          this.products.forEach((element_p, index_p, array_p) => {
            this.favorites.favorites.forEach((element_f, index_f, array_f) => {
              if (element_p.id == element_f) {
                element_p.ifFavorite = true;
              }
            })
          })




        }

        //this.products = res;
      })





    this.favorites = this.favoritesService.getFavoritesLocalStorage();

  }


  addProduct(p: Product, quantity: string) {
    if (+quantity > 5)
      quantity = '5';

    this.panierService.addProductLocalStorage(p, +quantity);
  }



  onFavorite(id: number) {
    let index = this.products.findIndex(p => p.id == id);

    if (!this.products[index].ifFavorite) {
      this.products[index].ifFavorite = true;
      this.favoritesService.addFavoritesLocalStorage(id);

    }
    else {
      this.products[index].ifFavorite = false;
      this.favoritesService.deleteFavoritesLocalStorage(id);
    }


  }


}
