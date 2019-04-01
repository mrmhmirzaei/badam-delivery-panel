import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-card-definition',
  templateUrl: './card-definition.component.html',
  styleUrls: ['./card-definition.component.css']
})
export class CardDefinitionComponent implements OnInit {

  public done:Boolean = false;
  constructor(public dialogRef: MatDialogRef<CardDefinitionComponent>) { }

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
