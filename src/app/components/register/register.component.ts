import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error;
  success;


  user = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  constructor(private authService: AuthService,
    private router: Router,
    private notificationService: NotificationsService) { }



  ngOnInit() {
  }

  registerUser() {

    const { username, password, firstName, lastName, email } = this.user;
    this.authService.register(username, password, firstName, lastName, email)
      .subscribe(res => {
        if (res['message'] === "Username already exists!") {
          this.notificationService.emit(res['message']);
        } else {
          this.notificationService.emit(res['message']);
          this.router.navigate(['/login']);
        }
      },
        error => console.log(error));

  }

}
