import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {


  userId;
  user;

  constructor(private usersService: UsersService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => this.userId = params.id);
    this.usersService.getUserById(this.userId)
      .subscribe(user => this.user = user,
        error => console.error(error)
      );
  }

}
