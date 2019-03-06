import { ChatAdapter, User, Message, ParticipantResponse, IChatParticipant, ChatParticipantType, ParticipantMetadata, ChatParticipantStatus } from 'ng-chat';
import { Observable, of, observable } from "rxjs";
import { map, catchError, flatMap } from 'rxjs/operators';
import { Socket } from 'ng-socket-io';
import { UsersService } from '../services/users.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { get } from 'https';
var Rx = require('rxjs');




@Injectable()
export class SocketIoAdapter extends ChatAdapter {

    constructor(http: HttpClient) {
        super()

    }

    private socket: Socket;
    res;
    users;
    http;
    httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
    subject = new Rx.AsyncSubject();
    response: IChatParticipant[] = [{
        participantType: ChatParticipantType.User,
        avatar: 'http://68.media.tumblr.com/avatar_ba75cbb26da7_128.png',
        displayName: 'stefan',
        id: 1,
        status: ChatParticipantStatus.Online
    }]

    /* getFriendslist() {
        this.httpClient.get<any[]>('http://my-social-net/api/users')
            (users => {
                for (const u of users) {
                    let user: IChatParticipant = {
                        displayName: u.name,
                        avatar: "https://thumbnail.myheritageimages.com/502/323/78502323/000/000114_884889c3n33qfe004v5024_C_64x64C.jpg",
                        id: 1,
                        participantType: ChatParticipantType.User,
                        status: ChatParticipantStatus.Online
                    }
                    this.friendslist.push(user);
                }
                console.log(this.friendslist)
            });
    }  */


    /* get() {
        let friendsList
        return this.httpClient.get<any[]>('http://my-social-net/api/users')
            .pipe(map(users => {
                for (let u of users) {
                    let user: IChatParticipant = {
                        displayName: u.name,
                        avatar: "https://thumbnail.myheritageimages.com/502/323/78502323/000/000114_884889c3n33qfe004v5024_C_64x64C.jpg",
                        id: 1,
                        participantType: ChatParticipantType.User,
                        status: ChatParticipantStatus.Online
                    }
                    friendsList = [];
                    friendsList.push(user);
                }
                console.log(friendsList)
                return friendsList;
            }))
    } */

    get() {
        let friendsList: IChatParticipant[] = new Array();
        let person: IChatParticipant;
        return this.httpClient.get<any[]>('http://my-social-net/api/users')

            .pipe(map(users => {
                for (const user of users) {
                    person = {
                        status: ChatParticipantStatus.Away,
                        avatar: 'https://thumbnail.myheritageimages.com/502/323/78502323/000/000114_884889c3n33qfe004v5024_C_64x64C.jpg',
                        displayName: user.name,
                        id: 1,
                        participantType: ChatParticipantType.User
                    };
                    friendsList.push(person);
                }
                return friendsList
            }))
    }


    getFriends() {
        let participantResponseArray: ParticipantResponse[] = new Array();
        let participantResponse: ParticipantResponse;
        let metadata = new ParticipantMetadata();
        metadata.totalUnreadMessages = 1;

        return this.get().pipe(map(users => {

            for (const participant of users) {
                participantResponse = {
                    participant: participant,
                    metadata: metadata

                }

                participantResponseArray.push(participantResponse);

            }
            return participantResponseArray;
        }))
    }


    listFriends(): Observable<ParticipantResponse[]> {
        return this.getFriends();

    }




    getMessageHistory(userId: any): Observable<Message[]> {
        return of([]);

    }

    sendMessage(message: Message): void {
    }


} 