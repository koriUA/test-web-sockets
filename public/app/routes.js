import {Routes, RouterModule} from '@angular/router';

import {Login} from 'app/pages/login/login';


const appRoutes: Routes = [
  {path: 'login', component: Login},
  { path: '**',   redirectTo: '/login'}
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);