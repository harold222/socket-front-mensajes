import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketsService } from '../../services/web-sockets.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  nombre = '';

  constructor(public socketServicio: WebSocketsService, private router: Router) { }

  ngOnInit() {
  }

  ingresar() {
    if (this.nombre.trim().length !== 0) {
      this.socketServicio.loginSocket(this.nombre).then(() => {
        this.router.navigateByUrl('/mensajes');
      });
    }
    this.nombre = '';
  }

}
