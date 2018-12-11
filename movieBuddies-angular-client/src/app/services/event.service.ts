import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  url: string;
  eventUrl: string;

  constructor() {
    let base = 'http://localhost:5500';
    // if (!location.toString().includes('localhost')) {
    //   base = 'https://job-portal-server.herokuapp.com';
    // } else {
    //   base = 'http://localhost:5500';
    // }

    this.url = base + '/api/event';
    this.eventUrl = base + '/api/event/user';
  }


  findAllEvents() {
    // console.log('in here');
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


  findEventByUserId() {
    console.log('test pass');
    return fetch(this.eventUrl, {
      credentials: 'include',
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return response.json();
      } else {
        return null;
      }
    });
  }

  updateEvent(eventId, event) {
    // console.log(JSON.stringify(user));
    return fetch(this.url + '/' + eventId, {
      method: 'PUT',
      body: JSON.stringify(event),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then((response) => {
      return response.json();
    });
  }

  createEvent(event) {
    // console.log(JSON.stringify(user));
    return fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(event),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then((response) => {
      return response.json();
    });
  }

  deleteEvent(Id) {
    return fetch(this.url + '/' + Id, {
      method: 'DELETE',
      credentials: 'include'
    });
  }

  findEventById(id){
    console.log('test pass');
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
