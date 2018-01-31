import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { BoletosComponent } from './containers/boletos/boletos.component';
import { RecargaComponent } from './containers/recarga/recarga.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';


const COMPONENTS = [
  BoletosComponent,
  RecargaComponent
];

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    HomeRoutingModule,
    SharedModule,
    SweetAlert2Module
  ],
  declarations: [
    ...COMPONENTS
  ]
})
export class HomeModule { }
