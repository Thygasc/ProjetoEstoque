import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  subMenuOpen = false;

  alterarSubMenu(){
    this.subMenuOpen = !this.subMenuOpen;

}
  constructor(private router:Router) {}
  
  GoHome(){
    this.router.navigate(['/home']);
  }

  CriarEstoque(){
    this.router.navigate(['/cadastro-estoque']);
  }

  CriarProduto(){
    this.router.navigate(['/cadastro-produto']);
  }
  
  ListarProdutos(){
    this.router.navigate(['/listar-produtos']);
  }

  ListarEstoques(){
    this.router.navigate(['/listar-estoques']);
  }

}
