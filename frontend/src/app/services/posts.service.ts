import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getAllPosts() {

    return this.http.get('http://my-social-net/api/posts');

  }

  addPost(content: string, user_id: number) {
    return this.http.post('http://my-social-net/api/posts', {content, user_id})
    .subscribe(res=>console.log(res),
    error=>console.log(error));
  }

  getPostsByUser(userId: number): Observable<any> {
    return this.http.get(`http://my-social-net/api/users/posts/${userId}`);
  }
}


