import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getAllPosts() {

    return this.http.get('https://blooming-reef-24719.herokuapp.com/api/posts');

  }

  addPost(content: string, user_id: number) {
    return this.http.post('https://blooming-reef-24719.herokuapp.com/api/posts', {content, user_id})
  }

  getPostsByUser(userId: number): Observable<any> {
    return this.http.get(`https://blooming-reef-24719.herokuapp.com/api/users/posts/${userId}`);
  }
}


