import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class GbSocketService {
  public socket: SocketIOClient.Socket;
  public connected = false;
  constructor() {
  }

  public connect(url) {
    this.ConnectToserver(url);
    return this.socket;
  }

  public disconnect() {
    this.connected = false;
    this.socket.close();
  }

  private ConnectToserver(url) {
      this.socket = io.connect(url,
      {
       query: 'token=' + localStorage.token
      });

      this.socket.on('connect', () => {
        this.connected = true;
      });
      }
}
