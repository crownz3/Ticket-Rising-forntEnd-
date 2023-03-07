import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-ticket-dialog',
  templateUrl: './add-ticket-dialog.component.html',
  styleUrls: ['./add-ticket-dialog.component.css']
})
export class AddTicketDialogComponent implements OnInit {
  data = [{title:'ERROR',desc:'This is the issue is created'}]
  selectedFile : File | any
  theForm : FormGroup | any
  files :any

  constructor(public dialogRef: MatDialogRef<AddTicketDialogComponent>,private fb: FormBuilder) { }

  ngOnInit(): void {

    this.theForm = this.fb.group({
      'title' : new FormControl('',Validators.required),
      'desc':new FormControl('',Validators.required),
       "filesArr":this.fb.array([])
    })
  }

  onFileUploaded(event:any){
    let data = event.target.files
    for(let i = 0 ;i < data.length;i++ ){
      let name =  event.target.files[i].name
      console.log(name);
    }
  }

  onUpload(){

     let ff =this.theForm.controls['filesArr'].controls as FormArray
     ff.push(this.files)
     console.log(this.theForm)

    this.dialogRef.close(this.theForm)
  }

  onFileChange(e:any) {
    let data = e.target.files
    let arr = [...data]
    this.files = arr
  }

  removeFile(i:number){
   
    this.files.splice(i,1)
      
  }

 


}
