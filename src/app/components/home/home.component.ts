import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { timer } from 'rxjs';
import { first } from 'rxjs/operators';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  posts;
  loggedIn;
  id: number;
  postsSubscription;
  timerSubscription;
  source = timer(5000);
  loading;

  post = {
    content: '',
    user_id: +localStorage.getItem('logged-user-id')
  }



  constructor(private postsService: PostsService,
    private notificationService: NotificationsService,
    private messageService: MessageService) {

  }

  ngOnInit() {


    this.postsService.getAllPosts()
      .subscribe(posts => this.posts = posts);

    if (localStorage.getItem('logged-user-id')) {
      this.loggedIn = "You are logged in!";
    }

    this.notificationService.getSpinerChange.subscribe(loading => {
      this.loading = loading;
    })

  }


  addPost() {
    //console.log('here');
    const { content, user_id } = this.post;
    console.log(user_id);
    this.postsService.addPost(content, user_id).subscribe(res => {
      //console.log(res)
      this.post.content = null;
      this.refreshData();
    },
      error => console.log(error));;

  }

  addClass(id) {
    this.id = id;
  }


  private refreshData(): void {
    this.notificationService.emitSpiner(true);
   // console.log('refresh')
    this.postsSubscription = this.postsService.getAllPosts().subscribe(posts => {
      this.posts = posts;
      //this.subscribeToData();
    },
    error=>console.log(error),
    ()=> this.notificationService.emitSpiner(false));
  }


 // private subscribeToData(): void {
  //  let subs = this.source.pipe(first())
  //  this.timerSubscription = subs.subscribe(() => this.refreshData());
  //}

}
