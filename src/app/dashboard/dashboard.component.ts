import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleSigninService } from '../services/google-signin.service';
import { localStorage } from '../services/localStorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  showUserProfile = false;
  pendingTickets: any;
  processTickets: any;
  totalTickets: any;
  rejectedTickets:any;
  completedTickets:any;
  userType: any;
  userDetails: any = {};
  flip: string = 'inactive';

  constructor(
    private googleApi: GoogleSigninService,
    private router: Router,
    private local: localStorage
  ) {

    this.userDetails = {
      name: this.local.getLocal('userName'),
      mobile: this.local.getLocal('mobile'),
      email: this.local.getLocal('mailId'),
      dept: this.local.getLocal('dept'),
      desg: this.local.getLocal('desg'),
      address: this.local.getLocal('address'),
      image: this.local.getLocal('picture'),
    };
    this.userType = this.local.getLocal('userType');
  }

  ngOnInit(): void {
    this.pendingTickets = this.local.getLocal('pending');
    this.processTickets = this.local.getLocal('process');
    this.rejectedTickets = this.local.getLocal('reject');
    this.completedTickets = this.local.getLocal('complete');
    this.totalTickets = this.local.getLocal('total');
  }

  logOut() {
    this.googleApi.signOut();
  }

  profile() {
    this.showUserProfile === false
      ? (this.showUserProfile = true)
      : (this.showUserProfile = false);
  }

  enterToModule() {
    if (this.local.getLocal('userType') === 'Admin') {
      this.router.navigateByUrl('admin');
    } else {
      this.router.navigateByUrl('user');
    }
  }

}
