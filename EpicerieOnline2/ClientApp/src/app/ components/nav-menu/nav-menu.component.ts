import { Component, OnInit, HostListener, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


//Import services

import { CustomerService } from '../../services/customer.service';
import { PanierService } from '../../services/panier.service';
import { FavoritesService } from '../../services/favorites.service';
import { ProductService } from '../../services/product.service';
import { LoggerService } from '../../services/logger.service';





//Import models

import { Favorites } from '../../models/favorites';
import { PanierInfo } from '../../models/panierInfo';
import { Product } from '../../models/product';
import { Customer } from '../../models/customer';
import { LoginUser } from '../../models/loginUser';






@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  customer: Customer = {
    id: 0,
    email: '',
    password: '',
    password_2:''

  }

  panierInfo: PanierInfo = {
    products: [],
    totalPrice: 0,
    nbProducts: 0
  }

  favorites: Favorites = {
    favorites: [],
    nbFavorites: 0
  }

  products: Product[] = [];

  pruductFavoris: Product[] = [];


  isExpanded = false;
  isSidebar = false;
  isSidebarChange = false;
  isCustomerImage = false;
  isDrop = false;


  picture: string;

  loginUser: LoginUser = {
    id: 0,
    email: '',
    roleId: 1,
    logged: false,
    invalideLoginOrPassword: false,
    emailAlreadyExists: false
  };


  notificationLogin = false;
  notificationNoLogin = false;
  notificationLogout = false;
  notificationNewAccount = false;
  notificationInvalidLoginOrPassword = false;
  notificationEmailAlreadyExists = false;
  notificationPasswordDontMatch = false;



  invalidLogin: boolean = false;
  passwordMatch: boolean = false;


  constructor(

    private router: Router,
    private customerService: CustomerService,
    private panierService: PanierService,
    private favoritesService: FavoritesService,
    private productService: ProductService,
    public logger: LoggerService
 
  ) {  }




  ngOnInit() {

    //Check if user is logged

    if (this.logger.isLogged())
      this.loginUser.logged = true;
    else
      this.loginUser.logged = false;

    this.logger.isLogged$.subscribe((l) => {
      this.loginUser = l
    });
 

     

      //Get products

      this.productService.getProducts().subscribe((res: Product[]) => {
        if (res)
          this.products = res;
        res.forEach((element, index, array) => {
          this.favorites.favorites.forEach((element_f, index_f, array_f) => {
            if (element.id == element_f)
              this.pruductFavoris.push(element);
          })
        })
      })




      //Get favorites

    this.favorites = this.favoritesService.getFavoritesLocalStorage();

      this.favoritesService.$favorites.subscribe((res: Favorites) => {
        this.favorites = res;
        this.pruductFavoris = [];
        this.products.forEach((element, index, array) => {
          this.favorites.favorites.forEach((element_f, index_f, array_f) => {
            if (element.id == element_f)
              this.pruductFavoris.push(element);
          })
        })
      })




      //Get 'mon panier'

      this.panierService.$panier.subscribe((res: PanierInfo) => {
        this.panierInfo = res;
      })
      this.panierInfo = this.panierService.getProductsLocalStorage();


  }






  //Sticky header-2

  isSticky = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 90) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }






  //Toggle for drop-menu

  toggle() {
    if (this.isSidebar) {
      this.isSidebar = !this.isSidebar;
      this.isSidebarFavorites = false;
      this.isSidebarLogin = false;
      this.isSidebarMonpanier = false;
    }
    this.isExpanded = !this.isExpanded;
  }


  //Sleep function for sidebars

  sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }






  //Sidebar open/close with icon 'flash'

  onSidebar($event:any) {
    if (this.isExpanded) {
      this.isExpanded = !this.isExpanded;
    }
    this.isSidebar = !this.isSidebar;

    if (this.isSidebarFavorites)
      this.isSidebarFavorites = false;

    if (this.isSidebarLogin)
      this.isSidebarLogin = false;

    if (this.isSidebarMonpanier)
      this.isSidebarMonpanier = false;
  }






  //Sidebar Mon Panier
  //$event is for disable <a href=""

  isSidebarMonpanier = false;
  onSidebarMonpanier($event:any) {
    $event.preventDefault()
    if (this.isSidebarFavorites || this.isSidebarLogin) {
      this.isSidebarLogin = false;
      this.isSidebarFavorites = false;
      this.isSidebar = !this.isSidebar;
      this.sleep(900).then(() => {
        this.isSidebar = !this.isSidebar;
        this.isSidebarMonpanier = !this.isSidebarMonpanier;
      });
      return;
    }
    if (this.isExpanded) {
      this.isExpanded = !this.isExpanded;
    }
    this.isSidebarMonpanier = !this.isSidebarMonpanier;
    this.isSidebar = !this.isSidebar;
  }






  //Sidebar with user login

  isSidebarLogin = false;
  onSidebarLogin($event:any) {
    $event.preventDefault()
    if (this.isSidebarFavorites || this.isSidebarMonpanier) {
      this.isSidebarFavorites = false;
      this.isSidebarMonpanier = false;
      this.isSidebar = !this.isSidebar;
      this.sleep(900).then(() => {
        this.isSidebar = !this.isSidebar;
        this.isSidebarLogin = !this.isSidebarLogin;
      });
      return;
    }
    if (this.isExpanded) {
      this.isExpanded = !this.isExpanded;
    }
    this.isSidebarLogin = !this.isSidebarLogin;
    this.isSidebar = !this.isSidebar;
  }

 






  //Sidebar with list the favorites

  isSidebarFavorites = false;
  onSidebarFavorites($event:any) {
    $event.preventDefault();
    if (this.isSidebarLogin || this.isSidebarMonpanier) {
      this.isSidebarLogin = false;
      this.isSidebarMonpanier = false;
      this.isSidebar = !this.isSidebar;
      this.sleep(550).then(() => {
        this.isSidebar = !this.isSidebar;
        this.isSidebarFavorites = !this.isSidebarFavorites;
      });
      return;
    }
    if (this.isExpanded) {
      this.isExpanded = !this.isExpanded;
    }
    this.isSidebarFavorites = !this.isSidebarFavorites;
    this.isSidebar = !this.isSidebar;
  }
 







  //Buttons in sidebar

  onDeleteFromFavorites(id: number) {
    this.favoritesService.deleteFavoritesLocalStorage(id);
  }
  deleteFromPanier(id: number, price: number) {
    this.panierService.deleteProductLocalStorage(id, price);
  }
  addToPanier(product: Product) {
    this.panierService.addProductLocalStorage(product, 1)
  }
  addAllToPanier() {
    for (let i = 0; i < this.pruductFavoris.length; i++) {
      this.panierService.addProductLocalStorage(this.pruductFavoris[i], 1)
    }
  }




  //Add product to the panier from sidebar

  addProduct(p: Product, quantity: string) {
    if (+quantity > 5)
      quantity = '5';

    this.panierService.addProductLocalStorage(p, +quantity);
  }



  //Delete product to the panier from sidebar

  onDelete(id: number, price: number) {

    this.panierService.deleteProductLocalStorage(id, price)
  }

  //+1

  minus(p: Product) {
    this.addProduct(p, '-1');
  }

  //-1

  plus(p: Product) {
    this.addProduct(p, '1');
  }




 




  //Change between login/register in sidebar

  onSidebarSideChange() {
    this.isSidebarChange = !this.isSidebarChange;
  }



  //Small drop-down manu in nav-bar

  onDrop() {
    this.isDrop = !this.isDrop;
  }





  //Register user

  register(f: any) {

    if (!f.valid) {

      this.notificationInvalidLoginOrPassword = true;

      this.sleep(2500).then(() => {
        this.notificationInvalidLoginOrPassword = false;
      });


    }

    if (this.customer.password !== this.customer.password_2) {
      this.notificationPasswordDontMatch = true;

      this.sleep(2500).then(() => {
        this.notificationPasswordDontMatch = false;
      });
      return;
    }


    this.customer.email = this.customer.email.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '') as string;
    this.customer.email = this.customer.email.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '') as string;

    this.customer.password = this.customer.password

    this.logger.registerUser(this.customer)

    this.logger.isLogged$.subscribe((l: LoginUser) => {
      if (l.emailAlreadyExists) {

        this.notificationEmailAlreadyExists = true;

        this.sleep(2500).then(() => {
          this.notificationEmailAlreadyExists = false;
        });

      } 
    })
  }
 


  //Login user

  logIn(f: any) {

    if (!f.valid) {

      this.notificationInvalidLoginOrPassword = true;

      this.sleep(2500).then(() => {
        this.notificationInvalidLoginOrPassword = false;
      });

    
    }


    this.logger.loginUser(this.customer);

    this.logger.isLogged$.subscribe((l: LoginUser) => {
      if (l.logged) {
        this.isSidebar = false;
        this.isSidebarLogin = false;

        this.notificationLogin = true;

        this.sleep(2500).then(() => {
          this.notificationLogin = false;
        });


      } else if (l.invalideLoginOrPassword) {

        this.notificationInvalidLoginOrPassword = true;

        this.sleep(2500).then(() => {
          this.notificationInvalidLoginOrPassword = false;
        });

      }
    })
   
     
    
   
  }


  //Logout user

  logOut($event:any) {
    $event.preventDefault()
    this.logger.logoutUser();

    this.notificationLogout = true;

    this.sleep(2500).then(() => {
      this.notificationLogout = false;
    });

    

  }



  //Send user to check-out page

  toCheckOut($event:any) {

    if (!this.logger.isLogged()) {

      this.onSidebarLogin($event);

      this.notificationNoLogin = true;
      this.sleep(3000).then(() => {
        this.notificationNoLogin = false;
      });

      return
    }

    this.onSidebar($event);

    this.sleep(500).then(() => {
      this.router.navigate(['/check-out']);

    });
  }




}
