import { Component, OnInit, DoCheck } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { NotificationsService } from './core/services/notifications.service';
import { FriendReqService } from './core/services/friend-req.service';
import { PingService } from './core/services/ping.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {


  id: number;
  loading;
  userId = localStorage.getItem('logged-user-id');
  filteredParticipants;
  isLoggedIn;

  username = localStorage.getItem('logged-user-name');


  constructor(private socket: Socket, private notificationService: NotificationsService,
    private frReqService: FriendReqService,
    private pingService: PingService
  ) {

    this.pingService.pingChatServer();

  }

  ngOnInit() {

    if (this.socket) {
      console.log('Socket connected to Angular');


    }

  }

  ngDoCheck(): void {
    this.isLoggedIn = localStorage.getItem('logged-user-id');
    this.userId = localStorage.getItem('logged-user-id');
    this.loading = this.notificationService.loading;

  }

}
