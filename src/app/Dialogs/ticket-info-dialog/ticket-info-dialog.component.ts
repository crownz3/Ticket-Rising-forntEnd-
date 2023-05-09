import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
} from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-ticket-info-dialog',
  templateUrl: './ticket-info-dialog.component.html',
  styleUrls: ['./ticket-info-dialog.component.css'],
})
export class TicketInfoDialogComponent implements OnInit {
  ticketDetails: any;
  ticketDet: any;
  convertedDetail: any;
  imageUrl: any = [];
  arr: any = [];
  hideShow = false;
  value: any;
  infoId: any;
  ticketNo: any;
  baseUrl = environment.serverBaseUrl;
  showSpinner = true;
  URL = 'http://192.168.1.59:3000';
  imageLength: any;
  innerWidth: any;
  allowClick = true;
  ratingObj: any = {};
  rating: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {}

  @ViewChild('myImage') myImage: any;
  @ViewChild('main') myDiv: ElementRef | any;
  ngOnInit(): void {
    this.ticketDet = {
      ticketId: this.data.id,
    };
    this.http
      .post(this.baseUrl + '/getMoreInfo', this.ticketDet)
      .subscribe((res: any) => {
        let fileUrl = res[0].attachment;
        this.ticketDetails = [
          {
            ticketname: res[0].ticketCategory,
            ticketNo: res[0].ticketNo,
            tikcetDesc: res[0].tikcetDesc,
            createdOn: res[0].raisedOn,
            ticketStatus: res[0].ticketStatus,
            raiserName: res[0].raiserName,
            raiserDept: res[0].raiserDept,
            raiserDesg: res[0].raiserDesg,
            remarks: res[0].remarks,
            rating: res[0].rating,
            attachments: [],
          },
        ];
        fileUrl.forEach((el: any) => {
          this.ticketDetails[0].attachments.push(el.filePath);
        });
      });

    setTimeout(() => {
      this.convertedDetail = {
        'Ticket No': this.ticketDetails[0].ticketNo,
        'Ticket Description': this.ticketDetails[0].tikcetDesc,
        'Ticket Category': this.ticketDetails[0].ticketname,
        'Created On': this.ticketDetails[0].createdOn,
        'Raiser Name': this.ticketDetails[0].raiserName,
        'Raiser Department': this.ticketDetails[0].raiserDept,
        'Raiser Designation': this.ticketDetails[0].raiserDesg,
        'Ticket Status': this.ticketDetails[0].ticketStatus,
        Remarks: this.ticketDetails[0].remarks,
      };
      this.rating = this.ticketDetails[0].rating;
      for (let i = 1; i <= 5; i++) {
        if (this.rating >= i) {
          this.ratingObj['star' + i] = true;
        } else {
          this.ratingObj['star' + i] = false;
        }
      }

      this.ticketDetails[0].attachments.filter((el: any) => {
        let img = this.URL.concat(el);
        this.imageUrl.push(img);
      });
      this.showSpinner = false;
    }, 1000);

  }

  originalOrder = (
    a: KeyValue<number, string>,
    b: KeyValue<number, string>
  ): number => {
    return 0;
  };

  enlargeImage(i: any) {
    if (this.innerWidth > 600) {
      this.arr.push(i);
      let arrLen = this.arr.length;

      document
        .getElementsByClassName('attachmentImg')
        [this.arr[arrLen - 1]].setAttribute(
          'style',
          'width:500px;height:500px'
        );

      document
        .getElementById('centerImage')
        ?.setAttribute('style', 'align-items:center;height:100%');

      document
        .getElementsByClassName('attachmentImg')
        [this.arr[arrLen - 2]].setAttribute(
          'style',
          'width:150px;height:150px'
        );

      if (this.arr[arrLen - 1] === this.arr[arrLen - 2]) {
        this.arr = [];
      }

      this.myDiv.nativeElement.scroll({
        top: this.myDiv.nativeElement.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  }

  OpenChats() {
    this.hideShow === false ? (this.hideShow = true) : (this.hideShow = false);
  }

  saveImage(parent: any) {
    let dataUrl = parent.src;
    const link = document.createElement('a');
    link.download = 'image.png';
    link.target = '_blank';
    link.href = dataUrl;
    link.click();
  }
}
