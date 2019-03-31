import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-free-food',
  templateUrl: './free-food.component.html',
  styleUrls: ['./free-food.component.css']
})
export class FreeFoodComponent implements OnInit {
  public count:number = 0;
  constructor(public dialogRef: MatDialogRef<FreeFoodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {}
  add(){
    if(this.count < this.data.max) this.count = this.count + 1;
  }

  low(){
    if(this.count > 0) this.count = this.count - 1;
  }

  submit(action=false){
    if(action == false){
      this.dialogRef.close();
    } else {
      this.dialogRef.close(this.count);
    }
  }
}
