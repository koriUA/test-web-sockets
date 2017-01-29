import {Component, ChangeDetectorRef} from '@angular/core';
import {WebSocketService} from 'app/services/web-socket.service.js';

 
@Component({
	moduleId: 'app/pages/login/login',
	selector: 'login',
	templateUrl: 'login.html',
	styleUrls: ['login.css'],
})
export class Login {

	private ws: Rx.Subject<MessageEvent>;
	public messages = [];

	constructor(
		public webSocketService: WebSocketService,
		public changeDetectorRef: ChangeDetectorRef
		) {
			this.ws = this.webSocketService.connect('ws://' + location.hostname + (location.port?':'+location.port:'') + '/echo/?access_token=' + localStorage.access_token);
			this.ws.subscribe( messageEvent => {
				var data = JSON.parse(messageEvent.data);
				console.log(data);
				if (data.new_access_token){
					localStorage.access_token = data.new_access_token;
				}
				if (data.connections){
					this.connections = data.connections;
				}
				if (data.message){
					this.messages.push(data.message);
				}
				this.changeDetectorRef.detectChanges();	//fixed bug for Edge; TODO investigate for removing it;
		});
	}
	
	send(input: HTMLInputElement): void {
		if (!input.value){
			return;
		}
		this.ws.next(input.value);
		input.value = '';
	}
}
