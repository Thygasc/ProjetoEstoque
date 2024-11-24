import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Usuario } from 'src/app/usuario';

@Component({
  selector: 'app-editar-estoque',
  templateUrl: './editar-estoque.page.html',
  styleUrls: ['./editar-estoque.page.scss'],
})
export class EditarEstoquePage implements OnInit {
  EditarEstoqueForm:FormGroup;
  user:string | null = '';
  usuarios: Usuario[] = [];
  id = this.route.snapshot.paramMap.get('id');

  
  ngOnInit() {
    this.getAcessos(); 

  }


  constructor(private formBuilder:FormBuilder,private apiService:ApiService,private route:ActivatedRoute,private alertController: AlertController,private router:Router) {
    this.EditarEstoqueForm=this.formBuilder.group({
    descricao:['',[Validators.required]]
      });
  }

  AdicionarProduto(){
    this.router.navigate(['/cadastro-produto']);
  }

  onSubmit(){
    if (this.EditarEstoqueForm.valid){
      const id = this.route.snapshot.paramMap.get('id');
      const descricao = this.EditarEstoqueForm.get('descricao')?.value;  
      
      if (id && descricao){
        this.apiService.atualizarEstoque(id,descricao).subscribe(
          (response:any) =>{
            console.log(response,'reposta no submit');
            alert("Estoque atualizado com sucesso");
            this.router.navigate(['/listar-estoques']);
          },
          (error) =>{
            switch (error.status){
              case 403:
                alert("Usuario ja possui um estoque com esta descrição");
            }
            console.error("Erro ao atualizar o estoque",error);
          }
        );
      }

    }
  }
  
  async presentAlertConfirm(filId: string) {
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
               this.deleteAcesso(filId);
              }
            }
      ]
    }); await alert.present();
  }


  async AdicionarNovoAcesso(){
    const alert = await this.alertController.create({
      header: 'Adicionar Usuário',
      inputs: [{
        name: 'usuario',
        type: 'text',
        placeholder: 'Nome do Usuário' 
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirmação cancelada'); 
        } }, { 
          text: 'Adicionar', 
          handler: (data) => { 
            this.addUsuario(data.usuario); } }
      ]
    });
    await alert.present();
  }

  addUsuario(usuario:string){
    this.apiService.registerAcessoEstoque(usuario).subscribe(
      (resultad:any) =>{
        console.log("Acesso liberado para o usuario");
        alert("Acesso Liberado");
        this.getAcessos();
      },
      (erro) =>{
        console.log("Erro ao liberar o acesso",erro);
        alert("Erro ao liberar o acesso");
      }
    );
  }


  deleteAcesso(index:string){
    if (index){
      this.apiService.delAcesso(index).subscribe(
        (result:any) =>{
          console.log("Acesso removido",result);
          alert("Acesso removido com Sucesso");
          this.getAcessos();
        },
        (error) =>{
          console.error("Erro ao remover o acesso",error);
          alert("ERRO AO REMOVER O ACESSO");
        }
      );
    }
  }



  getAcessos(){
    let est_id = this.id;
    if (est_id){
      this.apiService.getFiliadosEstoque(est_id).subscribe(
        (data) => {
          this.usuarios = data.result.map((user: Usuario) =>({
            ...user,
            fil_inserted_at:this.formatDate(user.fil_inserted_at)
          }));
          console.log("data",this.usuarios);
        },
        (error)=>{
          console.error("Erro ao buscar estoques",error);
        }
      );
    }
  }


  formatDate(dateString: string): string { 
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }

  getUsuario (){
    this.user = localStorage.getItem('nome');
  }

}
