import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GoogleSigninService } from '../google-signin.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  screenSize :boolean | undefined
  userInfo: any;
  path: any;
  env = environment.serverBaseUrl
  loginUserName = '' 


  constructor(private googleApi:GoogleSigninService,private http: HttpClient,private service :UserService,private router : Router) { 

   window.addEventListener('resize',()=>{
    let screen = window.matchMedia('(max-width:600px)');
    this.screenSize = screen.matches;
   })

    googleApi.userProfileSubject.subscribe((info: any) => {
    console.log(info)
    this.userInfo = info;
    this.path = this.env+'/saveLoginInfo'
    this.http.post(this.path,info, {headers: {'content-type':'application/json'}}).subscribe((res:any)=>{
      console.log(res)
      this.loginUserName = res.userName
      res.sucess ? alert("Succesfully") : alert('Nope')
    })
  });
    
  }

  ngOnInit(): void {
    window.addEventListener('resize',()=>{
      let screen = window.matchMedia('(max-width:600px)');
      this.screenSize = screen.matches;
      console.log(this.screenSize)
     })
  }


  logOut() {
    this.googleApi.signOut();
    
  }


  enterToModule(){

    this.service.setData('name',this.loginUserName)
    this.router.navigateByUrl('user')
    console.log(this.loginUserName)

  }

  
}
