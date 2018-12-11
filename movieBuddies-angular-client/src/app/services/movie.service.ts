import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  url: string;

  constructor() {
    let base = 'http://localhost:5500';
   
    this.url = base + '/api/movie';
  }

  

  findMovieByUserId(id) {
    return fetch(this.url + '/user/' + id, {
      credentials: 'include',
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return response.json();
      } else {
        return null;
      }
    });
  }


  findAllMovies() {
    return fetch(this.url, {
      credentials: 'include'
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return response.json();
      } else {
        return null;
      }
    });
  }


}


