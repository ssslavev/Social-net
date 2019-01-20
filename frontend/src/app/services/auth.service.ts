import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private user: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get loggedUser() {
    return this.user.asObservable();
  }

  constructor(private http: HttpClient,
    private router: Router) { }

  register(name: string, password: string, firstName: string, lastName: string, email: string) {

    this.http.post('http://my-social-net/api/users/register', { name, password, firstName, lastName, email })
      .subscribe(res => console.log(res),
        error => console.log(error));
  }

  login(name: string, password: string) {

    return this.http.post('http://my-social-net/api/users/login', { name, password })
      .subscribe(user => {
        localStorage.setItem('token', user['token']);
        localStorage.setItem('logged-user-id', user['user']['user_id']);
        localStorage.setItem('logged-user-name', user['user']['name']);
        this.router.navigate(['/home']);
        location.reload(true);
        this.loggedIn.next(true);
        this.user.next(localStorage.getItem('logged-user-name'));
      },
        error => console.error(error));

  }
}
