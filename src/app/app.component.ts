import { Component, OnInit } from '@angular/core';
import { NotificationsService } from './services/notifications.service';
import { MessageService } from 'primeng/api';
import * as io from 'socket.io-client';
import { ChatAdapter } from 'ng-chat';
import { SocketIoAdapter } from './chat/socketio-adapter';
import { UsersService } from './services/users.service';
import { HttpClient } from '@angular/common/http';




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
  public adapter: ChatAdapter = new SocketIoAdapter(this.http);
  filteredParticipants;


  constructor(private notificationService: NotificationsService) {
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
    this.notificationService.getSpinerChange.subscribe(loading => {
      this.loading = loading;
    })

    const socket = io('http://localhost:3000');
    this.adapter.listFriends().subscribe(res => this.filteredParticipants = res);
    socket.on('connect', () => {
      socket.on('chat', (data) => {
      })
    })

  }



  addClass(id) {
    this.id = id;
  }


}
