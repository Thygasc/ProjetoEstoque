import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.page.html',
  styleUrls: ['./editar-produto.page.scss'],
})
export class EditarProdutoPage implements OnInit {
  EditarProductForm:FormGroup;
  usuario:string|null = '';

  constructor(private formBuilder: FormBuilder,private apiService:ApiService, private route: Router) {
  this.EditarProductForm = this.formBuilder.group({
  produto: ['',[Validators.required]],
  quantidade:['',Validators.required],
  minimo:[''],
  maximo:[''],
});
}

ngOnInit() {
  this.getUsuario();
}


onSubmit(){
  if(this.EditarProductForm.valid){
  
    this.apiService.registerProduto(this.EditarProductForm.value).subscribe(
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
}

}