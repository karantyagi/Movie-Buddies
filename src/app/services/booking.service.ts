import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  url: string;

  constructor() {
    let base = 'http://localhost:5500';
    if (!location.toString().includes('localhost')) {
      base = 'https://movie-buddies.herokuapp.com';
    } else {
      base = 'http://localhost:5500';
    }
    this.url = base + '/api/booking';
  }

  updateBooking(bId, booking) {
    return fetch(this.url + '/' + bId, {
      method: 'PUT',
      body: JSON.stringify(booking),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return response.json();
      } else {
        return null;
      }
    });
  }
  //
  deleteBooking(bookingId) {
    return fetch(this.url + '/' + bookingId, {
      method: 'DELETE',
      credentials: 'include'
    });
  }

  createBooking(booking) {
    // console.log(JSON.stringify(user));
    return fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(booking),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then((response) => {
      return response.json();
    });
  }


  findBookingByUserId(id) {
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


  findBookingById(id){
    console.log('finding booking by id');
    return fetch(this.url + '/' + id, {
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
