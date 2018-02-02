import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'pagar',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'home',
    loadChildren: './homepage/home.module#HomePgModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ 
  useHash: false
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
