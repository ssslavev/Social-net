import { Component, OnInit, DoCheck } from '@angular/core';

import { MessageService } from 'primeng/api';
import * as io from 'socket.io-client';
import { ChatAdapter } from 'ng-chat';
import { SocketIoAdapter } from './chat/socketio-adapter';

import { NotificationsService } from './core/services/notifications.service';
import { FriendReqService } from './core/services/friend-req.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {

  id: number;
  loading;
  userId;
  filteredParticipants;
  isLoggedIn;
  adapter: ChatAdapter;

  constructor(private notificationService: NotificationsService,
    private frReqService: FriendReqService) {
    this.adapter = new SocketIoAdapter(this.frReqService);
  }

  ngOnInit() {

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

  ngDoCheck(): void {
    this.isLoggedIn = localStorage.getItem('logged-user-id');
    this.userId = +localStorage.getItem('logged-user-id');
  }

}
