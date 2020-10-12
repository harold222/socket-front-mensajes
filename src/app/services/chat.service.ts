import { Injectable } from '@angular/core';
import { WebSocketsService } from './web-sockets.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public socketService: WebSocketsService) { }

  enviarMensaje(mensaje: string) {
    const payload = {
      de: 'juan',
      cuerpo: mensaje
    };

    this.socketService.emit('mensaje', payload);
  }

  // estara pendiente a los mensajes que vaya recibiendo de otro cliente
  recibirMensajes() {
    return this.socketService.listener('nuevo-mensaje');
  }

}
