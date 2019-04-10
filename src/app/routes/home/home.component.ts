import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {
   Router,

} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar, MatDialog, MatBottomSheet} from '@angular/material';
import { CardDefinitionComponent } from '../../dialogs/card-definition/card-definition.component';
import { PenaltyComponent } from '../../dialogs/penalty/penalty.component';
import {LinuxCardServiceService} from '../../services/card/linux/linux-card-service.service';
import {SocketService} from '../../services/global/socket.service';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

interface User {
  cardId: number;
  uid: number;
  firstname: string;
  lastname: string;
  emnumber: number;
  foods: string[];
  drinkings: string[];
  optionals: string[];

}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [LinuxCardServiceService, SocketService],
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
  public msgTxt = '';
  public delivered = true;
  public SelectedStudent: User = {
    cardId: null,
    uid: null,
    firstname: null,
    lastname : null,
    emnumber : null,
    foods: [],
    drinkings: [],
    optionals: []
  };
  // tslint:disable-next-line:ban-types
  public studentData: User[] = [];
  public udata = null;
  public message = '';
  constructor(
    fb: FormBuilder,
    private media: MediaMatcher,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private router: Router,
    private socket: SocketService,
    private linuxCard: LinuxCardServiceService) {
    this.options = fb.group({
      top: 0,
      bottom: 0,
      fixed: false,
    });
  }

  ngOnInit() {
    if (!localStorage.token) {

      this.router.navigate(['/login']);
    } else {
      this.socket.socket = this.socket.connect();
      this.socket.socket.on('delivermsg', (data) => {
        this.msgTxt = data.message;
        this.studentData = [];
        this.SelectedStudent = {
          cardId: null,
          uid: null,
          firstname: null,
          lastname : null,
          emnumber : null,
          foods: [],
          drinkings: [],
          optionals: []
        };
      });

      this.socket.socket.on('delivered', (data) => {
        // tslint:disable-next-line:prefer-for-of
        const elm = this.udata.find((option) => {

          if (option.uid.toString() === data.uid) {
            return true;
          }
        });
        this.SelectedStudent = {
          cardId : elm.uid,
          uid: elm.uid,
          firstname: elm.name,
          lastname: elm.family,
          emnumber: elm.uid,
          foods: ['غذای اصلی'],
          drinkings: [],
          optionals: [],
        };
        if (!data.uid) {
          this.snackbar.open(data.message, 'بستن', {
            duration : 1000,
          });
        }

        if (data.delivered) {
          this.delivered = true;
          this.playAudio('finish.ogg');
         } else {
          this.delivered = false;
          this.playAudio('error.ogg');
        }

        this.message = data.message;
      });
      this.socket.socket.on('reserveds', (data) => {
        if (localStorage.getItem('studentData_')) {

          this.studentData = JSON.parse(localStorage.getItem('studentData_'));
        }
        this.udata = data;
      });
    }
    this.sidenavEvent();
    this.OnlineEvent();
    this.linuxCard.connect();
    this.linuxCard.GetCardData((data) => {
      if (this.SelectedStudent.uid != null) {
        this.addToTable();
      }
      this.socket.socket.emit('deliver', {
        card : true,
        meal : 2,
        place : '',
        uid : data,
      });
    });
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

  onStudentSelective(data: User) {

    if (this.SelectedStudent.uid != null) {
      this.addToTable();
    }

    if (data != null) {
      this.socket.socket.emit('deliver', {
        card : false,
        meal : 2,
        place : '',
        uid : data.uid,
      });
      // this.SelectedStudent = data;
    }
  }

  cardDefinition() {
    this.dialog.open(CardDefinitionComponent);
  }

  penaltyUser() {
    this.bottomSheet.open(PenaltyComponent);
  }

  addToTable() {
    const findIndex = this.studentData.find((o) => {

      if (o.uid === this.SelectedStudent.uid) {

        return true;
      }
    });
    if (findIndex) {

      return true;
    }
    this.studentData.unshift(this.SelectedStudent);
    localStorage.setItem(`studentData_`, JSON.stringify(this.studentData));
    this.SelectedStudent = {
      cardId: null,
      uid: null,
      firstname: null,
      lastname : null,
      emnumber : null,
      foods: [],
      drinkings: [],
      optionals: []
    };
  }

  exit() {

    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  playAudio(n) {
    const audio = new Audio();
    audio.src =  '/assets/' + n;
    audio.load();
    audio.play();
  }
}
