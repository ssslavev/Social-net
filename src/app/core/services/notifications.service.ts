import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  loading;

  constructor() { }

  changeLoading(loading: boolean) {
    this.loading = loading;
  }

}
