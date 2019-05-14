import { Injectable } from '@angular/core';
import ReconnectingWebSocket from 'reconnecting-websocket';

@Injectable({
  providedIn: 'root'
})
export class WindowCardServiceService {
  winsocket = null;
  websocketstart(websocketServerLocation) {
    this.winsocket = new ReconnectingWebSocket(websocketServerLocation);
  }
  connect(){
    this.websocketstart('ws://localhost:4000/soso');
  }
  GetCardData(callback) {
    this.winsocket.onmessage = (messageEvent) => {
      const wsMsg = messageEvent.data;
      let data = JSON.parse(wsMsg).data.data;
      console.log(data);
      if (data === '') {
        callback('notfound', null)
      }
      if (data.startsWith('3b868001f0')) {
        data = data.replace('3b868001f0', '');
      } else if (data.startsWith('3bf99100ff9181713c40000a80')) {
       data = data.replace('3bf99100ff9181713c40000a80', '');
       data = data.slice(0, -2);
     } else {
      callback('notfound', null)
     }
     callback(null,  data.toUpperCase())


    };
  }

  converter(){

  }
}
