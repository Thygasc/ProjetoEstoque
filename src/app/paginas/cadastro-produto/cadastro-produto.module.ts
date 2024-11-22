import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroProdutoPageRoutingModule } from './cadastro-produto-routing.module';

import { CadastroProdutoPage } from './cadastro-produto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CadastroProdutoPageRoutingModule
  ],
  declarations: [CadastroProdutoPage]
})
export class CadastroProdutoPageModule {}
