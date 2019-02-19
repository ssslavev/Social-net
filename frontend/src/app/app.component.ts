import { Component, OnInit } from '@angular/core';
import { NotificationsService } from './services/notifications.service';
import { MessageService } from 'primeng/api';
import * as socketIO from 'socket.io-client';



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
        console.log(loading);
      })

     const socket = socketIO('http://my-social-net');
     console.log(socket);
      socket.on('connection', (data)=>console.log(data));
  }

 

  addClass(id) {
    this.id = id;
  }

 
}
