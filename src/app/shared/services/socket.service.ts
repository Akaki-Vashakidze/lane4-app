import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { v4 } from 'uuid';
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private _socket!: Socket;
  public connected = false;

  constructor() { 
  }


  async connect() {
    try {
      const connectionString = `${environment.apiUri}/public?uuid=${this.getUuid()}`;
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

  getUuid() {
    return localStorage.getItem('lane4Uuid') || this._getNewUuid()
  }

  _getNewUuid() {
    const id = v4();
    localStorage.setItem('lane4Uuid', id);
    return id;
  }
  async subscribeOnLive(cb: Function) {
    this._socket.on('liveEvent', (data) => {
      cb(data);
    });
  }
}