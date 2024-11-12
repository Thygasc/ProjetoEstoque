import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroEstoquePage } from './cadastro-estoque.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroEstoquePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroEstoquePageRoutingModule {}
