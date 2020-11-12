import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebSocketsService {

  public socketStatus = false;
  public usuario: Usuario = null;

  constructor(public socket: Socket, private router: Router) {
    this.cargarStorge();
    this.revisarStatusCliente();
  }

  revisarStatusCliente() { // funcion para revisar si el cliente esta o no conectado al socket
    this.socket.on('connect', () => {
      this.socketStatus = true;
      this.cargarStorge();
    });
    // estan funciones siempre se estaran ejecutando son observables
    this.socket.on('disconnect', () => {
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

  loginSocket(nombre: string) {

    return new Promise((resolve, reject) => {
      this.emit('configurar-usuario', { nombre }, resp => {
        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        resolve();
      });
    });

  }

  logoutSocket() {
    this.usuario = null;
    localStorage.removeItem('usuario_socket');

    const payload = {
      nombre: 'sin-nombre'
    };

    this.emit('configurar-usuario', payload, () => {});
    this.router.navigateByUrl('');
  }

  getUsuario() {
    return this.usuario;
  }

  guardarStorage() { // guardo el usuario en el storage por si se recarga el storage
    localStorage.setItem('usuario_socket', JSON.stringify(this.usuario));
  }

  cargarStorge() {
    if (localStorage.getItem('usuario_socket')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario_socket')); // vuelvo a tener el usuario ya guardado
      this.loginSocket(this.usuario.nombre);
    }
  }

}
