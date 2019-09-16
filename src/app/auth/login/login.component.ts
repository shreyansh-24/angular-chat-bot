import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public name: any;
  public password: any;

  constructor(
    private router: Router,
    private service: WebsocketService
  ) { }

  ngOnInit() {
  }
  login() {
    if (!this.name || !this.password) {
      alert('Please enter both Username and Password to Login');
    } else {
      localStorage.setItem('name', this.name);
      this.service.data.next(this.name);
      this.router.navigate(['/home']);

    }
  }

}
