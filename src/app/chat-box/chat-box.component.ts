import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit  {
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



  sendMsg():void{

    

    this.messages.push({
        message:this.inputText,
        time:new Date(),
        status:'unseen',
        sender:'ibrahim',
        senderType:"user"

      })
      console.log(this.messages);
      this.inputText = '';

      setTimeout(() => {
        let a:any = document.getElementsByClassName('sendermsgInfo')
        a[a.length -1].scrollIntoView({block:'center',behavior:'smooth'})
      }, 1);

  }

  clearInput(){
    console.log(this.inputText)
  }

  some(){
 
  }
  
  
}
