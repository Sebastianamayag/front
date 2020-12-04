import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from '../app/components/landing/landing.component';
import {LoginComponent} from '../app/components/login/login.component';
import { RegistroComponent } from '../app/components/registro/registro.component';
import {ChatComponent} from '../app/components/chat/chat.component';
const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    data: { title: 'Login' }
  },
  {
    path: 'usuario/login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'usuario/registro',
    component: RegistroComponent,
    data: { title: 'Registro' }
  },
  {
    path: 'chat/:id',
    component: ChatComponent,
    data: { title: 'Registro' }
  },{
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
