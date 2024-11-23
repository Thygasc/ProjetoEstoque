import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarEstoquesPageRoutingModule } from './listar-estoques-routing.module';

import { ListarEstoquesPage } from './listar-estoques.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarEstoquesPageRoutingModule
  ],
  declarations: [ListarEstoquesPage]
})
export class ListarEstoquesPageModule {}
