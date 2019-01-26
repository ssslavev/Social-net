import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit {

  posts;

  userId = +localStorage.getItem('logged-user-id');

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPostsByUser(this.userId)
      .pipe(map(posts => {
        return posts.map(post => {
           return   {
            name: post.name,
            created_at : Date.parse(post.created_at),
            user_id: post.user_id,
            content: post.content
          }
        })
      }))
      .subscribe(posts => this.posts = posts,
        error => console.log(error)
      );
  }

}
