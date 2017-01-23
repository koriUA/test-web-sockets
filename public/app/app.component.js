import Rx from 'rxjs/Rx';
import {Component, ChangeDetectorRef} from '@angular/core';
import {WebSocketService} from 'app/services/web-socket.service.js'

@Component({
  selector: 'my-app',
  templateUrl: '/app/app.html',
  styleUrls: ['app/app.css'],
})
export class AppComponent {

	private ws: Rx.Subject<MessageEvent>;
	public messages = [];

	constructor(
		public webSocketService: WebSocketService,
		public changeDetectorRef: ChangeDetectorRef
		){
		this.ws = this.webSocketService.connect('ws://node.western.pp.ua/echo/');
		this.ws.subscribe( data => {
			this.messages.push(event.data);
			this.changeDetectorRef.detectChanges();	//fixed bug for Edge; TODO investigate for removing it;
		})
	}

	send(input: HTMLInputElement): void {
		if (!input.value){
			return;
		}
		this.ws.next(input.value);
		input.value = '';
	}

}