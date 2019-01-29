import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendReqService {

  constructor(private http: HttpClient) { }

  sendFriendRequest(loggedUserId: number, id: number, loggedUserName: string) {

   return  this.http.post('http://my-social-net/api/users/friends/request', {loggedUserId, id, loggedUserName});

  }

  getFromReq(loggedUserId: number, id: number) {

    return this.http.post("http://my-social-net/api/users/friends/fromreq", {loggedUserId, id});
  }

  getToReq(loggedUserId: number, id: number) {

    return this.http.post("http://my-social-net/api/users/friends/toreq", {loggedUserId, id});
  }

  acceptReq(loggedUserId: number, id: number) {

    return this.http.post("http://my-social-net/api/users/friends/acceptreq", {loggedUserId, id});
  }

  getFriends(loggedUserId: number, id: number) {

    return this.http.post("http://my-social-net/api/users/friends", {loggedUserId, id});
  }

}
