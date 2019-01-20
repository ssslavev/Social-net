import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts;

  post = {
    content: '',
    user_id: +localStorage.getItem('logged-user-id')
  }



  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getAllPosts()
      .subscribe(posts => this.posts = posts);
  }

  addPost() {
    console.log('here');
    const {content, user_id} = this.post;
    console.log(user_id);
    this.postsService.addPost(content, user_id);
  }

}
