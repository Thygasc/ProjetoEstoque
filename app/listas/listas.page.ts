import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.page.html',
  styleUrls: ['./listas.page.scss'],
})

export class ListasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  itemList = [
    { name: 'Arroz Tio João - 1kg', quantity: 1, selected: false },
    { name: 'Molho de Tomate (Elefante)', quantity: 1, selected: false },
    { name: 'Carne Bovina (Acem Moído)', quantity: 1, selected: false },
    { name: 'Carne de Frango (Asinha)', quantity: 1, selected: false },
   ];

  increment(index: number) {
    this.itemList[index].quantity++;
  }

  decrement(index: number) {
    if (this.itemList[index].quantity > 1) {
      this.itemList[index].quantity--;
    }
  }

  removeItem(index: number) {
    this.itemList.splice(index, 1);
  }

  clearList() {
    this.itemList = [];
  }

  saveStock() {
    const selectedItems = this.itemList.filter(item => item.selected);
    console.log('Items salvos no estoque:', selectedItems);
    // Aqui você pode integrar com uma API ou serviço de armazenamento
  }
}

