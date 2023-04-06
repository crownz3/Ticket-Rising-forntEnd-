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
import { ConfirmationComponent } from '../confirmation/confirmation.component';

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
  show = 'hidden';
  shows = 'shown';
  showTicketStatusBtn = false;
  showUserProfile = true;
  userDetails: any = {};
  data: any = [];
  mail: any;
  showSpinner = true;
  err = false;
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

    this.mail = this.local.getLocal('mailId');
    this.http.get(this.baseUrl + '/getTicket?email=' + this.mail).subscribe(
      (res: any) => {
        if (res) {
          this.data = res;
          this.dataSource = new MatTableDataSource(this.data);
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
          });
          this.err = false;
          this.showSpinner = false;
        } else {
          this.showSpinner = false;
          this.err = true;
        }
      },
      (err) => {
        this.showSpinner = false;
        this.err = true;
      }
    );
  }

  onHoverComp(i: any): void {
    const element = (document.getElementById(i.ticketNo)!.innerText =
      'Complete');
    document.getElementById(i.ticketNo)!.style.backgroundColor = '#333ba5';
    document.getElementById(i.ticketNo)!.style.color = '#e4e6ff';
    document.getElementById(i.ticketNo)!.style.paddingLeft = '22px';
    document.getElementById(i.ticketNo)!.style.paddingRight = '22px';
  }

  onLeaveComp(i: any): void {
    document.getElementById(i.ticketNo)!.innerText = 'Processing';
    document.getElementById(i.ticketNo)!.style.backgroundColor = '';
    document.getElementById(i.ticketNo)!.style.color = '#707070';
    document.getElementById(i.ticketNo)!.style.paddingLeft = '14px';
    document.getElementById(i.ticketNo)!.style.paddingRight = '14px';
  }

  onHoverRej(i: any): void {
    document.getElementById(i.ticketNo)!.style.backgroundColor = 'darkred';
  }

  onLeaveRej(i: any): void {
    document.getElementById(i.ticketNo)!.style.backgroundColor = '#333ba5';
  }

  hover() {
    let btnsDiv = document.getElementById('colorChange');
    btnsDiv?.setAttribute('style', 'background-color:#515dff;');
  }

  leave() {
    let btnsDiv = document.getElementById('colorChange');
    btnsDiv?.setAttribute('style', 'background-color:#333ba5;');
  }

  profile() {
    this.showUserProfile === false
      ? (this.showUserProfile = true)
      : (this.showUserProfile = false);
    this.show === 'hidden' ? (this.show = 'shown') : (this.show = 'hidden');
    this.shows === 'shown' ? (this.shows = 'hidden') : (this.shows = 'shown');
  }

  acceptTicket(i: any) {
    const MatBottomSheetRef = this.bottomsheet.open(ConfirmationComponent, {
      data: 'accept',
    });
    MatBottomSheetRef.afterDismissed().subscribe((res: any) => {
      if (res === 'confirm') {
        this.showTicketStatusBtn === false
          ? (this.showTicketStatusBtn = true)
          : (this.showTicketStatusBtn = false);

        i.ticketStatus = '1';

        i['userMail'] = this.mail;

        this.http.post(this.baseUrl + '/updateTicketStatus', i).subscribe(
          (res: any) => {
            if (res) {
              this.data = res;
              this.dataSource = new MatTableDataSource(this.data);
              setTimeout(() => {
                this.dataSource.paginator = this.paginator;
              });
              this.err = false;
              this.showSpinner = false;
            } else {
              this.showSpinner = false;
              this.err = true;
            }
          },
          (err) => {
            this.showSpinner = false;
            this.err = true;
          }
        );
      }
    });
  }

  rejectTicket(i: any) {
    const MatBottomSheetRef = this.bottomsheet.open(ConfirmationComponent, {
      data: 'reject',
    });
    MatBottomSheetRef.afterDismissed().subscribe((res: any) => {
      if (res === 'confirm') {
        this.showTicketStatusBtn === false
          ? (this.showTicketStatusBtn = true)
          : (this.showTicketStatusBtn = false);

        i.ticketStatus = '-1';

        i['userMail'] = this.mail;

        this.http.post(this.baseUrl + '/updateTicketStatus', i).subscribe(
          (res: any) => {
            if (res) {
              this.data = res;
              this.dataSource = new MatTableDataSource(this.data);
              setTimeout(() => {
                this.dataSource.paginator = this.paginator;
              });
              this.err = false;
              this.showSpinner = false;
            } else {
              this.showSpinner = false;
              this.err = true;
            }
          },
          (err) => {
            this.showSpinner = false;
            this.err = true;
          }
        );
      }
    });
  }

  completedTicket(i: any) {
    const MatBottomSheetRef = this.bottomsheet.open(ConfirmationComponent, {
      data: 'confirmation',
    });

    MatBottomSheetRef.afterDismissed().subscribe((res: any) => {
      if (res === 'confirm') {
        i.ticketStatus = '2';

        i['userMail'] = this.mail;

        this.http.post(this.baseUrl + '/updateTicketStatus', i).subscribe(
          (res: any) => {
            if (res) {
              this.data = res;
              this.dataSource = new MatTableDataSource(this.data);
              setTimeout(() => {
                this.dataSource.paginator = this.paginator;
              });
              this.err = false;
              this.showSpinner = false;
            } else {
              this.showSpinner = false;
              this.err = true;
            }
          },
          (err) => {
            this.showSpinner = false;
            this.err = true;
          }
        );
      }
    });
  }

  openChat(tktNo: any) {
    const MatBottomSheetRef = this.bottomsheet.open(ChatBoxComponent, {
      data: { ticketNo: tktNo },
    });
  }

  openDialog(i: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '400px';
    dialogConfig.height = '300px';

    const dialogRef = this.dialog.open(TicketInfoDialogComponent, {
      data: { id: i, tickets: this.data },
      panelClass: 'full-screen-modal',
      maxHeight: '80vh',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  logOut() {
    this.googleApi.signOut();
  }
}
