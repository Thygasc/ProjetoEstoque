import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inicial',
    loadChildren: () => import('./inicial/inicial.module').then( m => m.InicialPageModule)
  },
  {
    path: 'cadastro-usuarios',
    loadChildren: () => import('./paginas/cadastro-usuarios/cadastro-usuarios.module').then( m => m.CadastroUsuariosPageModule)
  },
  {
    path: 'cadastro-estoque',
    loadChildren: () => import('./paginas/cadastro-estoque/cadastro-estoque.module').then( m => m.CadastroEstoquePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cadastro-produto',
    loadChildren: () => import('./paginas/cadastro-produto/cadastro-produto.module').then( m => m.CadastroProdutoPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
