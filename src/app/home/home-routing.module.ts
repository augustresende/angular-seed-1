import { BoletosComponent } from './containers/boletos/boletos.component';
import { RecargaComponent } from './containers/recarga/recarga.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'boleto', pathMatch: 'full'},
  {path: 'boleto',data: { page: 'one' }, component: BoletosComponent},
  {path: 'recarga',data: { page: 'two' }, component: RecargaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
