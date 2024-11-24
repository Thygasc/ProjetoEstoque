import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.page.html',
  styleUrls: ['./editar-produto.page.scss'],
})
export class EditarProdutoPage implements OnInit {
  EditarProductForm:FormGroup;
  usuario:string|null = '';
  prod:any = {};


  constructor(private formBuilder: FormBuilder,private apiService:ApiService, private route: Router,private router:ActivatedRoute) {
  this.EditarProductForm = this.formBuilder.group({
  produto: [''],
  quantidade:[''],
  minimo:[''],
  maximo:[''],
});
}

ngOnInit() {
  this.getUsuario();
  const id = this.router.snapshot.paramMap.get('id');
}

AdicionarProduto(){
  this.route.navigate(['/cadastro-produto']);
}

onSubmit(){
  const id = this.router.snapshot.paramMap.get('id');

  if(this.EditarProductForm.valid && id){
    this.apiService.atualizarProduto(id,this.EditarProductForm.value).subscribe(
      (response) => {
        console.log(response,"Resposta no Submit");
        alert("Produto Atualizado com Sucesso");
        this.route.navigate(['/listar-produtos']);
      },
      (error) =>{
        console.error("Erro ao editar o produto:", error);
        alert("Erro ao editar o produto");
      }
    );
  
  }
}

getUsuario (){
  this.usuario = localStorage.getItem('nome');
}

}