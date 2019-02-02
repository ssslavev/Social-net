import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  emitChange$: Subject<any> = new BehaviorSubject<any>(null);
  username: Subject<any> = new BehaviorSubject<any>(null);
  userId: Subject<any> = new BehaviorSubject<any>(null);
  spiner: Subject<any> = new BehaviorSubject<any>(null);

  constructor() { }

  emit(value: any) {
    this.emitChange$.next(value);
  }

  get emitChange(): BehaviorSubject<any> {
    return (this.emitChange$ as BehaviorSubject<any>);
  }

  emitUserName(value:any) {
    this.username.next(value);
  }

  emitSpiner(value: any) {
    this.spiner.next(value);
  }

 get getSpinerChange(): BehaviorSubject<any> {
   return (this.spiner as BehaviorSubject<any>);
 } 

  get emitUserNameChange() :BehaviorSubject<any> {
    return (this.username as BehaviorSubject<any>);
  }

  emitUserId(value:any) {
    this.userId.next(value);
  }

  get emitUserIdChange() :BehaviorSubject<any> {
    return (this.userId as BehaviorSubject<any>);
  }
}
