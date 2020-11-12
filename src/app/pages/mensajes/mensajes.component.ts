import { Component } from '@angular/core';
import { WebSocketsService } from '../../services/web-sockets.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent{

  constructor(private socketServicio: WebSocketsService) {
  }

  salir() {
    this.socketServicio.logoutSocket();
  }
}
