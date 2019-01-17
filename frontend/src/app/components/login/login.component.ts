import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    username: '',
    password: ''
  }

  loggedUser = {};

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    const { username, password } = this.user;
    this.authService.login(username, password)
      .subscribe(user => {
        localStorage.setItem('token', user['token']);
        localStorage.setItem('logged-user-id', user['user']['user_id']);
        localStorage.setItem('logged-user-name', user['user']['name']);
      },
        error => console.error(error));
    this.router.navigate(['/home']);
  }

}
