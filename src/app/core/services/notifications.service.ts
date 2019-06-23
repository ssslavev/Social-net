import { Injectable } from '@angular/core';


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
