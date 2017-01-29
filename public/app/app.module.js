import {NgModule}      from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}    from '@angular/forms';
import {AppComponent}   from './app.component';
import {WebSocketService} from 'app/services/web-socket.service.js'

import {Login} from 'app/pages/login/login';

import {BackgroundSpace} from 'app/components/background-space/background-space';

import {routing} from 'app/routes';

@NgModule({
	imports: [BrowserModule, FormsModule, routing],
	declarations: [
		AppComponent,
		
		Login		
		
		BackgroundSpace,
	],
	providers: [
		WebSocketService,
		{provide: APP_BASE_HREF, useValue : '/' }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}