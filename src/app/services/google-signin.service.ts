import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  postLogoutRedirectUri: 'http://localhost:4200',
  // postLogoutRedirectUri:'https://qrcodev2.000webhostapp.com',
  clientId:
    '643931385116-7kru47rm9g5tcs86s3dk4gs1n18ftevc.apps.googleusercontent.com',
    
     scope: 'openid profile email ',
};

export interface UserInfo {
  info: {
    sub: string;
    email: string;
    name: string;
    picture: string;
  };
}

@Injectable({
  providedIn: 'root',
})

export class GoogleSigninService {
  userProfileSubject = new Subject<UserInfo>();

  constructor(
    private readonly oAuthService: OAuthService // private readonly httpClient: HttpClient
  ) {
    oAuthService.configure(oAuthConfig);
    oAuthService.logoutUrl = `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:4200`;
    oAuthService.loadDiscoveryDocument().then(() => {
      oAuthService.tryLoginImplicitFlow().then(() => {
        if (!oAuthService.hasValidAccessToken()) {
          oAuthService.initLoginFlow();
        } else {
          oAuthService.loadUserProfile().then((userProfile) => {
            this.userProfileSubject.next(userProfile as unknown as UserInfo);
          });                                  
        }
      });
    });

    
  }

  isLoggedIn() {                 
    return this.oAuthService.hasValidAccessToken();
  }

  signOut() {
    this.oAuthService.logOut();
  }       


  // this.userProfileSubject.subscribe((info: any) => {
  //   console.log(info)
  //   this.userInfo = info;
  //   this.path = this.env+'/saveLoginInfo'
  //   this.http.post(this.path,info, {headers: {'content-type':'application/json'}}).subscribe((res:any)=>{
  //     console.log(res)
  //     this.loginUserName = res.userName
  //     res.sucess ? alert("Succesfully") : alert('Nope')
  //   })
  // });
}
