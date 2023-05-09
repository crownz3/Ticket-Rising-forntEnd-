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
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { AddTicketDialogComponent } from '../Dialogs/add-ticket-dialog/add-ticket-dialog.component';
import { ChatBoxComponent } from '../Dialogs/chat-box/chat-box.component';
import { GoogleSigninService } from '../services/google-signin.service';
import { localStorage } from '../services/localStorage.service';
import { ConfirmationComponent } from '../Dialogs/confirmation/confirmation.component';
import { TicketInfoDialogComponent } from '../Dialogs/ticket-info-dialog/ticket-info-dialog.component';

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
  pendingTickets: any;
  processTickets: any;
  totalTickets: any;
  rejectedTickets: any;
  completedTickets: any;
  displayedColumns: any[] = [
    'Sno',
    'TicketNo',
    'TicketTitle',
    'TicketDesc',
    'TicketStatus',
    'RaisedDate',
    'SolvedDate',
    'Remarks',
    'Rating',
    // 'Operations',
  ];
  screenSize: boolean | undefined;
  show = 'hidden';
  shows = 'shown';
  showUserProfile = true;
  userDetails: any = {};
  data: any[] = [];
  showPaginator = true;
  showSpinner = true;
  err = false;
  ticketCategory: any;
  rating = [
    { id: 1, rate: 1 },
    { id: 2, rate: 2 },
    { id: 3, rate: 3 },
    { id: 4, rate: 4 },
    { id: 5, rate: 5 },
  ];
  userEmail: any;
  pagi:any
  innerWidth:any
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: any;

  files: FileList | any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    public local: localStorage,
    public dialog: MatDialog,
    public bottomsheet: MatBottomSheet,
    private googleApi: GoogleSigninService,
    private http: HttpClient
  ) {
    this.innerWidth = window.innerWidth
    if(this.innerWidth === 375){
      this.pagi = [5,10]
    }else {
      this.pagi = [5]
    }
    window.addEventListener('resize', () => {
      let screen = window.matchMedia('(max-width:600px)');
      this.screenSize = screen.matches;
    });

  }

  ngOnInit(): void {
    this.data=[]
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

    this.pendingTickets = this.local.getLocal('pending');
    this.processTickets = this.local.getLocal('process');
    this.rejectedTickets = this.local.getLocal('reject');
    this.completedTickets = this.local.getLocal('complete');
    this.totalTickets = this.local.getLocal('total');

    this.userEmail = this.local.getLocal('mailId');
    this.http
      .get(this.baseUrl + '/getTicket?email=' + this.userEmail)
      .subscribe(
        (response: any) => {
       let res = JSON.parse(response.result)
          
          if (res || res === null) {
            this.showSpinner = false;
            this.err = false;
          }
          for (let i = 0; i < res.length; i++) {
            res[i]['ratingObj'] = {
              rate1: false,
              rate2: false,
              rate3: false,
              rate4: false,
              rate5: false,
            };
            let tickets = res[i];

            this.data.push(tickets);
            if(res[i].rating != '-')
            this.ratingStatus(res[i], res[i].rating)
          }
          this.dataSource = new MatTableDataSource(this.data);
          this.showPaginator = false;


          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
          });
        },
        (err) => {
          if (err) {
            this.showSpinner = false;
            this.err = true;
          }
        }
      );

    this.http.get(this.baseUrl + '/getCategory').subscribe((res: any) => {
      this.ticketCategory = res;
    });
  }

  hover() {
    // let btnsDiv = document.getElementById('colorChange');
    // btnsDiv?.setAttribute('style', 'background-color:#515dff;');
  }

  leave() {
    // let btnsDiv = document.getElementById('colorChange');
    // btnsDiv?.setAttribute('style', 'background-color:#333ba5;');
  }

  profile() {
    this.showUserProfile === false
      ? (this.showUserProfile = true)
      : (this.showUserProfile = false);
    this.show === 'hidden' ? (this.show = 'shown') : (this.show = 'hidden');
    this.shows === 'shown' ? (this.shows = 'hidden') : (this.shows = 'shown');
  }

  addTicket() {
    const dialogRef = this.dialog.open(AddTicketDialogComponent, {
      data: { id: this.ticketCategory },
    });

    dialogRef.afterOpened().subscribe((res) => {
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
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  openChat(tktNo: any) {
    const MatBottomSheetRef = this.bottomsheet.open(ChatBoxComponent, {
      data: { ticketNo: tktNo },
    });
  }

  ratingfn(data: any, element: any) {
    const MatBottomSheetRef = this.bottomsheet.open(ConfirmationComponent, {
      data: 'rating',
    });
    MatBottomSheetRef.afterDismissed().subscribe((res: any) => {
      if (res[0].status === 'confirm') {
        this.dataSource.data.forEach((row: any) => {
          if (row === element) {
            this.ratingStatus(row,data)
          }
        });
        let obj = {
          ticketNo: element.ticketNo,
          rating: data,
          emailId: this.userEmail,
        };
        this.http
          .put(this.baseUrl + '/putRating', obj)
          .subscribe((res: any) => {
            this.ngOnInit();
          });
      }
    });
  }
  ratingStatus(row:any,data:any){
    let index = 1;
    for (let k in row.ratingObj) {
      if (index <= data) {
        row.ratingObj[k] = true;
      } else {
        row.ratingObj[k] = false;
      }
      index++;
    }
  }



  openDialog(i: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.height = '300px';

    const dialogRef = this.dialog.open(TicketInfoDialogComponent, {
      data: { id: i.ticketNo, tickets: this.data ,userType : 'user'},
      panelClass: 'full-screen-modal',
      maxHeight: '80vh',
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  logOut() {
    this.googleApi.signOut();
  }

  compIconHov() {
    const element = document.getElementById('compIcon');
    element!.style.opacity = '1';
    element!.style.transform = 'scale(1.2)';
  }

  compIconLea() {
    const element = document.getElementById('compIcon');
    element!.style.transform = 'scale(1)';
    element!.style.opacity = '0';
  }

  pendIconHov(){
    const element = document.getElementById('pendIcon');
    element!.style.opacity = '1';

    element!.style.transform = 'scale(1.6)';
  }

  pendIconLea() {
    const element = document.getElementById('pendIcon');
    element!.style.transform = 'scale(1)';
    element!.style.opacity = '0';
  }

  totIconHov(){
    const element = document.getElementById('totIcon');
    element!.style.opacity = '1';

    element!.style.transform = 'scale(2)';
  }

  totIconLea() {
    const element = document.getElementById('totIcon');
    element!.style.transform = 'scale(1)';
    element!.style.opacity = '0';
  }

  procIconHov(){
    const element = document.getElementById('procIcon');
    element!.style.opacity = '1';

    element!.style.transform = 'scale(1.6)';
  }

  procIconLea() {
    const element = document.getElementById('procIcon');
    element!.style.transform = 'scale(1)';
    element!.style.opacity = '0';
  }

  rejIconHov(){
    const element = document.getElementById('rejIcon');
    element!.style.opacity = '1';
    element!.style.transform = 'scale(1.2)';
  }

  rejIconLea() {
    const element = document.getElementById('rejIcon');
    element!.style.transform = 'scale(1)';
    element!.style.opacity = '0';
  }
}
