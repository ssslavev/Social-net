import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { FriendReqService } from 'src/app/services/friend-req.service';
import { forkJoin } from 'rxjs';
import {MenuItem} from 'primeng/api'

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
  items: MenuItem[];
  requests;

  constructor(private usersService: UsersService,
    private route: ActivatedRoute,
    private reqService: FriendReqService) { }

  ngOnInit() {

    this.items = [
      {label: 'Main', icon: '../../../assets/sharp_person_pin_white_18dp.png', routerLink: 'main'},
      {label: 'Information', icon: '../../../assets/images/sharp_info_white_18dp.png', routerLink: 'information'},
      {label: 'Friends', icon: '../../../assets/images/sharp_people_white_18dp.png', routerLink: 'friends'},
      {label: 'Pictures', icon: '../../../assets/images/sharp_image_white_18dp.png', routerLink: 'pictures'},
      
  ];

    this.loggedUserId = localStorage.getItem('logged-user-id');
    this.loggedUserName = localStorage.getItem('logged-user-name');
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id')

      

      this.usersService.getUserById(this.userId)
        .subscribe(user => {
          this.user = user,

            forkJoin(
              this.reqService.getFromReq(this.loggedUserId, this.userId),
              this.reqService.getToReq(this.userId, this.loggedUserId),
              this.reqService.getFriends(this.loggedUserId, this.userId)
            )
              .subscribe(([fromReq, toReq, friends]) => {
                this.fromReq = fromReq,
                  this.toReq = toReq,
                  this.areFriends = friends
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
      .subscribe(res => console.log(res),
        error => console.log(error));
  }



}
