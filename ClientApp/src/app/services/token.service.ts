import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }




  //Save token in session storage

  saveToken(token: string) {

    if (!sessionStorage.getItem('epicerieOnline')) {
      sessionStorage.setItem('epicerieOnline', token);
    }
    else {
      sessionStorage.removeItem('epicerieOnline');
      sessionStorage.setItem('epicerieOnline', token);
    }

  }


  //Get token from session storage

  getToken():string {
    if (this.isToken) {
      return sessionStorage.getItem('epicerieOnline');
    }

    return '';
  }




  //Check if token exist in session storage

  isToken(): boolean {
    if (!sessionStorage.getItem('epicerieOnline')) {
      return false;
    }
    else return true;
  }








  //Delete token from session  storege

  deleteToken() {
    if (sessionStorage.getItem('epicerieOnline')) {
      sessionStorage.removeItem('epicerieOnline');
    }
  }







}
