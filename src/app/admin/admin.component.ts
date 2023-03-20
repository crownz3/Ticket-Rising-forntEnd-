import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { GoogleSigninService } from '../google-signin.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { TicketInfoDialogComponent } from '../ticket-info-dialog/ticket-info-dialog.component';
import { localStorage } from '../services/localStorage.service';

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
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger('showProf', [
      state('hidden', style({
        opacity: 0,
        width:"0px",
        transform: 'translateX(-500px)',
        height:"0px",
      })),
      state('shown', style({
        opacity: 1,
        transform: 'translateX(0px)',
      })),
      transition('hidden => shown', animate('300ms ease-in-out')),
      transition('shown => hidden', animate('300ms ease-in-out'))
    ]),
    trigger('showTable', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(-500px)',
        width:"0px",
        height:"5px",
      })),
      state('shown', style({
        opacity: 1,
        transform: 'translateY(0)',
        width:'100%'

      })),
      transition('hidden => shown', animate('500ms ease-in-out')),
      transition('shown => hidden', animate('500ms ease-in-out'))
    ])
  ]
})

export class AdminComponent implements OnInit {
  displayedColumns: any[] = ["Sno", "TicketNo", "Raiser", "TicketTitle","RaisedDate","TicketStatus","Operations"];
  screenSize :boolean | undefined
  show = 'hidden'
  shows = 'shown'
  showTicketStatusBtn =false
  ticketResponse = ""
  result:any
  showUserProfile = false
  userName :string | undefined
  loginUserName= ''
  userDetails :any ={}
  dataSource = new MatTableDataSource(data);

  @ViewChild(MatPaginator) paginator: any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public bottomsheet : MatBottomSheet,private googleApi:GoogleSigninService,public dialog: MatDialog,public local :localStorage) { }

  ngOnInit(): void {
    this.userDetails = {name:this.local.getLocal('userName'),mobile:this.local.getLocal('mobile'),email:this.local.getLocal('mailId'),dept:this.local.getLocal('dept'),desg:this.local.getLocal('desg'),address:this.local.getLocal('address'),image:this.local.getLocal('picture'),}

  }

  profile(){
    this.showUserProfile === false ? this.showUserProfile = true : this.showUserProfile = false
    this.show === 'hidden'?this.show = "shown" : this.show = "hidden",
    this.shows === 'shown'?this.shows = "hidden" :this.shows = "shown"
  }

  acceptTicket(){
    this.showTicketStatusBtn === false ? this.showTicketStatusBtn =true:this.showTicketStatusBtn=false
    this.ticketResponse = 'accept'
  }

  rejectTicket(){
    this.showTicketStatusBtn === false ? this.showTicketStatusBtn =true:this.showTicketStatusBtn=false
    this.ticketResponse = 'reject'
  }

  openChat(){
    const MatBottomSheetRef = this.bottomsheet.open(ChatBoxComponent)
  }


  openDialog(){
    const dialogRef = this.dialog.open(TicketInfoDialogComponent, {
      data: { name: 'John Doe' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  
  logOut() {
    this.googleApi.signOut();
    
  }
}
