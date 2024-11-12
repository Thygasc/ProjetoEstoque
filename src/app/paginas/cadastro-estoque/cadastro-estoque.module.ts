import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroEstoquePageRoutingModule } from './cadastro-estoque-routing.module';

import { CadastroEstoquePage } from './cadastro-estoque.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroEstoquePageRoutingModule
  ],
  declarations: [CadastroEstoquePage]
})
export class CadastroEstoquePageModule {}
