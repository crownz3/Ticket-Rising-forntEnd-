import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddTicketDialogComponent } from '../add-ticket-dialog/add-ticket-dialog.component';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { GoogleSigninService } from '../google-signin.service';
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
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  displayedColumns: any[] = ["Sno", "TicketNo",  "TicketTitle","TicketStatus","SolvedDate","Operations"];
  screenSize :boolean | undefined
  result:any
  userName :string | undefined
  dataSource = new MatTableDataSource(data);

  @ViewChild(MatPaginator) paginator: any;
  // @ViewChild('fileInput',{static:false}) fileInput :ElementRef | undefined

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public service:UserService,public dialog: MatDialog,public bottomsheet : MatBottomSheet,private googleApi:GoogleSigninService,private http :HttpClient) {
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

    this.userName = this.service.getData('name')
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


  // onFileUpload(){
  //   const imageBlob = this.fileInput?.nativeElement.files[0]
  //   const file = new FormData()

  //   file.set('file',imageBlob)

  //   this.http.post('http://localhost:3000/',file).subscribe((response)=>{
  //     console.log(response)
  //   })
  // }

}
