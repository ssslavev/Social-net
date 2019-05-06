import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit {

  posts: [];

  userId: number;

  constructor(private postsService: PostsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.userId = params.id
      this.postsService.getPostsByUser(this.userId)
        .pipe(map(posts => {
          return posts.map(post => {
            return {
              name: post.name,
              created_at: Date.parse(post.created_at),
              user_id: post.user_id,
              content: post.content
            }
          })
        }))
        .subscribe(posts => this.posts = posts,
          error => console.log(error)
        );
    });

  }

}
