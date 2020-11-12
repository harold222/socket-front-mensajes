import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  usuariosActivos: Observable<any>;

  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.usuariosActivos = this.chat.getUsuariosActivos();
    this.chat.emitirUsuariosActivos();
  }

}
