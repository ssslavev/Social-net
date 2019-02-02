import { Component, OnInit } from '@angular/core';
import { NotificationsService } from './services/notifications.service';
import { MessageService } from 'primeng/api';


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


  constructor(private notificationService: NotificationsService,
    private messageService: MessageService) {
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
   
  }

 

  addClass(id) {
    this.id = id;
  }

 
}
