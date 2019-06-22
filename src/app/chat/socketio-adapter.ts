import { ChatAdapter, User, Message, ParticipantResponse, IChatParticipant, ChatParticipantType, ParticipantMetadata, ChatParticipantStatus } from 'ng-chat';
import { Observable, of } from "rxjs";
import { map, delay } from 'rxjs/operators';
import { Socket } from 'ng-socket-io';
import { Injectable, DoCheck } from '@angular/core';
import { FriendReqService } from '../core/services/friend-req.service';



@Injectable()
export class SocketIoAdapter extends ChatAdapter {

    userId;
    users;
    participantsList;


    constructor(private friendsReqService: FriendReqService, private socket: Socket) {
        super();
        console.log('initialize adapter');
        this.initializeSocketListeners();
        this.getFriends().subscribe((users) => {
            this.participantsList = users;
            console.log(users);

        });


    }


    get() {

        let friendsList: IChatParticipant[] = new Array();
        let person: IChatParticipant;
        return this.friendsReqService.getFriendsList()
            .pipe(map(users => {
                for (const user of users) {
                    person = {
                        status: ChatParticipantStatus.Online,
                        avatar: 'https://thumbnail.myheritageimages.com/502/323/78502323/000/000114_884889c3n33qfe004v5024_C_64x64C.jpg',
                        displayName: user.name,
                        id: +user.user_id,
                        participantType: ChatParticipantType.User
                    };

                    friendsList.push(person);
                }
                return friendsList;
            }));
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
            if (participantResponseArray.length > 0) {

            }

            return participantResponseArray;
        }));
    }


    listFriends(): Observable<any> {
        return this.getFriends();

    }




    getMessageHistory(userId: any): Observable<Message[]> {
        /* let mockedHistory: Array<Message>;

        mockedHistory = [
            {
                fromId: 1,
                toId: 999,
                message: "Hi there, just type any message bellow to test this Angular module.",
                dateSent: new Date()
            },

        ];

        return of(mockedHistory).pipe(delay(2000)); */

        return null;

    }

    sendMessage(message: Message): void {
        this.socket.emit('sendMessage', message);

    }



    public initializeSocketListeners() {
        console.log(this.participantsList);
        this.socket.on('messageReceived', (message) => {
            let participant;
            participant = this.participantsList.find(x => x.participant.id == message.fromId).participant;
            console.log(participant);

            this.onMessageReceived(participant, message);

        });

    }


}
