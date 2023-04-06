import { Component, OnInit ,Inject} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  info:any
  constructor(private bottomSheet: MatBottomSheet,@Inject(MAT_BOTTOM_SHEET_DATA) public data: {info : string}) { }

  ngOnInit(): void {
    this.info = this.data
  }

  confrimToComplete(){
    this.bottomSheet.dismiss("confirm")
  }

  notConfirmedToComplete(){
    this.bottomSheet.dismiss("notConfirm")

  }

}
