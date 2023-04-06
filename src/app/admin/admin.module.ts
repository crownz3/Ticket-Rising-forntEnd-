import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
    declarations:[
    ],
    imports: [RouterModule,MaterialModule,FormsModule,ReactiveFormsModule,MatDialogModule],
})

export class AdminModule{}