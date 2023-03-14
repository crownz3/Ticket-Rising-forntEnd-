import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddTicketDialogComponent } from '../add-ticket-dialog/add-ticket-dialog.component';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { GoogleSigninService } from '../google-signin.service';
import { localStorage } from '../services/localStorage.service';
import { UserService } from '../services/user.service';

const data: any[] | undefined = [
  {TicketNo:121012,TicketTitle:'Error',TicketStatus:'Pending',SolvedDate:'21-01-2023'},
  {TicketNo:121013,TicketTitle:'HomePage',TicketStatus:'Completed',SolvedDate:'20-01-2023'},
  {TicketNo:121014,TicketTitle:'AboutPage',TicketStatus:'Completed',SolvedDate:'10-01-2023'},
  {TicketNo:121015,TicketTitle:'All',TicketStatus:'Completed',SolvedDate:'01-01-2023'},
  {TicketNo:121016,TicketTitle:'Error',TicketStatus:'Process',SolvedDate:'11-01-2023'},
  {TicketNo:121017,TicketTitle:'Nothing',TicketStatus:'Pending',SolvedDate:'31-01-2023'},
]


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
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
export class UserComponent implements OnInit {
  displayedColumns: any[] = ["Sno", "TicketNo",  "TicketTitle","TicketStatus","SolvedDate","Operations"];
  screenSize :boolean | undefined
  show = 'hidden'
  shows = 'shown'
  result:any
  showUserProfile = false
  userName :string | undefined
  loginUserName= ''
  userDetails ={name:"Ibrahim",mobile:8903424281,email:"crowwnzz3@gmail.com",dept:"ERP",desg:"Junior Software Developer",address:`117/siddiq nagar/melapalayam/tirunelveli`,image:`../../assets/logo.png`}
  dataSource = new MatTableDataSource(data);

  @ViewChild(MatPaginator) paginator: any;

  files: FileList |any

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public local:localStorage ,public service:UserService,public dialog: MatDialog,public bottomsheet : MatBottomSheet,private googleApi:GoogleSigninService,private http :HttpClient) {
    window.addEventListener('resize',()=>{
    let screen = window.matchMedia('(max-width:600px)');
    this.screenSize = screen.matches;
   })
   }

  ngOnInit(): void {
    window.addEventListener('resize',()=>{
      let screen = window.matchMedia('(max-width:600px)');
      this.screenSize = screen.matches;
     })

     console.log(this.local.getLocal('userName'))
   
   console.log(this.userName)

  }


  profile(){
    this.showUserProfile === false ? this.showUserProfile = true : this.showUserProfile = false
    this.show === 'hidden'?this.show = "shown" : this.show = "hidden",
    this.shows === 'shown'?this.shows = "hidden" :this.shows = "shown"
  }

  hideprofile(){
    setTimeout(() => {
    this.showUserProfile = false

    }, 1000);
  }

  addTicket(){
    const dialogRef = this.dialog.open(AddTicketDialogComponent, {});

    dialogRef.afterOpened().subscribe(res => {
      console.log('The EditForm is opened');
    })

    dialogRef.afterClosed().subscribe(res => {
      let title = res.value.title
      data?.push( {TicketNo:211212,TicketTitle:title,TicketStatus:'Pending',SolvedDate:'13-01-2023',Operations:''})
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }

  openChat(){
    const MatBottomSheetRef = this.bottomsheet.open(ChatBoxComponent)
    console.log("Chat Open")

  }

  logOut() {
    this.googleApi.signOut();
    
  }

}
