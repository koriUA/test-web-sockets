import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}    from '@angular/forms';
import {AppComponent}   from './app.component';
import {WebSocketService} from 'app/services/web-socket.service.js'

@NgModule({
	imports: [BrowserModule, FormsModule],
	declarations: [
		AppComponent
	],
	providers: [
		WebSocketService
	],
	bootstrap: [AppComponent]
})
export class AppModule {}