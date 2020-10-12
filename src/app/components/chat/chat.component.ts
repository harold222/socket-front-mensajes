import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto: string = '';
  mensajesSubscription: Subscription;
  mensajes: any[] = [];
  elemento: HTMLElement;

  constructor(public charServicio: ChatService) { }

  ngOnInit() {
    this.elemento = document.getElementById('chat-mensajes');

    this.mensajesSubscription = this.charServicio.recibirMensajes().subscribe(msm => {
      this.mensajes.push(msm);
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 80);
    });
  }

  ngOnDestroy() {
    this.mensajesSubscription.unsubscribe(); // me desuscribo del observable
  }

  enviar() {
    if (this.texto !== '') {
      this.charServicio.enviarMensaje(this.texto);
    }
    this.texto = '';
  }
}
