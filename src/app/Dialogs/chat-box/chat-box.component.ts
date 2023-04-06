import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ChatService } from 'src/app/services/chat-service.service';
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit {
  public message = '';
  public messages: any = [];
  ticketNo : any
  constructor(public chat: ChatService, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,) {
    this.ticketNo = this.data.ticketNo
    this.chat.receiveMessage((message: string) => {
      this.messages.push({
        msg: message,
        time: new Date(),
        status: 'unseen',
        sender: 'ibrahim',
        senderType: 'user',
      });
    });
  }

  ngOnInit(): void {}


  public sendMessage(): void {
    this.chat.sendMessage(this.message,this.ticketNo);
    this.message = '';
    setTimeout(() => {
      let a: any = document.getElementsByClassName('sendermsgInfo');
      a[a.length - 1].scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, 1);
  }



  clearInput() {}

  some() {}
}
