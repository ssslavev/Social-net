import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { FriendReqService } from 'src/app/services/friend-req.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user;
  userId;
  loggedUserId;
  loggedUserName;
  fromReq;
  toReq;
  areFriends;

  constructor(private usersService: UsersService,
    private route: ActivatedRoute,
    private reqService: FriendReqService) { }

  ngOnInit() {

    //const id = +this.route.snapshot.paramMap.get('id');
    this.loggedUserId = localStorage.getItem('logged-user-id');
    this.loggedUserName = localStorage.getItem('logged-user-name');
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id')
      //console.log(this.userId);
      this.usersService.getUserById(this.userId)
        .subscribe(user => {
          this.user = user,
            this.reqService.getFromReq(this.loggedUserId, this.userId)
              .subscribe(res => {
              this.fromReq = res,
                console.log(res)
              });
              this.reqService.getToReq(this.userId ,this.loggedUserId)
                .subscribe(res => {
                  this.toReq = res,
                  console.log(res);
                });
              this.reqService.getFriends(this.loggedUserId, this.userId)
                .subscribe(res=> {
                  this.areFriends = res,
                  console.log(res);
                })  
        },
          error => console.error(error)
        );
    });


  }

  sendFriendRequest(loggedUseId, id, loggedUserName) {
    console.log('here');
    this.reqService.sendFriendRequest(loggedUseId, id, loggedUserName)
      .subscribe(res => console.log(res),
        error => console.log(error));
  }

  acceptReq(loggedUserId, id) {
    this.reqService.acceptReq(loggedUserId, id)
      .subscribe(res=> console.log(res),
        error=> console.log(error));
  }

}
