import { Component, ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'my-app',
  templateUrl: '/app/app.html',
  styleUrls: ['app/app.css'],
})
export class AppComponent {

	public messages = [];

	constructor(public changeDetectorRef: ChangeDetectorRef){
		//this.ws = new WebSocket('ws://localhost:3000/echo/');
		this.ws = new WebSocket('ws://node.western.pp.ua/echo/');
		var that = this;
		this.ws.onmessage = function(event) {
			console.log("message", event.data);
			that.messages.push(event.data);
			that.changeDetectorRef.detectChanges();	//fixed bug for Edge; TODO investigate for removing it;
		};
		this.ws.onopen = function(event){
			console.log("websocket connection open");
		};
		this.ws.onerror = function(error){
			console.log('WebSocket Error ', error);
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