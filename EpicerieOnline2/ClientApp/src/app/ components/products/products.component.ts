import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { PanierService } from '../../services/panier.service';
import { FavoritesService } from '../../services/favorites.service';

import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { PanierInfo } from '../../models/panierInfo';
import { Product } from '../../models/product';
import { Favorites } from '../../models/favorites';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private panierService: PanierService,
    private favoritesService: FavoritesService,


  ) {
    route.params.subscribe(p => {
      this.categoryId = +p['id'];

      //if (isNaN(this.vehicle) || this.vehicleId <= 0) {
      //  router.navigate(['/vehicles']);
      //  return;
      //

    });

  }


  panierInfo: PanierInfo = {
    products: [],
    totalPrice: 0,
    nbProducts: 0
  }

  panier: Product[] = [];
  totalPrice: number;


  products: Product[] = [];
  filterProducts: Product[];


  favorites: Favorites = {
    favorites: [],
    nbFavorites: 0
  };

  categoryId: number = 0;
  category: Category;



  ngOnInit() {
    if (this.categoryId) {
      this.productService.getProducts()
        .subscribe((res: Product[]) => {
          if (res) {
            this.filterProducts = this.products = res.filter(p => p.categoryId == this.categoryId);

            //update the favorites from local storage, if needed.

            this.products.forEach((element_p, index_p, array_p) => {
              this.favorites.favorites.forEach((element_f, index_f, array_f) => {
                if (element_p.id == element_f) {
                  element_p.ifFavorite = true;
                }
              })
            })

          }
        })


      this.categoryService.getCategories()
        .subscribe((res: Category[]) => {
          if (res)
            this.category = res.find(p => p.id == this.categoryId);

        })

    }


    this.panierService.$panier.subscribe((res: PanierInfo) => {
      this.panierInfo = res;
    })



    this.panierInfo = this.panierService.getProductsLocalStorage();


    this.favorites = this.favoritesService.getFavoritesLocalStorage();




  }


  //change of heart(favorites) status, and update local storage

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


  isEmptyObject(obj:any) {
    return (obj && (Object.keys(obj).length === 0));
  }



  addProduct(p: Product, quantity: string) {
    if (+quantity > 5)
      quantity = '5';

    this.panierService.addProductLocalStorage(p, +quantity);
  }



  onDelete(id: number, price: number) {

    this.panierService.deleteProductLocalStorage(id, price)
  }


  minus(p: Product) {
    this.addProduct(p, '-1');
  }

  plus(p: Product) {
    this.addProduct(p, '1');
  }







}
