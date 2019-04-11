import { Component, OnInit, Input } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-penalty',
  templateUrl: './penalty.component.html',
  styleUrls: ['./penalty.component.css']
})
export class PenaltyComponent implements OnInit {

  @Input() price:String = '0';
  constructor(private dialogRef: MatBottomSheetRef<PenaltyComponent>) { }

  ngOnInit() {
  }

  submit(action=false){
    if(action == false){
      this.dialogRef.dismiss();
    } else {
      this.dialogRef.dismiss();
    }
  }
}
