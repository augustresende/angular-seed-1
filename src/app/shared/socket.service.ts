import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class SocketService {
  private url = 'http://179.221.104.89:85';  
  public socket = io(this.url);
  
  sendMessage(message){
    this.socket.emit('paybill',message);    
  }
  
  getMessages(type) {
    let observable = new Observable(observer => {
      this.socket.on(type, (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }
}