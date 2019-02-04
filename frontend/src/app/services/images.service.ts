import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http:HttpClient) { }

  getAllImages() {

    return this.http.get('http://my-social-net/api/images');

  }
}
