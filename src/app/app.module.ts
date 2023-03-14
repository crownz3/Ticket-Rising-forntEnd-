import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { OAuthModule ,OAuthService,UrlHelperService } from 'angular-oauth2-oidc';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { GoogleSigninService } from './google-signin.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddTicketDialogComponent } from './add-ticket-dialog/add-ticket-dialog.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { UserService } from './services/user.service';
import { SocketIoModule } from 'ngx-socket-io';




@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    DashboardComponent,
    AddTicketDialogComponent,
    ChatBoxComponent
  ],
  imports: [
    OAuthModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UserModule,
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule,
    
  ],
  providers: [GoogleSigninService,OAuthService,UrlHelperService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
