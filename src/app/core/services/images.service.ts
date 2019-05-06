import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http:HttpClient) { }

  addImage(userId, image) {
    return this.http.post(`https://blooming-reef-24719.herokuapp.com/api/users/${userId}/pictures`, image);
  }

  getImagesByUserId(userId) {

    return this.http.get(`https://blooming-reef-24719.herokuapp.com/api/users/${userId}/images`);

  }
}
