import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GoogleSigninService } from './services/google-signin.service';
import { localStorage } from './services/localStorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  title = 'TicketRaising';
  screenSize: boolean | undefined;
  userInfo: any;
  path: any;
  env = environment.serverBaseUrl;
  loginUserName = '';
  showSpinner = true;
  constructor(
    private googleApi: GoogleSigninService,
    private local: localStorage,
    private http: HttpClient,
    private routes: Router
  ) {
    googleApi.userProfileSubject.subscribe((info: any) => {
      this.userInfo = info;
      this.path = this.env + '/saveLoginInfo';
      this.http
        .post(this.path, info, {
          headers: { 'content-type': 'application/json' },
        })
        .subscribe(
          (res: any) => {
            if (res) {
              this.showSpinner = false;
              this.local.setLocal('userCode', res[0].userCode);
              this.local.setLocal('userName', res[0].userName);
              this.local.setLocal('mailId', res[0].mailId);
              this.local.setLocal('userType', res[0].userType);
              this.local.setLocal('address', res[0].address);
              this.local.setLocal('dept', res[0].dept);
              this.local.setLocal('desg', res[0].desg);
              if(!res[0].picture){
                this.local.setLocal('picture', '../assets/bg.svg');
              } else {
                this.local.setLocal('picture', res[0].picture);
              }
              this.local.setLocal('userType', res[0].userType);
              this.local.setLocal('mobile', res[0].mobile);
              this.local.setLocal('pending', res[1].pending);
              this.local.setLocal('total', res[1].total);
              this.local.setLocal('process', res[1].processed);
              this.local.setLocal('complete', res[1].completed);
              this.local.setLocal('reject', res[1].rejected);
              setTimeout(() => {
                this.routes.navigateByUrl('dashboard');
              }, 1);
            }
          },

          (err) => {
            this.showSpinner = false;

            return this.googleApi.signOut();
          }
        );
    });
  }


  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn();
  }
}
