import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit{
  produtos: any[] = [];
  estoques: any[] = [];
  usuario:string | null = '';
  constructor(private apiService: ApiService,private route:Router) {}

  ngOnInit() {
    this.getEstoques(); 
    this.getProdutos();   
    this.getUsuario();
  }

  getUsuario (){
    this.usuario = localStorage.getItem('nome');
  }
  getProdutos(){
    this.apiService.getProdutosCadastro().subscribe(
      (data:any[]) =>{
    this.produtos = data;
    },
    (error)=>{
      console.error("Erro ao buscar produtos",error);

    }
  );
  }

  getEstoques(){
    this.apiService.getEstoquesCadastrados().subscribe(
      (estoq:any[]) => {
        this.estoques = estoq;
        console.log("data",estoq)
      },
      (error)=>{
        console.error("Erro ao buscar estoques",error);
      }
    )
  }

  editItem(index: number) {
    console.log('Edit item', index);
    // Lógica para editar o item
  }

  deleteItem(index: number) {
    console.log('Delete item', index);
    // Lógica para deletar o item
  }

  loadMore() {
    console.log('Load more items');
    // Lógica para carregar mais itens
  }

}


// @Component({
//   selector: 'app-item-list',
//   templateUrl: './item-list.component.html',
//   styleUrls: ['./item-list.component.scss'],
// })
// export class ItemListComponent {

//   items = [
//     { name: 'Arroz Bernardo', weight: '1kg' },
//     { name: 'Arroz Bernardo', weight: '1kg' },
//     { name: 'Arroz Bernardo', weight: '1kg' }
//   ];

//   editItem(index: number) {
//     console.log('Edit item', index);
//     // Lógica para editar o item
//   }

//   deleteItem(index: number) {
//     console.log('Delete item', index);
//     // Lógica para deletar o item
//   }

//   loadMore() {
//     console.log('Load more items');
//     // Lógica para carregar mais itens
//   }
// }


