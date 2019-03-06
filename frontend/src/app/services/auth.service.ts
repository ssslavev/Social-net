import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { retry, catchError } from 'rxjs/operators';
import { NotificationsService } from './notifications.service';
import { MessageService } from 'primeng/api';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isloggin: boolean;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private user: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get loggedUser() {
    return this.user.asObservable();
  }

  constructor(private http: HttpClient,
    private router: Router,
    private notificationService: NotificationsService,
    private messageService: MessageService) { }

  register(name: string, password: string, firstName: string, lastName: string, email: string) {

    return this.http.post('https://blooming-reef-24719.herokuapp.com/api/users/register', { name, password, firstName, lastName, email })
      .pipe(catchError(this.handleError));
    //.subscribe(res => console.log(res),
    // error => console.log(error));
  }

  login(name: string, password: string) {
    this.notificationService.emitSpiner(true);
    return this.http.post('https://blooming-reef-24719.herokuapp.com/api/users/login', { name, password })
      .subscribe(user => {
        localStorage.setItem('token', user['token']);
        localStorage.setItem('logged-user-id', user['user']['user_id']);
        localStorage.setItem('logged-user-name', user['user']['name']);
        localStorage.setItem("loggedin", "true");
        this.router.navigate(['/home']).then(() => {
          //location.reload(true);
          //this.messageService.add({summary: "You are logged in!"}); 

        });

        this.notificationService.emit("You are logged in!");
        //this.loggedIn.next(true);
        //this.user.next(localStorage.getItem('logged-user-name'));
        this.notificationService.emitUserName(localStorage.getItem('logged-user-name'));
        this.notificationService.emitUserId(localStorage.getItem('logged-user-id'));
        this.messageService.add({ severity: 'success', summary: "You are logged in!" });
      },
        error => this.handleError,
        () => this.notificationService.emitSpiner(false));

  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client side error: ', errorResponse.error.message);
    } else {
      console.error('Server side error: ', errorResponse);
    }

    return throwError('There is a problem with a service');
  }
}
