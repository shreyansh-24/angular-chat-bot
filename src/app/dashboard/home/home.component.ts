import { Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { addPlayer } from '@angular/core/src/render3/players';
import { Router, NavigationStart } from '@angular/router';
import { WebsocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked {
  @ViewChild('child') child;
  @ViewChild('main') main;

  public subscription: any;
  public userName: any;
  public browserRefresh: any;


  public incomingMessage: any;
  public message: any;
  public messageStream = [];

  public subject = webSocket('wss://echo.websocket.org');


  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private service: WebsocketService
  ) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.browserRefresh = !router.navigated;
      }
    });
  }

  ngOnInit() {
    this.subscription = this.service.data
      .subscribe((res) => {
        this.userName = res;
      });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.child.nativeElement.scrollTop = this.child.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }




  onSendHit() {
    const li = this.renderer.createElement('div');
    this.renderer.addClass(li, 'krm');
    const text = this.renderer.createText(this.message);
    this.renderer.appendChild(li, text);

    this.renderer.appendChild(this.child.nativeElement, li);

    setTimeout(() => {

      const li2 = this.renderer.createElement('div');
      this.renderer.addClass(li2, 'luky');
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

    this.resetInput();
  }

  logout() {
    this.router.navigate(['/login']);
  }

  resetInput() {
    this.message = null;
  }


}
