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
import { fileUpload } from '../services/file-upload.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-ticket-dialog',
  templateUrl: './add-ticket-dialog.component.html',
  styleUrls: ['./add-ticket-dialog.component.css'],
})
export class AddTicketDialogComponent implements OnInit {
  data = [{ title: 'ERROR', desc: 'This is the issue is created' }];
  selectedFile: File | any;
  theForm: FormGroup | any;
  files: any;
  details :any
baseUrl = environment.serverBaseUrl ;
  formData = new FormData();
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef | undefined;

  constructor(
    public dialogRef: MatDialogRef<AddTicketDialogComponent>,
    private fb: FormBuilder,
    
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.theForm = this.fb.group({
      title: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      filesArr: this.fb.array([]),
    });
  }

  onFileUploaded(event: any) {
    let data = event.target.files;
    for (let i = 0; i < data.length; i++) {
      let name = event.target.files[i].name;
      console.log(name);
    }
  }

  onUpload(e: any) {
    let ff = this.theForm.controls['filesArr'].controls as FormArray;
    ff.push(this.files);
    console.log(this.theForm);
  }

  onFileChange(e: any) {
    let data = e.target.files;
    let arr = [...data];
    this.files = arr;

    this.files = e.target.files;
    

  }

  removeFile(i: number) {
    // this.files.splice(i, 1);
    console.log(this.files,i)
  }

  onSubmit(event: Event) {
    // this.formData.append('')
    // event.preventDefault();
    // let formData = new FormData(event.target as HTMLFormElement)
    // this.fileUpload.submitForm(formData).subscribe((res)=>{
    //   console.log(res)
    // })
  }

  // onFileUpload() {
    // const imageBlob = this.fileInput?.nativeElement.files[0];
    // const file = new FormData();

    // file.set('files', imageBlob);
    // console.log(file)
    // this.http.post('/upload', file).subscribe((response) => {
    //   console.log(response);
    // });

    // this.dialogRef.close(this.theForm);


    // console.log(this.theForm)


  // }

  // selectFiles(event:any): void {
  // }


  onFileUpload(): void {

    
    let ticketTitle = this.theForm.value.title
    let ticketDesc = this.theForm.value.desc
   
    this.details = {title:ticketTitle,description:ticketDesc}

    const formData = new FormData();

    for (let i = 0; i < this.files.length; i++) {
      formData.append('files[]', this.files[i]);
    }
    formData.append('details',this.details)


    this.http.post(this.baseUrl +'/upload', formData).subscribe(response => {
      console.log(response);
    });

    this.dialogRef.close(this.theForm);

  }


}
