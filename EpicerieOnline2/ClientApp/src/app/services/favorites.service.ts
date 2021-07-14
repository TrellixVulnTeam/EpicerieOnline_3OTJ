import { Injectable, EventEmitter } from '@angular/core';
import { Favorites } from '../models/favorites';


@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor() { }

  $favorites = new EventEmitter();

  favorites: Favorites = {
      favorites: [],
      nbFavorites:0
    }


  addFavoritesLocalStorage(id: number) {
    this.favorites.nbFavorites++;
    this.favorites.favorites.push(id);

    this.$favorites.emit(this.favorites);

    localStorage.setItem('favorites', JSON.stringify(this.favorites));


  }


  getFavoritesLocalStorage(): Favorites {

    if (localStorage.getItem("favorites")) {

      let favoritesJSON = JSON.parse(localStorage.getItem('favorites')) ? JSON.parse(localStorage.getItem('favorites')) : '';

      this.favorites = favoritesJSON;

      return this.favorites;
    }

    return { favorites: [], nbFavorites: 0 };
  }


  deleteFavoritesLocalStorage(id:number) {

    let favoritesJSON: Favorites = JSON.parse(localStorage.getItem('favorites'));
    let favorites: number[] = favoritesJSON.favorites;

    //favorites from local storage

    favoritesJSON.nbFavorites--;

    //favorites EventEmitter

    this.favorites.nbFavorites--;




    let index = favorites.indexOf(id);
 


 


    favorites.splice(index, 1);
    this.favorites.favorites.splice(index, 1);





    favoritesJSON.favorites = favorites;

    localStorage.setItem('favorites', JSON.stringify(favoritesJSON));



    this.$favorites.emit(this.favorites);



  }
}
