import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GoogleSigninService } from './google-signin.service';
import { localStorage } from './services/localStorage.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  title = 'TicketRaising';
  screenSize :boolean | undefined
  userInfo: any;
  path: any;
  env = environment.serverBaseUrl
  loginUserName = '' 

  constructor(
    private googleApi: GoogleSigninService,
    private service: UserService,
    private local: localStorage,
    private http: HttpClient,
  ) {
    googleApi.userProfileSubject.subscribe((info: any) => {
      console.log(info)
      this.userInfo = info;
      this.path = this.env+'/saveLoginInfo'
      this.http.post(this.path,info, {headers: {'content-type':'application/json'}}).subscribe((res:any)=>{
        console.log(res)
        this.local.setLocal('userCode', res.userCode);
        this.local.setLocal('userName', res.userName);
        this.local.setLocal('mailId', res.mailId);
      })
    });
  } 

  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn();
  }
}
