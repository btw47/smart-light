import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

import { Environment } from '../../environment/environment';

@Injectable()
export class WebsocketProvider {
  //the websocket connection instance
  private socket: io;

  constructor(private http: HttpClient, private environment: Environment) { }

  /**
   * @description Initialize websocket connection
   */
  public initWebsocketConnection(): void {
    //initialize the websocket connection at the specified endpoint
    this.socket = io(this.environment.BASE_ENDPOINT);

    //handle events @ 'example-pong'
    this.socket.on('example-pong', data => {
      console.log("PONG");
    });
  }

  /**
   * @description Emits an event to the websocket
   */
  public emitToWebsocket(): void {
    this.socket.emit('example-ping', { duration: 2 });
  }
}
