import { Component, OnInit } from '@angular/core';

import { PanierService } from '../../services/panier.service';
import { LoggerService } from '../../services/logger.service';
import { OrderService } from '../../services/order.service';



import { PanierInfo } from '../../models/panierInfo';
import { Product } from '../../models/product';
import { Order, SaveForOrderProduct, OrderFromServer } from '../../models/order';
import { LoginUser } from '../../models/loginUser';




@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  loggedUser: LoginUser = {
    id: 0,
    email: '',
    roleId: 0,
  };
  panierInfo: PanierInfo;

  order: Order = {
    id: 0,
    customerId: 0,
    name: '',
    address: '',
    priceTotal: 0,
    products: []
  }

  resFromServer: OrderFromServer = {
    id: 0,
    customer: {
      id: 0,
      email: '',
      password: '',
      roleId:0
    },
    date: '',
    isCompleted: false,
    isValidate: false,
    name: '',
    address: '',
    priceTotal: 0,
    products:[]
  }

  orderSend: boolean = false;

  notificationOrderSend = false;

  notificationOrderError = false;

  constructor(private panierService: PanierService,
              private loggerService: LoggerService,
              private orderService: OrderService) {


    let userString = this.loggerService.getUserFromSessionStorage();
    this.loggedUser = JSON.parse(userString) as LoginUser;

    this.loggerService.isLogged$.subscribe((loggedUser: LoginUser) => {

      this.loggedUser = loggedUser;
    })


    this.panierInfo = panierService.getProductsLocalStorage();

    panierService.$panier.subscribe((panierInfo: PanierInfo) => {
      this.panierInfo = panierInfo;
    })
  }

  ngOnInit(): void {

  }


  //Sleep function for sidebars

  sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }


  //Delete product from order

  delete(p: Product) {
    this.panierService.deleteProductLocalStorage(p.id, p.price);
  }


  //Send order

  submit(f: any) {
    this.order.customerId = this.loggedUser.id;
    this.order.name = f.name;
    this.order.address = `${f.adresse_1} ${f.adresse_2}, ${f.city} ${f.code_post}`;
    //Delete properties not used (refactor after!)

    for (let i = 0; i < this.panierInfo.products.length; i++) {

      this.order.priceTotal += (+this.panierInfo.products[i].price * +this.panierInfo.products[i].quantity);


      delete this.panierInfo.products[i].title;
      delete this.panierInfo.products[i].description;
      delete this.panierInfo.products[i].price;
      delete this.panierInfo.products[i].unit;
      delete this.panierInfo.products[i].imageUrl;
      delete this.panierInfo.products[i].ifFavorite;
      delete this.panierInfo.products[i].categoryId;


      console.log("this.order.priceTotal", this.panierInfo.products[i].price);

      //Add all products from  user panier to user order

      this.order.products.push(this.panierInfo.products[i]);
    }


    this.orderService.createOrder(this.order).subscribe((res: OrderFromServer) => {

      console.log('res order', res);

      this.resFromServer = res;



      //Notification when order register to database ok

      this.notificationOrderSend = true;

      this.sleep(2500).then(() => {
        this.notificationOrderSend = false;
      });


      this.orderSend = true;

    }, (err:any) => {



        //Notification if something wrong

        this.notificationOrderError = true;

        this.sleep(2500).then(() => {
          this.notificationOrderError = false;
        });


    })



    console.log("send order", this.order);


    


  }

}
