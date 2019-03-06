import { ChatAdapter, User, Message, ParticipantResponse, IChatParticipant, ChatParticipantType, ParticipantMetadata, ChatParticipantStatus } from 'ng-chat';
import { Observable, of } from "rxjs";
import { map, delay} from 'rxjs/operators';
import { Socket } from 'ng-socket-io';
import { Injectable } from '@angular/core';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';

@Injectable()
export class SocketIoAdapter extends ChatAdapter {

    constructor(http: HttpClient) {
        super();

    }

    private socket: Socket;
    users;
    httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
  
    

    get() {
        let friendsList: IChatParticipant[] = new Array();
        let person: IChatParticipant;
        return this.httpClient.get<any[]>('http://my-social-net/api/users')

            .pipe(map(users => {
                for (const user of users) {
                    person = {
                        status: ChatParticipantStatus.Online,
                        avatar: 'https://thumbnail.myheritageimages.com/502/323/78502323/000/000114_884889c3n33qfe004v5024_C_64x64C.jpg',
                        displayName: user.name,
                        id: Math.floor(Math.random() * 11),
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
        metadata.totalUnreadMessages = Math.floor(Math.random() * 11);

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
        let mockedHistory: Array<Message>;

        mockedHistory = [
            {
                fromId: 1,
                toId: 999,
                message: "Hi there, just type any message bellow to test this Angular module.",
                dateSent: new Date()
            }
        ];

        return of(mockedHistory).pipe(delay(2000));

    }

    sendMessage(message: Message): void {
    }


} 