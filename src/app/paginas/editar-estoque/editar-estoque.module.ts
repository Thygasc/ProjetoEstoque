import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarEstoquePageRoutingModule } from './editar-estoque-routing.module';

import { EditarEstoquePage } from './editar-estoque.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditarEstoquePageRoutingModule
  ],
  declarations: [EditarEstoquePage]
})
export class EditarEstoquePageModule {}
