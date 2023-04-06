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
import { GoogleSigninService } from './services/google-signin.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ChatBoxComponent } from './Dialogs/chat-box/chat-box.component';
import { UserService } from './services/user.service';
import { SocketIoModule } from 'ngx-socket-io';
import { TicketInfoDialogComponent } from './Dialogs/ticket-info-dialog/ticket-info-dialog.component';
import { ConfirmationComponent } from './Dialogs/confirmation/confirmation.component';
import { AddTicketDialogComponent } from './Dialogs/add-ticket-dialog/add-ticket-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    DashboardComponent,
    ChatBoxComponent,
    TicketInfoDialogComponent,
    ConfirmationComponent,
    AddTicketDialogComponent
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
