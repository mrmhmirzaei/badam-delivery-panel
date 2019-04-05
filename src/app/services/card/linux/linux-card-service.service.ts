import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class LinuxCardServiceService {
  public socket: SocketIOClient.Socket;
  private connected = false;
  private classicCardPerfix = '3b868001f0';
  private newCardPerfix = '3bf99100ff9181713c40000a80';

  constructor() {
     this.ConnectToserver();

     this.socket.on('disconnect', () => {
       console.log('diss...');
       this.connected = false;
     });
  }

  public connect() {
    this.ConnectToserver();
    return this.socket;
  }

  public disconnect() {
    this.connected = false;
    this.socket.close();
  }
  public GetCardData(callback) {
    this.socket.on('card-inserted', (data) => {
      if (data.startsWith(this.classicCardPerfix)) {
         data = data.replace(this.classicCardPerfix, '');
      }
      if (data.startsWith(this.newCardPerfix)) {
        data = data.replace(this.newCardPerfix, '');
        data = data.slice(0, -2);
      }
      callback(data);
    });
  }

  private ConnectToserver() {
    if (!this.connected) {
      this.socket = io.connect('http://localhost:1591');

      this.socket.on('connect', () => {
        this.connected = true;
      });
      }
  }
}
