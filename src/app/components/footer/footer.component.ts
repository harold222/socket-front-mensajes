import { Component} from '@angular/core';
import { WebSocketsService } from '../../services/web-sockets.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent{
  constructor(public socketServicio: WebSocketsService) {
  }

}
