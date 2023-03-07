import { Component } from '@angular/core';
import { GoogleSigninService } from './google-signin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TicketRaising';

  constructor(private  googleApi: GoogleSigninService){}


  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn();
  }
}
