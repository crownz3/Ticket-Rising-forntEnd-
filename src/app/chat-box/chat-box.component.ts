import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  inputText: string = '';
  messages = [
    {
      message:'adsada',
      time:new Date(),
      status:'seen',
      sender:'ibrahim',
      senderType:"user"

    },
    {
      message:'sadas',
      time:new Date(),
      sender:'ibrahim',
      senderType:"admin"
    }
  ]


  constructor() { }

  ngOnInit(): void {
    
  }

  sendMsg(){
    
    this.messages.push({
        message:this.inputText,
        time:new Date(),
        status:'unseen',
        sender:'ibrahim',
        senderType:"user"

      })
      console.log(this.messages);
      this.inputText = '';


  }

  clearInput(){
    console.log(this.inputText)
  }

  
}
