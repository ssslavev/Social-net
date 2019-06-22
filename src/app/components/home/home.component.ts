import { Component, OnInit, DoCheck } from '@angular/core';
import { PostsService } from 'src/app/core/services/posts.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { ChatAdapter } from 'ng-chat';
import { SocketIoAdapter } from 'src/app/chat/socketio-adapter';
import { FriendReqService } from 'src/app/core/services/friend-req.service';
import { Socket } from 'ng-socket-io';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {


  posts;
  id: number;
  postsSubscription;
  timerSubscription;
  source = timer(5000);
  loading;
  isLoggedIn;
  userId = localStorage.getItem('logged-user-id');
  adapter: ChatAdapter;

  post = {
    content: '',
    user_id: +localStorage.getItem('logged-user-id')
  }



  constructor(private postsService: PostsService,
    private notificationService: NotificationsService,
    private frReqService: FriendReqService,
    private socket: Socket
  ) {
    this.adapter = new SocketIoAdapter(this.frReqService, this.socket);
  }

  ngOnInit() {


    this.postsService.getAllPosts()
      .subscribe(posts => this.posts = posts);


  }

  ngDoCheck(): void {
    this.isLoggedIn = localStorage.getItem('logged-user-id');
    this.userId = localStorage.getItem('logged-user-id');
    this.loading = this.notificationService.loading;


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
    this.notificationService.changeLoading(true);
    // console.log('refresh')
    this.postsSubscription = this.postsService.getAllPosts().subscribe(posts => {
      this.posts = posts;
      //this.subscribeToData();
    },
      error => console.log(error),
      () => this.notificationService.changeLoading(false));
  }


  // private subscribeToData(): void {
  //  let subs = this.source.pipe(first())
  //  this.timerSubscription = subs.subscribe(() => this.refreshData());
  //}

}
