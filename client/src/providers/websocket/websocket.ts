import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

import { Environment } from '../../environment/environment';

@Injectable()
export class WebsocketProvider {
  //websocket events
  private readonly TOGGLE_LIGHT: string = 'TOGGLE_LIGHT';
  private readonly TOGGLE_LIGHT_RESPONSE: string = 'TOGGLE_LIGHT_RESPONSE';

  //the websocket connection instance
  private socket: io;

  constructor(private environment: Environment) { }

  /**
   * @description Initialize websocket connection
   */
  public initWebsocketConnection(): void {
    //initialize the websocket connection at the specified endpoint
    this.socket = io(this.environment.BASE_ENDPOINT);

    //handle response from websocket event: TOGGLE_LIGHT_RESPONSE
    this.socket.on(this.TOGGLE_LIGHT_RESPONSE, data => {
      console.log("TOGGLE LIGHT RESPONSE: ", data);
    });
  }

  /**
   * @description Emits an event to the websocket
   */
  public emitToWebsocket(): void {
    this.socket.emit(this.TOGGLE_LIGHT);
  }
}
