import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  constructor(private authService: AuthService,
    private router: Router) { }



  ngOnInit() {
  }

  registerUser() {

    const { username, password, firstName, lastName, email } = this.user;
    this.authService.register(username, password, firstName, lastName, email);
    this.router.navigate(['/']);
  }

}
