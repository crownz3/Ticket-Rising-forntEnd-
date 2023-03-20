import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { localStorage } from '../services/localStorage.service';

@Component({
  selector: 'app-add-ticket-dialog',
  templateUrl: './add-ticket-dialog.component.html',
  styleUrls: ['./add-ticket-dialog.component.css'],
  animations: [
    trigger('slideUp', [
      transition('hidden => visible', [
        style({ transform: 'translateY(-100%)' ,opacity:0}),
        animate('500ms ease-in', style({opacity:0}))
      ]),
            transition('visible => hidden', [
        animate('500ms ease-out', style({opacity:1}))
      ])
    ])
  ]
})
export class AddTicketDialogComponent implements OnInit {
  data = [{ title: 'ERROR', desc: 'This is the issue is created' }];
  selectedFile: File | any;
  theForm: FormGroup | any;
  files = [];
  fileLength: any;
  arrLength: any;
  filelist: any = [];
  fileCount = ''
  baseUrl = environment.serverBaseUrl;
  formData = new FormData();
  temp:any =  []
  isVisible = false;
  mailId :any
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef | undefined;


  constructor(
    public dialogRef: MatDialogRef<AddTicketDialogComponent>,
    private fb: FormBuilder,
    private http: HttpClient,
    private local :localStorage
  ) {}

  ngOnInit(): void {
    this.theForm = this.fb.group({
      title: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
    });

    this.mailId = this.local.getLocal('mailId')
  }

  onUpload(e: any) {
    let ff = this.theForm.controls['filesArr'].controls as FormArray;
    ff.push(this.files);
  }

  onFileChange(e: any, input: any) {
    this.files = e.target.files;
    let arr = [...this.files];
    let count = 0

      arr.forEach((file:any)=>{
        if(!this.temp.includes(file.name)){
          this.temp.push(file.name)
          this.filelist.push(file)
        }
        else{
          count++
          if(count === 1){
            this.isVisible = !this.isVisible;
            this.fileCount = `File already exist`
          } else {
           this.isVisible = !this.isVisible;
           this.fileCount = `${count} files already exist`
          }
        }
      })

    if (this.files.length !== 0) {
      this.arrLength = true;
    }
    let lengthOfTheFile = this.filelist.length;
    if(lengthOfTheFile === 1){
      this.fileLength = ` (${lengthOfTheFile} File)`;
      input.value = '';

    }else{
      this.fileLength = ` (${lengthOfTheFile} Files)`;
      input.value = '';
    }
  }



  removeFile(i: number, input: any): void {
    if (this.filelist.length === 1) {
      this.fileCount = ''
    } 
      this.filelist.splice(i, 1);
      this.temp.splice(i, 1);
      console.log(this.temp)
      if (this.filelist.length === 0) {
        this.arrLength = false;
      }
      if(this.filelist.length === 1){
        let lengthOfTheFile = this.filelist.length;
        this.fileLength = ` (${lengthOfTheFile} File)`;
      } else {
        let lengthOfTheFile = this.filelist.length;
        this.fileLength = ` (${lengthOfTheFile} Files)`;
      
   
      }
    
  }

  onFileUpload(): void {
    let ticketTitle = this.theForm.value.title;
    let ticketDesc = this.theForm.value.desc;
    let mailId = this.mailId

    const formData = new FormData();

    for (let i = 0; i < this.filelist.length; i++) {
      formData.append('files', this.filelist[i]);
    }
    formData.append('ticketTitle', ticketTitle);
    formData.append('ticketDesc', ticketDesc);
    formData.append('mailId',mailId)

    this.http.post(this.baseUrl + '/addTicket', formData).subscribe((res:any) => {
      this.local.setLocal('ticketNo',res[0].ticketNo)
      this.local.setLocal('ticketTitle',res[0].ticketTitle)
      this.local.setLocal('ticketStatus',res[0].ticketStatus)
      this.local.setLocal('ticketRaised',res[0].raisedDate)
      this.local.setLocal('ticketSolved',res[0].solvedDate)
    });

    this.dialogRef.close(this.theForm);
  }
}
