import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http:HttpClient) { }

  addImage(userId, image) {
    return this.http.post(`http://my-social-net/api/users/${userId}/pictures`, image);
  }

  getAllImages() {

    return this.http.get('http://my-social-net/api/images');

  }
}
