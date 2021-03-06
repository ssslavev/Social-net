import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private notificationService: NotificationsService) { }



  ngOnInit() {


  }

  registerUser(form: NgForm) {
    console.log(form.value);
    this.notificationService.changeLoading(true);
    const { username, passwords, firstName, lastName, email, gender } = form.value;

    this.authService.register(username, passwords.password, firstName, lastName, email, gender)
      .subscribe(res => {
        this.notificationService.changeLoading(false);
        this.router.navigate(['/login']);
      },
        error => console.log(error));

  }

}
