import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendReqService {

  mainApiURL = 'https://blooming-reef-24719.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  sendFriendRequest(loggedUserId: number, id: number, loggedUserName: string) {

    return this.http.post(this.mainApiURL + '/users/friends/request', { loggedUserId, id, loggedUserName });

  }

  getFromReq(loggedUserId: number, id: number) {

    return this.http.post(this.mainApiURL + '/users/friends/fromreq', { loggedUserId, id });
  }

  getToReq(loggedUserId: number, id: number) {

    return this.http.post(this.mainApiURL + '/users/friends/toreq', { loggedUserId, id });
  }

  acceptReq(loggedUserId: number, id: number) {

    return this.http.post(this.mainApiURL + '/users/friends/acceptreq', { loggedUserId, id });
  }

  getFriends(loggedUserId: number, id: number) {

    return this.http.post(this.mainApiURL + '/users/friends', { loggedUserId, id });
  }

  getAllRequests(userId) {
    return this.http.get(this.mainApiURL + `/users/${userId}/friends/all-requests`);
  }

  deleteRequest(loggedUserId, id) {
    return this.http.post(this.mainApiURL + '/users/friends/requests', { loggedUserId, id });
  }

  getFriendsList() {
    return this.http.post<any[]>(this.mainApiURL + '/users/friendsList', { 'loggedUserId': localStorage.getItem('logged-user-id') });
  }

}
