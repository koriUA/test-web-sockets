import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  templateUrl: '/app/app.html',
  styleUrls: ['app/app.css'],
})
export class AppComponent {

	public messages = [];

	constructor(){
		this.ws = new WebSocket('ws://localhost:3001/users/echo/');
		this.ws.addEventListener('error', function (m) { console.log("error"); });
		this.ws.addEventListener('open', function (m) { console.log("websocket connection open"); });
		this.ws.addEventListener('message', (m) => {
			this.messages.push(m.data); 
		});
	}

	send(input: HTMLInputElement): void {
		if (!input.value){
			return;
		}
		this.ws.send(input.value);
		input.value = '';
	}

}