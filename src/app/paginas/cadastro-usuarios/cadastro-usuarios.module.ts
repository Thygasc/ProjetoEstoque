import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroUsuariosPageRoutingModule } from './cadastro-usuarios-routing.module';

import { CadastroUsuariosPage } from './cadastro-usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CadastroUsuariosPageRoutingModule
  ],
  declarations: [CadastroUsuariosPage]
})
export class CadastroUsuariosPageModule {}
