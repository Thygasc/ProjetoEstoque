import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.page.html',
  styleUrls: ['./tela-inicial.page.scss'],
})
export class TelaInicialPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  items = [
    { name: 'Arroz Bernardo', weight: '1kg' },
    { name: 'Arroz Bernardo', weight: '1kg' },
    { name: 'Arroz Bernardo', weight: '1kg' },
    { name: 'Arroz Bernardo', weight: '1kg' },
    { name: 'Arroz Bernardo', weight: '1kg' },
    { name: 'Arroz Bernardo', weight: '1kg' },
    { name: 'Arroz Bernardo', weight: '1kg' }
  ];

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
