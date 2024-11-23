import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-listar-estoques',
  templateUrl: './listar-estoques.page.html',
  styleUrls: ['./listar-estoques.page.scss'],
})
export class ListarEstoquesPage implements OnInit {
  estoques: any[] = [];
  usuario:string | null = '';

  constructor(private apiService:ApiService,private route:Router,private alertController: AlertController) { }

  ngOnInit() {
    this.getEstoques(); 
    this.getUsuario();
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

  editItem(index:string) {
    console.log('Edit item', index);
    this.route.navigate([`/editar-estoque/${index}`]);
  }

  deleteItem(index: string) {
    console.log('Delete item', index);
    this.apiService.delEstoque(index).subscribe(
      (response:any) => { 
      console.log('Item excluído com sucesso', response);
      alert("Estoque Excluido com sucesso")
      // Recarregar os itens após a exclusão
      this.getEstoques();
    }, (erro) => {
       console.error('Erro ao excluir item', erro);
       alert(`
Estoque não excluido.
Verifique se possui acesso ou se existe produtos cadastrados neste estoque`
);
      }
    );
  }


  utilizarEstoque(index:string,nomeEst:string){
    localStorage.setItem('estoque',index);
    localStorage.setItem('est_desc',nomeEst);
    alert(`Agora você está utilizando o estoque ${nomeEst}.`)

  }

  getUsuario (){
    this.usuario = localStorage.getItem('nome');
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
