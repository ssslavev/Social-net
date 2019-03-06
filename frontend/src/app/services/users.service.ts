import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUserById(id) {
    return this.http.get(`http://my-social-net/api/users/${id}`);
  }

  getAllUsers() {
    return this.http.get('http://my-social-net/api/users');
  }
}


