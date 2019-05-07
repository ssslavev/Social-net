import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../core/services/auth.service'
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
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
    console.log(form.value);
    const { username, password, firstName, lastName, email, gender } = form.value;
    this.authService.register(username, password, firstName, lastName, email, gender)
      .subscribe(res => {
        this.router.navigate(['/login']);
      },
        error => console.log(error));

  }

}
