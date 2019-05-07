import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NotificationsService } from '../services/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class ResponseHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastr: ToastrService,
    private notificationService: NotificationsService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap((success) => {
      if (success instanceof HttpResponse) {
        if (success.url.endsWith('login')) {
          let userName = success.body.user.name;
          let message = success.body.message;
          this.toastr.success(`Hello, ${userName}! ${message}`);
        } else if (success.url.endsWith('register')) {
          this.toastr.success(success.body.message + '! Pease login!');
        }
      }
      //console.log('SUCCESS', success);

    }), catchError((err) => {
      if (err.error.message === "Username already exists!") {
        this.toastr.error(err.error.message, 'Error', { timeOut: 5000 });
      } else {

        this.toastr.error(err.error, "Error", { timeOut: 5000, });
        this.notificationService.changeLoading(false);

        //console.log("ERROR", err.error);
      }
      throw err;
    }))
  };
}
