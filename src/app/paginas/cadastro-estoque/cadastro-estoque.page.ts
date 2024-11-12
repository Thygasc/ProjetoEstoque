import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cadastro-estoque',
  templateUrl: './cadastro-estoque.page.html',
  styleUrls: ['./cadastro-estoque.page.scss'],
})
export class CadastroEstoquePage implements OnInit {
  CadastroEstoqueForm:FormGroup

  constructor(private formBuilder:FormBuilder,private apiService:ApiService) {
    this.CadastroEstoqueForm=this.formBuilder.group({
    descricao:['',[Validators.required]]
      });
  }

  onSubmit(){
    if (this.CadastroEstoqueForm.valid){
      const descricao = this.CadastroEstoqueForm.get('descricao')?.value;

      this.apiService.validaEstoque(descricao)
    }
  }


  ngOnInit() {
  }

}
