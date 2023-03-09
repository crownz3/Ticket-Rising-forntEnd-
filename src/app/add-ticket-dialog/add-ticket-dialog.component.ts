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

  formData = new FormData();
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef | undefined;

  constructor(
    public dialogRef: MatDialogRef<AddTicketDialogComponent>,
    private fb: FormBuilder,
    private fileUpload: fileUpload,
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
  }

  removeFile(i: number) {
    this.files.splice(i, 1);
  }

  onSubmit(event: Event) {
    // this.formData.append('')
    // event.preventDefault();
    // let formData = new FormData(event.target as HTMLFormElement)
    // this.fileUpload.submitForm(formData).subscribe((res)=>{
    //   console.log(res)
    // })
  }

  onFileUpload() {
    const imageBlob = this.fileInput?.nativeElement.files[0];
    const file = new FormData();

    file.set('file', imageBlob);

    this.http.post('http://localhost:3000/', file).subscribe((response) => {
      console.log(response);
    });

    this.dialogRef.close(this.theForm);
  }
}
