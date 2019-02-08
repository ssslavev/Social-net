import { Component, OnInit, OnChanges, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { NotificationsService } from 'src/app/services/notifications.service';
import { FriendReqService } from 'src/app/services/friend-req.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  isLoggedIn$;
  user$;
  subscription;
  subscription2;
  requests;

  constructor(private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private notificationService: NotificationsService,
    private reqService: FriendReqService) {

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

    this.reqService.getAllRequests(this.isLoggedIn$)
        .subscribe(requests=> this.requests = requests);
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/']);
    location.reload();


  }


  ngOnDestroy() {
    this.subscription.dispose();
    this.subscription2.dispose();
  }

  acceptReq(isLoggedIn$, id) {
    this.reqService.acceptReq(isLoggedIn$, id)
      .subscribe(res => console.log(res),
        error => console.log(error));
  }


}
