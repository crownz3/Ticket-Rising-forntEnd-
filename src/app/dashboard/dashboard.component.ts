import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GoogleSigninService } from '../google-signin.service';
import { localStorage } from '../services/localStorage.service';
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
  showUserProfile = false
  env = environment.serverBaseUrl
  loginUserName = '' 
  userDetails ={name:"Ibrahim",mobile:8903424281,email:"crowwnzz3@gmail.com",dept:"ERP",desg:"Junior Software Developer",address:`117/siddiq nagar/melapalayam/tirunelveli`,image:`../../assets/logo.png`}


  constructor(private googleApi:GoogleSigninService,private http: HttpClient,private service :UserService,private router : Router,private local : localStorage) { 

   window.addEventListener('resize',()=>{
    let screen = window.matchMedia('(max-width:600px)');
    this.screenSize = screen.matches;
   })
   
  }

  ngOnInit(): void {
    window.addEventListener('resize',()=>{
      let screen = window.matchMedia('(max-width:600px)');
      this.screenSize = screen.matches;
      console.log(this.screenSize)
     })
     let name = this.local.getLocal('userName')
   console.log(name)
  }


  logOut() {
    this.googleApi.signOut();
    
  }

  profile(){
    this.showUserProfile === false ? this.showUserProfile = true :this.showUserProfile = false
  }


  enterToModule(){

    this.service.setData('name',this.loginUserName)
    this.router.navigateByUrl('user')
    console.log(this.loginUserName)

  }

  
}
