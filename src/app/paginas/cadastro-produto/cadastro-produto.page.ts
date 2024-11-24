import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.page.html',
  styleUrls: ['./cadastro-produto.page.scss'],
})
export class CadastroProdutoPage implements OnInit {
  registrationProductForm:FormGroup;
  usuario:string | null = '';

  
constructor(private formBuilder: FormBuilder,private apiService:ApiService, private route: Router) { 
this.registrationProductForm = this.formBuilder.group({
  produto: ['',[Validators.required]],
  quantidade:['',Validators.required],
  minimo:[''],
  maximo:[''],
});
}
ngOnInit() {
  this.getUsuario();
  }

  AdicionarProduto(){
    this.route.navigate(['/cadastro-produto']);
  }

onSubmit(){
  if(this.registrationProductForm.valid){
  
    this.apiService.registerProduto(this.registrationProductForm.value).subscribe(
      (response) => {
        console.log(response,"Resposta no Submit");
        alert("Novo produto cadastrado com Sucesso");
      },
      (error) =>{
        console.error("Erro ao cadastrar o produto:", error);
        alert("Erro ao cadastrar o novo produto");
      }
    );
  
  }
}

getUsuario (){
  this.usuario = localStorage.getItem('nome');
  console.log(this.usuario,'usuario teste');
}

}
