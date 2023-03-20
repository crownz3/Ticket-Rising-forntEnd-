import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { AddTicketDialogComponent } from '../add-ticket-dialog/add-ticket-dialog.component';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { GoogleSigninService } from '../google-signin.service';
import { localStorage } from '../services/localStorage.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [
    trigger('showProf', [
      state(
        'hidden',
        style({
          opacity: 0,
          width: '0px',
          transform: 'translateX(-500px)',
          height: '0px',
        })
      ),
      state(
        'shown',
        style({
          opacity: 1,
          transform: 'translateX(0px)',
        })
      ),
      transition('hidden => shown', animate('300ms ease-in-out')),
      transition('shown => hidden', animate('300ms ease-in-out')),
    ]),
    trigger('showTable', [
      state(
        'hidden',
        style({
          opacity: 0,
          transform: 'translateY(-500px)',
          width: '0px',
          height: '5px',
        })
      ),
      state(
        'shown',
        style({
          opacity: 1,
          transform: 'translateY(0)',
          width: '100%',
        })
      ),
      transition('hidden => shown', animate('500ms ease-in-out')),
      transition('shown => hidden', animate('500ms ease-in-out')),
    ]),
  ],
})
export class UserComponent implements OnInit {
  baseUrl = environment.serverBaseUrl;

  displayedColumns: any[] = [
    'Sno',
    'TicketNo',
    'TicketTitle',
    'TicketStatus',
    'RaisedDate',
    'SolvedDate',
    'Operations',
  ];
  screenSize: boolean | undefined;
  show = 'hidden';
  shows = 'shown';
  result: any;
  showUserProfile = false;
  userName: string | undefined;
  loginUserName = '';
  userDetails: any = {};
data: any[] | undefined = [];

  dataSource = new MatTableDataSource(this.data);

  @ViewChild(MatPaginator) paginator: any;

  files: FileList | any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    public local: localStorage,
    public service: UserService,
    public dialog: MatDialog,
    public bottomsheet: MatBottomSheet,
    private googleApi: GoogleSigninService,
    private http: HttpClient
  ) {
    window.addEventListener('resize', () => {
      let screen = window.matchMedia('(max-width:600px)');
      this.screenSize = screen.matches;
    });
  }

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      let screen = window.matchMedia('(max-width:600px)');
      this.screenSize = screen.matches;
    });

    this.userDetails = {
      name: this.local.getLocal('userName'),
      mobile: this.local.getLocal('mobile'),
      email: this.local.getLocal('mailId'),
      dept: this.local.getLocal('dept'),
      desg: this.local.getLocal('desg'),
      address: this.local.getLocal('address'),
      image: this.local.getLocal('picture'),
    };

    let mail = this.local.getLocal('mailId');
    console.log(mail);
    this.http
      .get(this.baseUrl + '/getTicket?email=' + mail)
      .subscribe((res: any) => {
        console.log(res)
        for(let i = 0;i<res.length;i++){
          this.data?.push(res[i])
          console.log(this.data)
        }
      });
      console.log(this.data)
  }


  profile() {
    this.showUserProfile === false
      ? (this.showUserProfile = true)
      : (this.showUserProfile = false);
    this.show === 'hidden' ? (this.show = 'shown') : (this.show = 'hidden'),
      this.shows === 'shown' ? (this.shows = 'hidden') : (this.shows = 'shown');
  }

  addTicket() {
    const dialogRef = this.dialog.open(AddTicketDialogComponent, {});

    dialogRef.afterOpened().subscribe((res) => {
      console.log('The EditForm is opened');
    });

    dialogRef.afterClosed().subscribe((res) => {
      let ticketNo = this.local.getLocal('ticketNo');
      let tickettTitle = this.local.getLocal('ticketTitle');
      let tickettStatus = this.local.getLocal('ticketStatus');
      let raisedDate = this.local.getLocal('ticketRaised');
      let solvedDate = this.local.getLocal('ticketSolved');
      if (res) {
        this.data?.push({
          TicketNo: ticketNo,
          TicketTitle: tickettTitle,
          TicketStatus: tickettStatus,
          RaisedDate: raisedDate,
          SolvedDate: solvedDate,
          Operations: '',
        });
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  openChat() {
    const MatBottomSheetRef = this.bottomsheet.open(ChatBoxComponent);
    console.log('Chat Open');
  }

  logOut() {
    this.googleApi.signOut();
  }
}
