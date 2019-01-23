import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 

  posts;
  loggedIn;
  id: number;

  post = {
    content: '',
    user_id: +localStorage.getItem('logged-user-id')
  }



  constructor(private postsService: PostsService,
    private notificationService: NotificationsService) {

  }

  ngOnInit() {
    let self = this;
    this.postsService.getAllPosts()
      .subscribe(posts => this.posts = posts);

    if (localStorage.getItem('logged-user-id')) {
      this.loggedIn = "You are logged in!";
    }

  }

  addPost() {
    console.log('here');
    const { content, user_id } = this.post;
    console.log(user_id);
    this.postsService.addPost(content, user_id);
  }

  addClass(id) {
    this.id = id;
  }

}
