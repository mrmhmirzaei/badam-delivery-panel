import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-free-food-student',
  templateUrl: './free-food-student.component.html',
  styleUrls: ['./free-food-student.component.css']
})
export class FreeFoodStudentComponent implements OnInit {

  public done:Boolean = false;
  constructor(public dialogRef: MatDialogRef<FreeFoodStudentComponent>) { }

  ngOnInit() {
  }

  submit(action=false){
    if(action == false){
      this.dialogRef.close();
    } else {
      this.dialogRef.close(null);
    }
  }
}
