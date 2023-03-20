import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: any;

  constructor() {
    this.socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });
  }

  public sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  public receiveMessage(callback: any) {
    this.socket.on('message', (message: string) => {
      callback(message);
    });
  }
}
