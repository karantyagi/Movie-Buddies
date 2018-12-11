import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  url: string;

  constructor() {
    let base = 'http://localhost:5500';
    this.url = base + '/api/booking';
  }
//update booking
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
  //delete booking 
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

    // Find a booking for a user by userid
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

    // Find a bookin by its id
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
