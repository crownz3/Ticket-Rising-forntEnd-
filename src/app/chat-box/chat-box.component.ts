import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChatService } from '../services/chat-service.service';
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit {
  public message= '';
  public messages: any = [];

  constructor(public chat: ChatService) {
    this.chat.receiveMessage((message: string) => {
      this.messages.push({
        msg: message,
        time: new Date(),
        status: 'unseen',
        sender: 'ibrahim',
        senderType: 'user',
      })
    });
  }

  ngOnInit(): void {}

  sendMsg(): void {
    console.log(this.messages);
    setTimeout(() => {
      let a: any = document.getElementsByClassName('sendermsgInfo');
      a[a.length - 1].scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, 1);
  }

  public sendMessage(): void {

    this.chat.sendMessage(this.message);
    this.message = '';

  }

  clearInput() {
    
  }

  some() {
    
  }
}
