import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import {
  Router,

} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatDialog, MatBottomSheet } from '@angular/material';
import { CardDefinitionComponent } from '../../dialogs/card-definition/card-definition.component';
import { PenaltyComponent } from '../../dialogs/penalty/penalty.component';
import { LinuxCardServiceService } from '../../services/card/linux/linux-card-service.service';
import { WindowCardServiceService } from '../../services/card/windows/window-card-service.service';
import { SocketService } from '../../services/global/socket.service';
import { GbSocketService } from '../../services/global/gbsocket.service';
import * as moment from 'jalali-moment';



interface User {
  cardId: number;
  uid: number;
  card: string;
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
  providers: [LinuxCardServiceService, SocketService, GbSocketService],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public options: FormGroup;
  public opened = false;
  public mode = 'side';
  public mini = false;
  public online = false;
  public linestatus = false;
  public msgTxt = '';
  public delivered = true;
  public deliveredList = [];
  public SelectedStudent: User = {
    cardId: null,
    card : null,
    uid: null,
    firstname: null,
    lastname: null,
    emnumber: null,
    foods: [],
    drinkings: [],
    optionals: []
  };
  // tslint:disable-next-line:ban-types
  public studentData: User[] = [];
  public udata = null;
  public disimg = false;
  public message = '';
  constructor(
    fb: FormBuilder,
    private media: MediaMatcher,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private router: Router,
    private socket: SocketService,
    private gbsocket: GbSocketService,
    private windowsCard: WindowCardServiceService,
    private linuxCard: LinuxCardServiceService) {
    this.options = fb.group({
      top: 0,
      bottom: 0,
      fixed: false,
    });
  }

  async ngOnInit() {
    if (!localStorage.token) {
      this.router.navigate(['/login']);
    } else {
      this.gbsocket.socket = this.gbsocket.connect('https://message.rayda.ir/');
      this.socket.socket = this.socket.connect('https://deliver.rayda.ir/');

      this.socket.socket.on('delivermsg', (data: { message: string; }) => {
        this.msgTxt = data.message;
        this.studentData = [];
        this.SelectedStudent = {
          cardId: null,
          card : null,
          uid: null,
          firstname: null,
          lastname: null,
          emnumber: null,
          foods: [],
          drinkings: [],
          optionals: []
        };
      });

      this.gbsocket.socket.on('news', (data: { message: string; }) => {
        this.snackbar.open(data.message, 'بستن', {
          duration: 1000,
        });
      });


      this.socket.socket.on('delivered', (data: { uid: any; message: string; delivered: any; }) => {
        if (!data.uid) {

          this.SelectedStudent = {
            cardId: null,
            card: null,
            uid: null,
            firstname: null,
            lastname: null,
            emnumber: null,
            foods: [],
            drinkings: [],
            optionals: []
          };
          this.snackbar.open(data.message, 'بستن', {
            duration: 1000,
          });
          this.playAudio('error.ogg');
          return;
        }
        // tslint:disable-next-line:prefer-for-of
        const elm = this.udata.find((option: { uid: { toString: () => void; }; }) => {

          if (option.uid.toString() === data.uid) {
            return true;
          }
        });

        if (!elm) {
          this.snackbar.open('کاربر هیچ گونه رزروی ندارد', 'بستن', {
            duration: 1000,
          });

          this.playAudio('error.ogg');
          return;

        }
        this.disimg = false;
        this.SelectedStudent = {
          cardId: elm.uid,
          uid: elm.uid,
          card : elm.card,
          firstname: elm.name,
          lastname: elm.family,
          emnumber: elm.uid,
          foods: ['غذای اصلی'],
          drinkings: [],
          optionals: [],
        };


        setTimeout(() => {
          this.disimg = true;
        }, 50);
        if (data.delivered) {
          this.delivered = true;
          this.playAudio('finish.ogg');
          const add: any = this.SelectedStudent;
          add.time = moment().format('jYYYY/jMM/jDD hh:mm:ss');
          this.deliveredList.push(add);
          localStorage.offlineDeliver =  JSON.stringify(this.deliveredList);
        } else {
          this.delivered = false;
          this.playAudio('error.ogg');
        }

        this.message = data.message || null;
      });
      this.socket.socket.on('reserveds', (data: any) => {
        this.udata = null;
        if (localStorage.getItem('studentData_')) {

          this.studentData = JSON.parse(localStorage.getItem('studentData_'));
        }

        this.udata = data;
      });
    }
    this.sidenavEvent();
    this.OnlineEvent();
    let OSName = 'Unknown OS';
    if (navigator.appVersion.indexOf('Win') !== -1) { OSName = 'Windows'; }
    if (navigator.appVersion.indexOf('Mac') !== -1) { OSName = 'MacOS'; }
    if (navigator.appVersion.indexOf('X11') !== -1) { OSName = 'UNIX'; }
    if (navigator.appVersion.indexOf('Linux') !== -1) { OSName = 'Linux'; }


    if (OSName === 'Linux') {
      this.linuxCard.connect();
      this.linuxCard.GetCardData((data: any) => {
        this.socket.socket.emit('deliver', {
          card: true,
          meal: 2,
          place: '',
          uid: data,
        });
      });
    } else if (OSName === 'Windows') {
      this.windowsCard.connect();
      this.windowsCard.GetCardData((err: any, data: any) => {
        if (!err) {
          if (this.SelectedStudent.uid != null) {
            this.addToTable();
          }
          this.socket.socket.emit('deliver', {
            card: true,
            meal: 2,
            place: '',
            uid: data,
          });
        }
      });
    }
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

    if (!this.online) {
      this.SelectedStudent = {
        cardId: data.uid,
        uid: data.uid,
        card : data.card,
        firstname: data.firstname,
        lastname: data.lastname,
        emnumber: data.uid,
        foods: ['غذای اصلی'],
        drinkings: [],
        optionals: [],
      };



      const index = this.deliveredList.find((userd) => {

        if (userd.uid === this.SelectedStudent.uid) {
          return true;
        }
      });

      console.log(index);
      console.log( this.deliveredList);


      if (!index) {
        this.message = 'عدم اتصال به اینترنت';


        const add: any = this.SelectedStudent;
        add.time = moment().format('jYYYY/jMM/jDD hh:mm:ss');
        this.deliveredList.push(add);
        localStorage.offlineDeliver =  JSON.stringify(this.deliveredList);

      } else {
        this.message = `تکرار عملکرد عدم اتصال به اینترنت  ${index.time}`;
      }

      return;
    }

    if (data != null) {
      this.socket.socket.emit('deliver', {
        card: false,
        meal: 2,
        place: '',
        uid: data.uid,
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
      card: null,
      firstname: null,
      lastname: null,
      emnumber: null,
      foods: [],
      drinkings: [],
      optionals: []
    };
  }

  exit() {

    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  playAudio(n: string) {
    const audio = new Audio();
    audio.src = '/assets/' + n;
    audio.load();
    audio.play();
  }
}
