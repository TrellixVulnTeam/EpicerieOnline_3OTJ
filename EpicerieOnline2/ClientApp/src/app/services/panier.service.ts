import { Injectable, EventEmitter } from '@angular/core';
import { PanierInfo } from '../models/panierInfo';
import { Product } from '../models/product';




@Injectable({
  providedIn: 'root'
})
export class PanierService {

  constructor() { }

  $panier = new EventEmitter()



  panierInfo: PanierInfo = {
      products: [],
      totalPrice: 0,
      nbProducts: 0
  }

  products: Product[] = [];
 
  



  addProductLocalStorage(p: Product, quantity:number) {

    let local = localStorage.getItem('panier');

    let localPanierInfo: PanierInfo = {
      products:[] as Product[],
      nbProducts: 0 as number,
      totalPrice:0 as number
    }

    let localProducts: Product[] = [];


   

    if (local) {

      localPanierInfo = JSON.parse(local) as PanierInfo

      localProducts = localPanierInfo.products;

      let localProductToWork = localProducts.find(x => x.title == p.title) as Product;

      if (localProductToWork) {

        for (let i = 0; i < localProducts.length; i++) {
          if (localProducts[i].title === p.title) {


            if (quantity < 0 && localProducts[i].quantity == 1) {

              this.deleteProductLocalStorage(localProducts[i].id, localProducts[i].price);

              return;
            }

            localProducts[i].quantity += quantity;
          }
        }


        localPanierInfo.products = localProducts;

        localPanierInfo.nbProducts += quantity;

        localPanierInfo.totalPrice += (p.price * quantity)

        localStorage.setItem('panier', JSON.stringify(localPanierInfo));

        this.$panier.emit(localPanierInfo);




          } else {

        p.quantity = quantity;

        localProducts.push(p);

        localPanierInfo.products = localProducts;

        localPanierInfo.nbProducts += quantity;

        localPanierInfo.totalPrice += (p.price * quantity)

        localStorage.setItem('panier', JSON.stringify(localPanierInfo));

        this.$panier.emit(localPanierInfo);



          }

    }
    else {

      console.log("create local storage", this.products);

      p.quantity = quantity;

      localProducts.push(p)

      localPanierInfo.products = localProducts;

      localPanierInfo.nbProducts = quantity;

      localPanierInfo.totalPrice = (p.price * quantity)

      localStorage.setItem('panier', JSON.stringify(localPanierInfo));

      this.$panier.emit(localPanierInfo);

    }

  }



  getProductsLocalStorage(): PanierInfo {

    if (localStorage.getItem("panier") !== null) {

      let panierJSON = JSON.parse(localStorage.getItem('panier'));

      this.panierInfo = panierJSON;

      return this.panierInfo;
    }

    return { products:[], totalPrice: 0, nbProducts:0 };

  }



  deleteProductLocalStorage(id: number, price: number, deleteAll: boolean = true) {

    console.log("id, price", id + "   " + price)

    let localPanierInfo: PanierInfo = {
      products: [] as Product[],
      nbProducts: 0 as number,
      totalPrice: 0 as number
    }

    let localProducts: Product[] = [];


     localPanierInfo = JSON.parse(localStorage.getItem('panier'));
 
     localProducts = localPanierInfo.products;




    let numberToDelete = localProducts.find(p => p.id == id).quantity;

    if (localPanierInfo.nbProducts > 0) {
      localPanierInfo.nbProducts -= numberToDelete;
      localPanierInfo.totalPrice -= (price * numberToDelete);
    }
    else {
      localPanierInfo.totalPrice = 0;
      localPanierInfo.nbProducts = 0
    }


    let index = localProducts.map(x => {
      return x.id;
    }).indexOf(id);


    localProducts.splice(index, 1);

    localPanierInfo.products = localProducts;

    localStorage.setItem('panier', JSON.stringify(localPanierInfo));

    this.$panier.emit(localPanierInfo);

  }

}





