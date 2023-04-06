import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GoogleSigninService } from '../services/google-signin.service';
import { localStorage } from '../services/localStorage.service';
import { UserService } from '../services/user.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  screenSize: boolean | undefined;
  showUserProfile = false;
  pendingTickets: any;
  processTickets: any;
  totalTickets: any;
  userType: any;
  userDetails: any = {};
   flip: string = 'inactive';

  constructor(
    private googleApi: GoogleSigninService,
    private router: Router,
    private local: localStorage
  ) {
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
    this.userType = this.local.getLocal('userType');
  }

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      let screen = window.matchMedia('(max-width:600px)');
      this.screenSize = screen.matches;
      console.log(this.screenSize);
    });

    this.pendingTickets = this.local.getLocal('pending');
    this.processTickets = this.local.getLocal('process');
    let completedTickets = this.local.getLocal('complete');
    this.totalTickets =
      completedTickets! + this.processTickets! + this.pendingTickets!;
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
