import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { MaterialModule } from '../material.module';
@NgModule({
    declarations:[

    ],
    imports: [RouterModule,ReactiveFormsModule,FormsModule,MaterialModule,CommonModule],
})

export class UserModule{}