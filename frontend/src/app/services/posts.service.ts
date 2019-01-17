import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getAllPosts() {

    this.http.get('http://my-social-net/api/posts')
      .subscribe(res => console.log(res)),
      error => console.error(error);

  }
}


