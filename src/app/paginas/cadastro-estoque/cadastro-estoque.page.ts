import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { response } from 'express';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cadastro-estoque',
  templateUrl: './cadastro-estoque.page.html',
  styleUrls: ['./cadastro-estoque.page.scss'],
})
export class CadastroEstoquePage implements OnInit {
  CadastroEstoqueForm:FormGroup;
  estoques: any[] = [];
  usuario:string | null = '';



  constructor(private formBuilder:FormBuilder,private apiService:ApiService) {
    this.CadastroEstoqueForm=this.formBuilder.group({
    descricao:['',[Validators.required]]
      });
  }

  onSubmit(){
    if (this.CadastroEstoqueForm.valid){
      const descricao = this.CadastroEstoqueForm.get('descricao')?.value;      
      this.apiService.registerEstoque(descricao).subscribe(
        (response) =>{
          console.log(response,'reposta no submit');
          alert("Estoque cadastrado com sucesso");
        },
        (error) =>{
          switch (error.status){
            case 403:
              alert("Usuario ja possui um estoque com esta descrição");
          }
          console.error("Erro ao cadastrar o estoque",error);
        }
      );
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
