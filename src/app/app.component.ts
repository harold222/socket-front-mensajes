import { Component, OnInit } from '@angular/core';
import { WebSocketsService } from './services/web-sockets.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(public socketServicio: WebSocketsService) {
  }

  ngOnInit() {
  }

}
