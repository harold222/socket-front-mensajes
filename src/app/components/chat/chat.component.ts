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
  public contador: number;

  constructor(public charServicio: ChatService) {
    this.contador = 0;
  }

  ngOnInit() {
    this.elemento = document.getElementById('chat-mensajes');

    this.mensajesSubscription = this.charServicio.recibirMensajes().subscribe(msm => {
      this.mensajes.push(msm);

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
        let a = JSON.parse(localStorage.getItem('usuario_socket'));
        const liMensajeEntrante = document.querySelectorAll('#li-mensajes');

        if (msm['de'] === a['nombre']) {
          liMensajeEntrante[liMensajeEntrante.length-1].classList.add('justify-content-end');
          this.contador++;
        }
      }, 40);
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
