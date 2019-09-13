import { Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'chat-bot';
  public message: any;
  public subject = webSocket('wss://echo.websocket.org');

  constructor() { }

  ngOnInit() {

  }
  onSendHit() {
    this.subject.next(this.message);
    console.log('send=======', this.message);
    this.subject.subscribe((data: any) => {
      console.log('incoming =====', data);
    });

  }

}
