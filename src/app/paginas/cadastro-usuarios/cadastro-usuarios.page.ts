import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cadastro-usuarios',
  templateUrl: './cadastro-usuarios.page.html',
  styleUrls: ['./cadastro-usuarios.page.scss'],
})
export class CadastroUsuariosPage implements OnInit {
  registrationForm:FormGroup

  constructor( private formBuilder: FormBuilder,private apiService:ApiService) {
    this.registrationForm=this.formBuilder.group({
      login:['',[Validators.required]],
      senha:['',[Validators.required,Validators.minLength(6)]],
      nome:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
          });
  }

  onSubmit(){
    if (this.registrationForm.valid){

      const login = this.registrationForm.get('login')?.value;
   
      this.apiService.validaUsuario(login).subscribe(
        (response) =>{
          console.log('resposta da api:',response);
        },
        (error) =>{
          console.error('erro ao consultar o usuario:',error);
        });

      this.apiService.registerUser(this.registrationForm.value).subscribe(
        (response) =>{
          console.log("Usuário cadastrado com Sucesso:",response);
        },
        (error) =>{
          console.error("Erro ao cadastrar usuario:",error);
        }
      );
    } else {
      console.log('formuilario invalido');
    };
  }
  ngOnInit() {
  }

}
