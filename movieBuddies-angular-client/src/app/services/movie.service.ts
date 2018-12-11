import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  url: string;

  constructor() {
    let base = 'http://localhost:5500';
    // if (!location.toString().includes('localhost')) {
    //   base = 'https://job-portal-server.herokuapp.com';
    // } else {
    //   base = 'http://localhost:5500';
    // }
    this.url = base + '/api/movie';
  }

  // updateUserProfile(user) {
  //   return fetch(this.urlUpdateProfile, {
  //     method: 'PUT',
  //     body: JSON.stringify(user),
  //     credentials: 'include',
  //     headers: {
  //       'content-type': 'application/json'
  //     }
  //   }).then(response => {
  //     if (response.headers.get('content-type') != null) {
  //       return response.json();
  //     } else {
  //       return null;
  //     }
  //   });
  // }
  //
  // deleteUser(userId) {
  //   return fetch(this.url + '/' + userId, {
  //     method: 'DELETE',
  //     credentials: 'include'
  //   });
  // }
  //
  // createUser(user) {
  //   return fetch(this.url , {
  //     method: 'POST',
  //     body: JSON.stringify(user),
  //     credentials: 'include',
  //     headers: {
  //       'content-type': 'application/json'
  //     }
  //   }).then(response => {
  //     if (response.headers.get('content-type') != null) {
  //       return response.json();
  //     } else {
  //       return null;
  //     }
  //   });
  // }

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

}


