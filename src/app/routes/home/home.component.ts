import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar, MatDialog, MatBottomSheet} from '@angular/material';
import { CardDefinitionComponent } from '../../dialogs/card-definition/card-definition.component';
import { PenaltyComponent } from '../../dialogs/penalty/penalty.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public options: FormGroup;
  public opened = false;
  public mode = 'side';
  public mini = false;
  public online = false;
  public linestatus = false;
  public search = false;
  public SelectedStudent: any = {
    cardId: null,
    uid: null,
    firstname: null,
    lastname : null,
    emnumber : null,
    foods: [],
    drinkings: [],
    optionals: []
  };
  public studentData: Object[] = [];
  constructor(fb: FormBuilder, private  media: MediaMatcher, private snackbar: MatSnackBar, private dialog: MatDialog, private bottomSheet: MatBottomSheet) {
    this.options = fb.group({
      top: 0,
      bottom: 0,
      fixed: false,
    });
  }

  ngOnInit() {
    this.sidenavEvent();
    this.OnlineEvent();
  }

  sidenavEvent() {
    const query = this.media.matchMedia('(max-width: 1100px)');
    const Listener = () => {
      if (query.matches === true) {
        this.opened = false;
        this.mini = true;
        this.mode = 'push';
      } else {
        this.opened = true;
        this.mini = false;
        this.mode = 'side';
      }
    };
    query.addListener(Listener);
    Listener();
  }

  OnlineEvent() {
    window.onload = () => {
      if (navigator.onLine) {
        this.online = true;
        setTimeout(() => {
          this.linestatus = false;
        }, 3000);
      } else {
        this.linestatus = true;
        this.online = false;
      }
    };

    window.ononline = () => { this.online = true; setTimeout(() => this.linestatus = false, 3000); };
    window.onoffline = () => { this.linestatus = true; this.online = false; };
  }

  onStudentSelect(data= {}) {
    if (data != null) {
      if(this.SelectedStudent['uid'] != null){
        this.addToTable();
      }
      this.SelectedStudent = data;
      this.snackbar.open(`شما ${data['firstname'] + ' ' + data['lastname']} را انتخاب کردید`, 'باشه', { duration: 3000 });
    }
  }

  cardDefinition() {
    this.dialog.open(CardDefinitionComponent);
  }

  penaltyUser() {
    this.bottomSheet.open(PenaltyComponent);
  }

  addToTable(){
    this.studentData.push(this.SelectedStudent);
    this.SelectedStudent = {
      cardId: null,
      uid: null,
      firstname: null,
      lastname : null,
      emnumber : null,
      foods: [],
      drinkings: [],
      optionals: []
    }
    console.log("Added To Table");
    
  }
}
