import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-ticket-info-dialog',
  templateUrl: './ticket-info-dialog.component.html',
  styleUrls: ['./ticket-info-dialog.component.css'],
})
export class TicketInfoDialogComponent implements OnInit {
  ticketDetails = [
    {
      ticketname: 'Something',
      ticketNo: 'TKT00001',
      tikcetDesc:
        'Barring some unforeseen turn of events, a ticket to Class AAA Nashville will be coming at some point relatively soon for Perkins.',
      createdOn: '14-03-2023',
      ticketStatus: 'Pending',
      riserName: 'Ibrahim',
      riserDept: 'ERP',
      riserDesg: 'Junior Software Developer',
      attachments: [
        '../../assets/pending.jpg',
        '../../assets/total.jpg',
        '../../assets/process.jpg',
        '../../assets/process.jpg',
        '../../assets/process.jpg',
        '../../assets/process.jpg',
        '../../assets/process.jpg',
        '../../assets/process.jpg',
      ],
    },
  ];
  chats = [{me:"kjasdl"}]
  convertedDetail: any;
  imageUrl: any;
  currentIndex = 1;
  arr: any = [];
  hideShow = false;
  constructor() {}

  @ViewChild('myImage') myImage: any;
  @ViewChild('main') myDiv: ElementRef | any;
  ngOnInit(): void {
    this.convertedDetail = this.ticketDetails.map((el: any) => {
      return {
        'Ticket Name': el.ticketname,
        'Ticket No': el.ticketNo,
        'Ticket Description': el.tikcetDesc,
        'Created On': el.createdOn,
        'Ticket Status': el.ticketStatus,
        'Raiser Name': el.riserName,
        'Riser Department': el.riserDept,
        'Riser Designation': el.riserDesg,
      };
    });

    this.ticketDetails.filter((el: any) => {
      this.imageUrl = el.attachments;
    });
    console.log(this.imageUrl);
  }

  enlargeImage(i: any) {
    this.arr.push(i);
    console.log(this.arr);
    let prevImg = this.arr[this.arr.length - 2];

    document
      .getElementsByClassName('attachmentImg')
      [i].setAttribute('style', 'width:500px;height:500px');
    document
      .getElementsByClassName('attachmentImg')
      [this.currentIndex].setAttribute('style', 'width:150px;height:150px');

    document
      .getElementById('centerImage')
      ?.setAttribute('style', 'align-items:center;height:570px');
    this.currentIndex = i;

    if (prevImg === i) {
      document
        .getElementById('centerImage')
        ?.setAttribute('style', 'align-items:center;height:100%');
    }

    if (this.currentIndex === prevImg) {
      this.arr = [];
    }

    this.myDiv.nativeElement.scroll({
      top: this.myDiv.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

  OpenChats(){
    this.hideShow === false ? this.hideShow = true : this.hideShow = false
  }
}
