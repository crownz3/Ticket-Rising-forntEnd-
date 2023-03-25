import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { GoogleSigninService } from '../google-signin.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TicketInfoDialogComponent } from '../ticket-info-dialog/ticket-info-dialog.component';
import { localStorage } from '../services/localStorage.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
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
export class AdminComponent implements OnInit {
  displayedColumns: any[] = [
    'Sno',
    'TicketNo',
    'Raiser',
    'TicketTitle',
    'RaisedDate',
    'TicketStatus',
    'Operations',
  ];
  baseUrl = environment.serverBaseUrl;
  isVisible: boolean | undefined;
  screenSize: boolean | undefined;
  show = 'hidden';
  shows = 'shown';
  showTicketStatusBtn = false;
  ticketResponse = '';
  result: any;
  showUserProfile = true;
  userName: string | undefined;
  loginUserName = '';
  userDetails: any = {};
  data: any = [];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    public bottomsheet: MatBottomSheet,
    private googleApi: GoogleSigninService,
    public dialog: MatDialog,
    public local: localStorage,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
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
        this.data = res;
        this.dataSource = new MatTableDataSource(this.data);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        });
      });
  }

  profile() {
    this.showUserProfile === false
      ? (this.showUserProfile = true)
      : (this.showUserProfile = false);
    this.show === 'hidden' ? (this.show = 'shown') : (this.show = 'hidden');
    this.shows === 'shown' ? (this.shows = 'hidden') : (this.shows = 'shown');
  }

  acceptTicket(i: number) {
    this.showTicketStatusBtn === false
      ? (this.showTicketStatusBtn = true)
      : (this.showTicketStatusBtn = false);
    this.ticketResponse = 'accept';
    this.data[i].ticketStatus = '1';
    console.log(this.data[i]);
    this.http
      .post(this.baseUrl + 'statusUpdate', this.data[i])
      .subscribe((res: any) => {
        this.data = res;
        this.dataSource = new MatTableDataSource(this.data);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 1000);
      });
  }

  rejectTicket(i: number) {
    this.showTicketStatusBtn === false
      ? (this.showTicketStatusBtn = true)
      : (this.showTicketStatusBtn = false);
    this.ticketResponse = 'reject';
    this.data[i].ticketStatus = '-1';
  }

  openChat() {
    const MatBottomSheetRef = this.bottomsheet.open(ChatBoxComponent);
  }

  openDialog(i:number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '400px';
    dialogConfig.height = '300px';

    const dialogRef = this.dialog.open(TicketInfoDialogComponent, {
      data: { id : i },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  logOut() {
    this.googleApi.signOut();
  }
}
