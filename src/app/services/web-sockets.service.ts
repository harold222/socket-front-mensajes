import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketsService {

  public socketStatus = false;

  constructor(public socket: Socket) {
    this.revisarStatusCliente();
  }

  revisarStatusCliente() { // funcion para revisar si el cliente esta o no conectado al socket
    this.socket.on('connect', () => {
      console.log(`connect to server`);
      this.socketStatus = true;
    });
    // estan funciones siempre se estaran ejecutando son observables
    this.socket.on('disconnect', () => {
      console.log(`disconnect to server`);
      this.socketStatus = false;
    });
  }

  emit(evento: string, payload?: any, callback?: Function ) {
    this.socket.emit(evento, payload, callback); // disparo un evento al servidor
  }

  // estara pendiente de cualquier evento que emita el servidor
  listener(evento: string)  {
    return this.socket.fromEvent(evento);
  }


}
