import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GoogleSigninService } from './google-signin.service';
import { localStorage } from './services/localStorage.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'TicketRaising';
  screenSize: boolean | undefined;
  userInfo: any;
  path: any;
  env = environment.serverBaseUrl;
  loginUserName = '';

  constructor(
    private googleApi: GoogleSigninService,
    private service: UserService,
    private local: localStorage,
    private http: HttpClient,
    private routes: Router
  ) {
    googleApi.userProfileSubject.subscribe((info: any) => {
      console.log(info);
      this.userInfo = info;
      this.path = this.env + '/saveLoginInfo';
      this.http
        .post(this.path, info, {
          headers: { 'content-type': 'application/json' },
        })
        .subscribe(
          (res: any) => {
            console.log(res);
            this.local.setLocal('userCode', res.userCode);
            this.local.setLocal('userName', res.userName);
            this.local.setLocal('mailId', res.mailId);
            this.local.setLocal('userType', res.userType);
            this.local.setLocal('address', res.address);
            this.local.setLocal('dept', res.dept);
            this.local.setLocal('desg', res.desg);
            this.local.setLocal('picture', res.picture);
            this.local.setLocal('userType', res.userType);
            this.local.setLocal('mobile', res.mobile);
            setTimeout(() => {
            this.routes.navigateByUrl('dashboard')

            }, 1000);
          },
          (err) => {
            return this.googleApi.signOut();
          }
        );
    });
  }

  ngOnInit(): void {

  }

  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn();
  }
}
