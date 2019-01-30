import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import {MessageService} from 'primeng/api';

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
    private notificationService: NotificationsService,
    private messageService: MessageService) {

  }

  ngOnInit() {
    let self = this;
    this.postsService.getAllPosts()
      .subscribe(posts => this.posts = posts);

    if (localStorage.getItem('logged-user-id')) {
      this.loggedIn = "You are logged in!";
    }
   
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
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
