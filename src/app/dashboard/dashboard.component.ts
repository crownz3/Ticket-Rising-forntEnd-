import { Component, OnInit } from '@angular/core';
import { GoogleSigninService } from '../google-signin.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   screenSize :boolean | undefined
  constructor(private googleApi:GoogleSigninService) { 

   window.addEventListener('resize',()=>{
    let screen = window.matchMedia('(max-width:600px)');
    this.screenSize = screen.matches;
    console.log(this.screenSize)
   })
    
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
    
  }

  
}
