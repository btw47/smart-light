import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

import * as io from 'socket.io-client';

import { Environment } from '../../environment/environment';

@Injectable()
export class WebsocketProvider {
  //websocket events
  private readonly CONNECT: string = 'connect';
  private readonly DISCONNECT: string = 'disconnect';
  private readonly TOGGLE_LIGHT: string = 'TOGGLE_LIGHT';
  private readonly TOGGLE_LIGHT_RESPONSE: string = 'TOGGLE_LIGHT_RESPONSE';

  //status of light
  public lightIsOn: boolean;
  public connected: boolean;

  //the websocket connection instance
  private socket: io;

  constructor(
    private environment: Environment,
    private toastController: ToastController
   ) {
    //init the light status as off
    this.lightIsOn = false;
  }

  /**
   * @description Initialize websocket connection
   */
  public initWebsocketConnection(): void {
    //initialize the websocket connection at the specified endpoint
    this.socket = io(this.environment.BASE_ENDPOINT);

    //on connection ==> present toast
    this.socket.on(this.CONNECT, () => {
      let toast = this.toastController.create({
        duration: 3000,
        position: 'top',
        message: 'Connected'
      });
      toast.present();

      this.connected = true;
    })

    //handle response from websocket event: TOGGLE_LIGHT_RESPONSE
    this.socket.on(this.TOGGLE_LIGHT_RESPONSE, data => {
      //set the status of the light to value in response from websocket
      this.lightIsOn = data.lightIsOn;
    });

    this.socket.on(this.DISCONNECT, () => {
      let toast = this.toastController.create({
        position: 'top',
        message: 'Disconnected.'
      });
      toast.present();

      this.connected = false;
    })
  }

  /**
   * @description Emits an event to the websocket
   */
  public emitToWebsocket(): void {
    this.socket.emit(this.TOGGLE_LIGHT);
  }
}