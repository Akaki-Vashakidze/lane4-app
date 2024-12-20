import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private _socket!: Socket;
  public connected = false;

  constructor() { }


  async connect() {
    try {
      const connectionString = `${environment.apiUri}/public`;
      this._socket = io(connectionString, {
        transports: ['websocket'],
      });

      this._socket.on('connect', () => {
        this.connected = true;
      });
    } catch (error) {
      throw error;
    }
  }

  async subscribeOnLive(cb: Function) {
    this._socket.on('liveEvent', (data) => {
      cb(data);
    });
  }
}