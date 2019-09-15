import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public data: any = new BehaviorSubject({});

  constructor() { }
}
