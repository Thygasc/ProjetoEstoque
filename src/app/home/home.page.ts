import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit{
  produtos: any[] = [];
  
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getProdutos();    
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

  items = this.apiService.getProdutosCadastro();

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


