import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  connectedUsers = new Subject();
  userConnected = new Subject();
  userDisconnected = new Subject();
  messages = new Subject();
  socket: SocketIOClient.Socket;;
  constructor() { }

  init() {
    this.socket = io.connect(`http://localhost:8011?token=${localStorage.getItem('token')}`);
    this.getUsers();
    this.getMessages();
  }

  sendMessage(msg: string) {
    this.socket.emit("message", msg);
  }

  getUsers() {
    this.socket.on('connectedUsers', (users: any) => {
      this.connectedUsers.next(users);
    });
    this.socket.on('userConnected', (user) => {
      this.userConnected.next(user.user);
    });
    this.socket.on('userDisconnected', (user) => {
      this.userDisconnected.next(user.user);
    });
  }

  getMessages() {
    this.socket.on('message', (msg: any) => {
      this.messages.next(msg);
    });
  }

  close(){
    this.socket.close();
  }

}
