import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { MaterialModule } from '../material.module';
import { AddTicketDialogComponent } from '../add-ticket-dialog/add-ticket-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { TicketInfoDialogComponent } from '../ticket-info-dialog/ticket-info-dialog.component';

@NgModule({
    declarations:[
    ],
    imports: [RouterModule,MaterialModule,FormsModule,ReactiveFormsModule],
})

export class AdminModule{}