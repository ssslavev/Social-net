import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private router: Router,
    private notificationService: NotificationsService) { }

  register(name: string, password: string, firstName: string, lastName: string, email: string, gender: string) {
    this.notificationService.changeLoading(true);
    return this.http.post('https://blooming-reef-24719.herokuapp.com/api/users/register', { name, password, firstName, lastName, email, gender })
  }

  login(name: string, password: string) {

    this.notificationService.changeLoading(true);
    return this.http.post('https://blooming-reef-24719.herokuapp.com/api/users/login', { name, password })
      .subscribe(user => {
        localStorage.setItem('token', user['token']);
        localStorage.setItem('logged-user-id', user['user']['user_id']);
        localStorage.setItem('logged-user-name', user['user']['name']);
        localStorage.setItem("loggedin", "true");
        this.router.navigate(['/home']);
        this.notificationService.changeLoading(false);
      },
        error => this.handleError,
        () => this.notificationService.changeLoading(false));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client side error: ', errorResponse.error.message);
    } else {
      console.error('Server side error: ', errorResponse);
    }

    return throwError('There is a problem with a service');
  }

  getToken() {
    let token = localStorage.getItem('token');
    return token;
  }
}
