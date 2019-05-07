import { Component, OnInit, OnChanges, Input, OnDestroy, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { FriendReqService } from 'src/app/core/services/friend-req.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, DoCheck {

  isLoggedIn;
  user;
  requests;


  constructor(private router: Router,
    private messageService: MessageService,
    private reqService: FriendReqService) {

  }

  ngOnInit() {

  }

  ngDoCheck(): void {
    this.isLoggedIn = localStorage.getItem('logged-user-id');
    this.user = localStorage.getItem('logged-user-name');
  }



  getRequests() {
    this.reqService.getAllRequests(this.isLoggedIn)
      .subscribe(requests => {
        this.requests = requests,
          console.log(requests)
      });
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login'])
    //location.reload();
  }

  acceptReq(isLoggedIn$, id) {
    this.reqService.acceptReq(isLoggedIn$, id)
      .subscribe(res => {
        console.log(res)
        this.messageService.add({ severity: 'success', summary: "You are now friends!" })

      },
        error => console.log(error));
  }

  onSelect(request) {
    let index = this.requests
      .findIndex(localRequest => localRequest.friend_req_id == request.friend_req_id)
    this.requests.splice(index, 1);
    this.deleteReq(this.isLoggedIn, request.from_user);
  }

  deleteReq(isLoggedIn$, id) {
    this.reqService.deleteRequest(isLoggedIn$, id)
      .subscribe(result => console.log(result),
        error => console.log(error)
      )
  }

}
