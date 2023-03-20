import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { UserComponent } from './user.component';
import { AddTicketDialogComponent } from '../add-ticket-dialog/add-ticket-dialog.component';
import { MaterialModule } from '../material.module';

import { MatFormField } from '@angular/material/form-field';


@NgModule({
    declarations:[
        AddTicketDialogComponent,

    ],
    imports: [RouterModule,ReactiveFormsModule,FormsModule,MaterialModule,CommonModule],
})

export class UserModule{}