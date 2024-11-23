import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarEstoquesPage } from './listar-estoques.page';

const routes: Routes = [
  {
    path: '',
    component: ListarEstoquesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarEstoquesPageRoutingModule {}
