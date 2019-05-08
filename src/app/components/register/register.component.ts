import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../core/services/auth.service'
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error;
  success;
  form;


  constructor(private authService: AuthService,
    private router: Router,
    private notificationService: NotificationsService) { }



  ngOnInit() {


  }

  registerUser(form: NgForm) {

    this.notificationService.changeLoading(true);
    const { username, password, firstName, lastName, email, gender } = form.value;
    this.authService.register(username, password, firstName, lastName, email, gender)
      .subscribe(res => {
        this.notificationService.changeLoading(false);
        this.router.navigate(['/login']);
      },
        error => console.log(error));

  }

}
