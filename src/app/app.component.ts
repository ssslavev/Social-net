import { Component, OnInit } from '@angular/core';
import { NotificationsService } from './services/notifications.service';
import { MessageService } from 'primeng/api';
import * as io from 'socket.io-client';
import { ChatAdapter } from 'ng-chat';
import { SocketIoAdapter } from './chat/socketio-adapter';
import { UsersService } from './services/users.service';
import { HttpClient } from '@angular/common/http';
import { FriendReqService } from './services/friend-req.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  error;
  success;
  loggedIn;
  id: number;
  loading;
  http: HttpClient;
  userId = 1;
  filteredParticipants;
  requests;
  user$;
  isLoggedIn$;
  subscription;
  subscription2;
  public adapter: ChatAdapter; 
  



  constructor(private notificationService: NotificationsService,
    private reqService: FriendReqService) {
    this.notificationService.emitChange.subscribe(
      message => {
        if (message == 'Username already exists!') {
          this.error = message;
        } else if (message == 'You are registered') {
          this.success = message;
        }
      }
    );
  }

  ngOnInit() {

    if (localStorage.getItem('logged-user-id')) {
      this.user$ = localStorage.getItem('logged-user-name');
      this.isLoggedIn$ = localStorage.getItem('logged-user-id');

    } else {
      this.subscription = this.notificationService.emitUserNameChange.subscribe(name => {
        this.user$ = name;
      });

      this.subscription2 = this.notificationService.emitUserIdChange.subscribe(id => {
        this.isLoggedIn$ = id;
      });

    }

    this.adapter = new SocketIoAdapter(this.isLoggedIn$);


    this.notificationService.getSpinerChange.subscribe(loading => {
      this.loading = loading;
    })

    /*  const socket = io('http://localhost:3000');
     this.adapter.listFriends().subscribe(res => this.filteredParticipants = res);
     socket.on('connect', () => {
       socket.on('chat', (data) => {
       })
     }) */

  }


  addClass(id) {
    this.id = id;
  }


}
