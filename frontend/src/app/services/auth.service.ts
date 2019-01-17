import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient) { }

  register(name: string, password: string, firstName: string, lastName: string, email: string) {

    this.http.post('http://my-social-net/api/users/register', { name, password, firstName, lastName, email })
      .subscribe(res => console.log(res),
        error => console.log(error));
  }

  login(name: string, password: string) {

  let user =  this.http.post('http://my-social-net/api/users/login', { name, password })
  this.loggedIn.next(true);
  return user;
  }


}
