import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.page.html',
  styleUrls: ['./listar-produtos.page.scss'],
})
export class ListarProdutosPage implements OnInit {
  produtos: any[] = [];
  usuario:string | null = '';
  alertOptions: any;


  constructor(private apiService:ApiService,private router:Router,private alertController: AlertController) { }

  ngOnInit() {
    this.getProdutos();  
    this.getUsuario();

  }

  getUsuario (){
    this.usuario = localStorage.getItem('nome');
  }

  AddProduto(){
    this.router.navigate(['/cadastro-produto']);
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

  editItem(index: string) {
    console.log('Edit item', index);
    
    this.router.navigate([`editar-produto/${index}`]);
  }




  deleteItem(index: string) {
    this.apiService.delProduto(index).subscribe(
      (response:any) => { 
      console.log('Item excluído com sucesso', response);
      // Recarregar os itens após a exclusão
      this.getProdutos();
    }, (erro) => {
       console.error('Erro ao excluir item', erro);
      }
    );
}


async presentAlertConfirm(itemId: string) {
  const alert = await this.alertController.create({
     header: 'Confirmar Exclusão', 
     message: 'Você tem certeza que deseja excluir este item?', 
     buttons: [{
       text: 'Cancelar', 
       role: 'cancel', 
       cssClass: 'secondary', 
       handler: (blah) => {
         console.log('Exclusão cancelada'); }
         }, { 
          text: 'Excluir', 
          handler: () => {
             this.deleteItem(itemId);
            }
          }
    ]
  }); await alert.present();
}


}
