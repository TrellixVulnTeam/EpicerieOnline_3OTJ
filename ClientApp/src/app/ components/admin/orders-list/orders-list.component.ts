import { Component, OnInit } from '@angular/core';

//Services

import { OrderService } from '../../../services/order.service';
import { LoggerService } from '../../../services/logger.service';



//Models

import { OrderFromServer, UpdateOrder } from '../../../models/order';




@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {


  notificationValide = false;
  notificationDelete = false;
  notificationAdminError = false;

  orders: OrderFromServer[] = [];


  orderUpdate: UpdateOrder = {
    id: 0,
    customerId: 0,
    name: '',
    address: '',
    priceTotal: 0,
    isCompleted: false,
    isValidate: false,
    products:[]
  }


  orderDetails: OrderFromServer = {
    id: 0,
    customer: {
      id: 0,
      roleId: 0,
      email: '',
      password:''
    },
    date: '',
    isCompleted: false,
    isValidate: false,
    name: '',
    address: '',
    priceTotal: 0,
    products: []
  }


  constructor(
    private logger: LoggerService,
    private orderService: OrderService) {
    orderService.getOrders().subscribe((res: OrderFromServer[]) => {
      this.orders = res;

      console.log("this.log", this.orders);

    })
  }




  ngOnInit(): void {
  }




  //Sleep function for sidebars

  sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }



  //Show Modal

  showmodal = false;

  showModal(o: OrderFromServer) {

    console.log("o", o);

    this.orderDetails = o;

    this.showmodal = !this.showmodal;
  }


  //Change 'Est Valider' to true

  valide() {

    //Check if admin

    if (!this.logger.isAdmin()) {

      //Notification error

      this.notificationAdminError = true;
      this.sleep(2500).then(() => {
        this.notificationAdminError = false;
      });


      return;
    }

      

      if (this.orderDetails.id > 0) {
        this.orderDetails.isValidate = true;

        this.orderUpdate.id = this.orderDetails.id;
        this.orderUpdate.customerId = this.orderDetails.customer.id;
        this.orderUpdate.name = this.orderDetails.name;
        this.orderUpdate.address = this.orderDetails.address;
        this.orderUpdate.priceTotal = this.orderDetails.priceTotal;
        this.orderUpdate.isValidate = this.orderDetails.isValidate;
        this.orderUpdate.isCompleted = this.orderDetails.isCompleted;
        this.orderUpdate.products = this.orderDetails.products;

        this.orderService.updateOrder(this.orderUpdate).subscribe((res: any) => {

          //Notification when order register to database ok

          this.notificationValide = true;
          this.sleep(3500).then(() => {
            this.notificationValide = false;
          });

          this.showmodal = false;

        })
      }
    } 

    


    
  

  //Delete order

  delete(order: OrderFromServer) {

    //Check if admin

    if (!this.logger.isAdmin()) {

      //Notification error

      this.notificationAdminError = true;
      this.sleep(2500).then(() => {
        this.notificationAdminError = false;
      });


      return;
    }


    this.orderService.deleteOrder(order.id).subscribe((res: any) => {

      this.orderService.getOrders().subscribe((orders: OrderFromServer[]) => {
        this.orders = orders;

        //Notification when order register to database ok

        this.notificationDelete = true;
        this.sleep(3500).then(() => {
          this.notificationDelete = false;
        });


      })


      console.log("res", res);

    })
  }



}
