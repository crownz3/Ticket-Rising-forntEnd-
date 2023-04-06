import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Inject } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: any;

  constructor() {
    this.socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });
  }

  public sendMessage(message: string,ticketNo:any) {
    this.socket.emit('obj', {message:message,tktNo:ticketNo});
  }

  public receiveMessage(callback: any) {
    console.log(callback)
    this.socket.on('message', (message: string) => {
      callback(message);
    });
  }
}
