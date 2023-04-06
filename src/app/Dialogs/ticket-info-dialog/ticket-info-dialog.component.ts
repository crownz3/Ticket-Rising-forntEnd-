import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
} from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
  infoId: any;
  ticketNo: any;
  baseUrl = environment.serverBaseUrl;
  showSpinner = true;
  URL = 'http://192.168.1.59:3000';
  imageLength :any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  @ViewChild('myImage') myImage: any;
  @ViewChild('main') myDiv: ElementRef | any;
  ngOnInit(): void {
    this.infoId = this.data.id;
    this.ticketNo = this.data.tickets[this.infoId].ticketNo;
    this.ticketDet = {
      ticketId: this.ticketNo,
    };
    this.http
      .post(this.baseUrl + '/getMoreInfo', this.ticketDet)
      .subscribe((res: any) => {
        let fileUrl = res[0].attachment;
        this.ticketDetails = [
          {
            ticketname: res[0].ticketTitle,
            ticketNo: res[0].ticketNo,
            tikcetDesc: res[0].tikcetDesc,
            createdOn: res[0].raisedOn,
            ticketStatus: res[0].ticketStatus,
            riserName: res[0].raiserName,
            riserDept: res[0].raiserDept,
            riserDesg: res[0].raiserDesg,
            attachments: [],
          },
        ];
        fileUrl.forEach((el: any) => {
          this.ticketDetails[0].attachments.push(el.filePath);
        });
      });

    setTimeout(() => {
      this.convertedDetail = {
        'Ticket Name': this.ticketDetails[0].ticketname,
        'Ticket No': this.ticketDetails[0].ticketNo,
        'Ticket Description': this.ticketDetails[0].tikcetDesc,
        'Created On': this.ticketDetails[0].createdOn,
        'Ticket Status': this.ticketDetails[0].ticketStatus,
        'Raiser Name': this.ticketDetails[0].riserName,
        'Riser Department': this.ticketDetails[0].riserDept,
        'Riser Designation': this.ticketDetails[0].riserDesg,
      };

      this.ticketDetails[0].attachments.filter((el: any) => {
        let img = this.URL.concat(el);
        this.imageUrl.push(img);
      });
      this.showSpinner = false;
    }, 1000);
  }

  enlargeImage(i: any) {
    this.arr.push(i);
    let arrLen = this.arr.length;

    document
      .getElementsByClassName('attachmentImg')
      [this.arr[arrLen - 1]].setAttribute('style', 'width:500px;height:500px');

    document
      .getElementById('centerImage')
      ?.setAttribute('style', 'align-items:center;height:100%');

    document
      .getElementsByClassName('attachmentImg')
      [this.arr[arrLen - 2]].setAttribute('style', 'width:150px;height:150px');

    if (this.arr[arrLen - 1] === this.arr[arrLen - 2]) {
      this.arr = [];
    }

    this.myDiv.nativeElement.scroll({
      top: this.myDiv.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

  OpenChats() {
    this.hideShow === false ? (this.hideShow = true) : (this.hideShow = false);
  }
}
