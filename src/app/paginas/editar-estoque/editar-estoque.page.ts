import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-editar-estoque',
  templateUrl: './editar-estoque.page.html',
  styleUrls: ['./editar-estoque.page.scss'],
})
export class EditarEstoquePage implements OnInit {
  EditarEstoqueForm:FormGroup;
  estoques: any[] = [];
  usuario:string | null = '';



  constructor(private formBuilder:FormBuilder,private apiService:ApiService,private route:ActivatedRoute) {
    this.EditarEstoqueForm=this.formBuilder.group({
    descricao:['',[Validators.required]]
      });
  }

  onSubmit(){
    if (this.EditarEstoqueForm.valid){
      const id = this.route.snapshot.paramMap.get('id');
      const descricao = this.EditarEstoqueForm.get('descricao')?.value;  
      
      if ((id) && (descricao)){
        this.apiService.atualizarEstoque(id,descricao).subscribe(
          (response:any) =>{
            console.log(response,'reposta no submit');
            alert("Estoque atualizado com sucesso");
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


  ngOnInit() {
    this.getEstoques(); 

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

  getUsuario (){
    this.usuario = localStorage.getItem('nome');
  }

}
