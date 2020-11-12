import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WebSocketsService } from '../services/web-sockets.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuardService implements CanActivate{

  constructor(private socketServicio: WebSocketsService, private router: Router) { }

  canActivate() {
    if (this.socketServicio.getUsuario()) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
