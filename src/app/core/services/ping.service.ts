import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';
import { first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PingService {

  source = interval(30 * 60 * 1000);

  constructor(private http: HttpClient) { }

  pingChatServer() {
    this.source.subscribe(() => {
      this.http.get('https://social-net-chat-server.herokuapp.com/')
        .pipe(first())
        .subscribe();
    });
  }

}
