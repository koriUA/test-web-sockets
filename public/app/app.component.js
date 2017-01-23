import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  templateUrl: '/app/app.html',
  styleUrls: ['app/app.css'],
})
export class AppComponent {

	public messages = [];

	constructor(){
		//this.ws = new WebSocket('ws://localhost:3000/echo/');
		this.ws = new WebSocket('ws://node.western.pp.ua/echo/');
		var that = this;
		this.ws.onmessage = function(event) {
			that.messages.push(event.data);
		};
		this.ws.onopen = function(event){
			console.log("websocket connection open");
		};
		this.ws.onerror = function(error){
			console.log("error111", error);
		};
	}

	send(input: HTMLInputElement): void {
		if (!input.value){
			return;
		}
		this.ws.send(input.value);
		input.value = '';
	}

}