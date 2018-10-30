import { Component, OnInit } from '@angular/core';

import { WebsocketProvider } from '../../providers/websocket/websocket';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private websocketProvider: WebsocketProvider) { }

  /**
   * @description Triggers the emission of event to server to toggle light
   */
  private toggleLight(): void {
    this.websocketProvider.emitToWebsocket();
  }

}
