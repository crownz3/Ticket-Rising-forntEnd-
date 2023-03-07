import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { GoogleSigninService } from '../google-signin.service';

const data: any[] | undefined = [
  {TicketNo:121012,Raiser:'Ibrahim',TicketTitle:'Error',TicketStatus:'Pending',RaisedDate:'21-01-2023'},
  {TicketNo:121013,Raiser:'Madhan',TicketTitle:'HomePage',TicketStatus:'Completed',RaisedDate:'20-01-2023'},
  {TicketNo:121014,Raiser:'Rasheed',TicketTitle:'AboutPage',TicketStatus:'Completed',RaisedDate:'10-01-2023'},
  {TicketNo:121015,Raiser:'Saravanan',TicketTitle:'All',TicketStatus:'Completed',RaisedDate:'01-01-2023'},
  {TicketNo:121016,Raiser:'Prem',TicketTitle:'Error',TicketStatus:'Process',RaisedDate:'11-01-2023'},
  {TicketNo:121017,Raiser:'Ibrahim',TicketTitle:'Nothing',TicketStatus:'Pending',RaisedDate:'31-01-2023'},
  
  
  
  
  ]
  
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayedColumns: any[] = ["Sno", "TicketNo", "Raiser", "TicketTitle","TicketStatus","RaisedDate","Operations"];

  dataSource = new MatTableDataSource(data);

  @ViewChild(MatPaginator) paginator: any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public bottomsheet : MatBottomSheet,private googleApi:GoogleSigninService) { }

  ngOnInit(): void {
  }

  

  openChat(){
    const MatBottomSheetRef = this.bottomsheet.open(ChatBoxComponent)
  }

  
  logOut() {
    this.googleApi.signOut();
    
  }
}
