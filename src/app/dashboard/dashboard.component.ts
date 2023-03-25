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
  serInfo :any 
  pendingTickets: any
  processTickets: any
  totalTickets: any
  // userDetails ={name:"Ibrahim",mobile:8903424281,email:"crowwnzz3@gmail.com",dept:"ERP",desg:"Junior Software Developer",address:`117/siddiq nagar/melapalayam/tirunelveli`,image:`../../assets/logo.png`}
  userDetails:any = {}

  constructor(private googleApi:GoogleSigninService,private http: HttpClient,private service :UserService,private router : Router,private local : localStorage) { 

   window.addEventListener('resize',()=>{
    let screen = window.matchMedia('(max-width:600px)');
    this.screenSize = screen.matches;
   })

  //  googleApi.userProfileSubject.subscribe((info: any) => {
  //   console.log(info)
  //   this.userInfo = info;
  //   this.path = this.env+'/saveLoginInfo'
  //   this.http.post(this.path,info, {headers: {'content-type':'application/json'}}).subscribe((res:any)=>{
      
  //     this.userInfo={"usercode":res.userCode,"username":res.userName,"email":res.mailId,"usertype":res.userType }
  //     // this.userDetails={name:res.userName,mobile:res.mobile,email:res.mailId,dept:res.dept,desg:res.desg,address:res.address}
  //   })
  // });
  this.userDetails = {name:this.local.getLocal('userName'),mobile:this.local.getLocal('mobile'),email:this.local.getLocal('mailId'),dept:this.local.getLocal('dept'),desg:this.local.getLocal('desg'),address:this.local.getLocal('address'),image:this.local.getLocal('picture'),}
  console.log(this.userDetails)

   for(let value in this.userDetails){
    console.log(`${value}${"-"}${this.userDetails[value]}`)

  // this.local.setLocal('userCode', res.userCode);
  // this.local.setLocal('userName', res.userName);
  // this.local.setLocal('mailId', res.mailId);
  // this.local.setLocal('userType', res.userType);
  // this.local.setLocal('address', res.address);
  // this.local.setLocal('dept', res.dept);
  // this.local.setLocal('desg', res.desg);
  // this.local.setLocal('picture', res.picture);
  // this.local.setLocal('userType', res.userType);
  // this.local.setLocal('mobile', res.mobile);
   }

  // this.local.setLocal('userCode', res.userCode);
  // this.local.setLocal('userName', res.userName);
  // this.local.setLocal('mailId', res.mailId);
  // this.local.setLocal('userType', res.userType);
  // this.local.setLocal('address', res.address);
  // this.local.setLocal('dept', res.dept);
  // this.local.setLocal('desg', res.desg);
  // this.local.setLocal('picture', res.picture);
  // this.local.setLocal('userType', res.userType);
  // this.local.setLocal('mobile', res.mobile);
  }

  ngOnInit(): void {
    window.addEventListener('resize',()=>{
      let screen = window.matchMedia('(max-width:600px)');
      this.screenSize = screen.matches;
      console.log(this.screenSize)
     })

    this.pendingTickets = this.local.getLocal('pending')
    this.processTickets = this.local.getLocal('process')
    let completedTickets = this.local.getLocal('complete')
    this.totalTickets = completedTickets! + this.processTickets! + this.pendingTickets!
    console.log( this.pendingTickets)
  }


  logOut() {
    this.googleApi.signOut();
    
  }

  profile(){
    this.showUserProfile === false ? this.showUserProfile = true :this.showUserProfile = false
  }


  enterToModule(){
    if(this.local.getLocal('userType') === 'Admin'){
      this.router.navigateByUrl('admin')

    }else {
      this.router.navigateByUrl('user')
    }
    

  }

  
}
