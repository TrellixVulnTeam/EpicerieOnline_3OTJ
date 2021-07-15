import { Injectable, EventEmitter } from '@angular/core';

import { TokenService } from './../services/token.service';
import { Router } from '@angular/router';
import { CustomerService } from './../services/customer.service';

import { SaveCustomer } from './../models/customer';
import { LoginUser } from './../models/loginUser';






@Injectable({
  providedIn: 'root'
})
export class LoggerService {



  loggedUser: LoginUser = {
    id: 0,
    roleId: 1,
    email:'',
    logged: false,
    token:'',
    invalideLoginOrPassword: false,
    emailAlreadyExists:false
    }


  isLogged$ = new EventEmitter();

  constructor(
    private router: Router,
    private token: TokenService,
    private customerService: CustomerService,
  ) { }





  //Registere user

  registerUser(customer: SaveCustomer) {
    this.customerService.create(customer)
      .subscribe(
        (res) => {


          ////Redirect to home page after registration

          //this.router.navigate(['/'])
          //  .then(() => {
          //    window.location.reload();
          //  })



        },
        (err) => {

          if (err.status == 409) {
            this.loggedUser.emailAlreadyExists = true;
            this.isLogged$.emit(this.loggedUser)

          }
        }
      )
  }








  //Login user

  loginUser(customer: SaveCustomer) {

    this.customerService.login(customer).subscribe((res) => {

      //Parse JSON object from response

      let resJSON = JSON.parse(res);

      //Save token in session storage

      console.log("resJSON", resJSON);

      this.token.saveToken(resJSON.Token);


      //Update user data

      this.loggedUser.id     = resJSON.UserId;
      this.loggedUser.roleId = resJSON.UserRoleId;
      this.loggedUser.email  = resJSON.UserEmail;
      this.loggedUser.logged = true;

      this.isLogged$.emit(this.loggedUser)

      sessionStorage.setItem("log", JSON.stringify(this.loggedUser));

      console.log("after login", this.loggedUser);


    }, (err) => {
          //400 wrong email or password
        if (err.status == 400) {
          this.loggedUser.invalideLoginOrPassword = true;
          this.isLogged$.emit(this.loggedUser)

          
        } 

    });


  }




  //Check if admin is logged

  isAdmin(): boolean {
    let log = sessionStorage.getItem('log');

    if (log) {

     let login = JSON.parse(log) as LoginUser;

      if (login.roleId === 2)
        return true;

    }

    return false;
  }




  //Check if user is logged

  isLogged(): boolean {

    if (this.token.isToken()) {
      this.loggedUser.logged = true
      this.isLogged$.emit(this.loggedUser);
      return true;
    }
    else {

      this.loggedUser.logged = false;
      this.isLogged$.emit(this.loggedUser);

      return false;
    }
  }






  //Logout user

  logoutUser() {

    //Delete token

    this.token.deleteToken();


    //Delete user from session storage

    sessionStorage.removeItem('log');


  //User is logout

  this.loggedUser.logged = false;
  this.isLogged$.emit(this.loggedUser)

  }





  //Get user data from session storage

  getUserFromSessionStorage():string {
    let user = sessionStorage.getItem('log');

    if (user)
      return user;

    return '';
  }






}
