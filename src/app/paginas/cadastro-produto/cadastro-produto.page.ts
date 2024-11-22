import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  
constructor(private formBuilder: FormBuilder,private apiService:ApiService, private route: Router) { 
this.registrationProductForm = this.formBuilder.group({

});
}
ngOnInit() {
  }


onSubmit(){
  if(this.registrationProductForm.valid){
    const descricao = this.registrationProductForm.get('est_desc')?.value;
  
    this.apiService.registerProduto(this.registrationProductForm.value).subscribe(
      (response) => {
        console.log(response,"Resposta no Submit");
        alert(response);
      },
      (error) =>{
        console.error("Erro ao cadastrar o produto:", this.registrationProductForm.value);
      }
    );
  
  }
}
}
