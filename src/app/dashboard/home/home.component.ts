import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { addPlayer } from '@angular/core/src/render3/players';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // @ViewChild('parent') parent;
  @ViewChild('child') child;


  public incomingMessage: any;
  public message: any;
  public messageStream = [];

  public subject = webSocket('wss://echo.websocket.org');

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) { }

  ngOnInit() {
  }

  onSendHit() {
    const li = this.renderer.createElement('div');
    const text = this.renderer.createText(this.message);
    this.renderer.appendChild(li, text);
    this.renderer.appendChild(this.child.nativeElement, li);

    setTimeout(() => {

      const li2 = this.renderer.createElement('div');
      this.renderer.addClass(li2, 'wild');
      const text2 = this.renderer.createText(this.incomingMessage);
      this.renderer.appendChild(li2, text2);
      this.renderer.appendChild(this.child.nativeElement, li2);
    }, 2000);

    this.subject.next(this.message);
    console.log('send=======', this.message);
    this.subject.subscribe((data: any) => {
      this.incomingMessage = data;
      console.log('incoming =====', data);
      this.subject.complete();
    });


  }


}
