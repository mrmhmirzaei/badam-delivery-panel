import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/global/socket.service';
import { GbSocketService } from '../services/global/gbsocket.service';
import { MatSnackBar } from '@angular/material';
import { WindowCardServiceService } from '../services/card/windows/window-card-service.service';
import { LinuxCardServiceService } from '../services/card/linux/linux-card-service.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  constructor(
    private snackbar: MatSnackBar,
    private windowsCard: WindowCardServiceService,
    private linuxCard:LinuxCardServiceService,
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
        duration: 3000,
      });
    });

   
      this.windowsCard.connect();
      this.linuxCard.connect();

      this.windowsCard.GetCardData((err: any, data: any) => {
        this.InputData.card = data
        this.cardAtr = data
      });

      this.linuxCard.GetCardData((err: any, data: any) => {
        this.InputData.card = data
        this.cardAtr = data
      });
  }

  submit(){

    console.log(this.InputData)
    this.socket.socket.emit('defcard', this.InputData)

    this.reset()

  }
  removeCard(){
    this.socket.socket.emit('remcard', this.InputData)

    this.reset()
  }
  reset(){


    this.InputData = {
      uid : '',
      card : ''
    };
    this.cardAtr = ''
  }
}
