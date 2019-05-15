import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/global/socket.service';
import { GbSocketService } from '../services/global/gbsocket.service';
import { MatSnackBar } from '@angular/material';
import { WindowCardServiceService } from '../services/card/windows/window-card-service.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  constructor(
    private snackbar: MatSnackBar,
    private windowsCard: WindowCardServiceService,

    private socket: SocketService,
    private gbsocket: GbSocketService,
  ) { }

  userCard = false;
  cardAtr = '';
  user = {
    name : '',
    family : ''
  }
  InputData = {
    uid : null,
    card : null
  }
  ngOnInit() {
    this.gbsocket.socket = this.gbsocket.connect('https://message.rayda.ir/');
    this.socket.socket = this.socket.connect('https://deliver.rayda.ir/');

    this.gbsocket.socket.on('news', (data: { message: string; }) => {
      this.snackbar.open(data.message, 'بستن', {
        duration: 1000,
      });
    });

    let OSName = 'Unknown OS';
    if (navigator.appVersion.indexOf('Win') !== -1) { OSName = 'Windows'; }
    if (navigator.appVersion.indexOf('Mac') !== -1) { OSName = 'MacOS'; }
    if (navigator.appVersion.indexOf('X11') !== -1) { OSName = 'UNIX'; }
    if (navigator.appVersion.indexOf('Linux') !== -1) { OSName = 'Linux'; }
    if (OSName === 'Windows') {
      this.windowsCard.connect();
      this.windowsCard.GetCardData((err: any, data: any) => {
        this.InputData.card = data
      });
    }
  }

  submit(){
    this.socket.socket.emit('defcard', this.InputData)
  }
}
