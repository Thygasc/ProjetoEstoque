import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuarios',
  templateUrl: './cadastro-usuarios.page.html',
  styleUrls: ['./cadastro-usuarios.page.scss'],
})
export class CadastroUsuariosPage implements OnInit {
  registrationForm:FormGroup;
  senhasIguais:boolean = false;

  constructor( private formBuilder: FormBuilder,private apiService:ApiService, private route: Router) {
    this.registrationForm=this.formBuilder.group({
      login:['',[Validators.required]],
      senha:['',[Validators.required,Validators.minLength(6)]],
      nome:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      senha2: ['',[Validators.required,Validators.minLength(6)]],      
    });
  }


  Login(){
    this.route.navigate(['/login']);
  }

  onSubmit(){
    if (this.registrationForm.valid){

      const login = this.registrationForm.get('login')?.value;
   
      this.apiService.validaUsuario(login).subscribe(
        (response:any) =>{
          if (response.bool){
            console.log('resposta da api:',response);
            alert("Ja possui um usuario com este login!");
          }
          else if(!response.bool){
            this.apiService.registerUser(this.registrationForm.value).subscribe(
              (response) =>{
                console.log("Usuário cadastrado com Sucesso:",response);
                alert('Usuario cadastrado com Sucesso');
                this.route.navigate(['/login']);
              },
              (error) =>{
                console.error("Erro ao cadastrar usuario:",this.registrationForm.value);
              }
            );
          }
          },
        (error) =>{
          console.error('erro ao consultar o usuario:',error);
        });

    } else {
      console.log('formuilario invalido');
    };
  }
  ngOnInit() {
  }

  verificarSenhas(){
    const senha1 = this.registrationForm.get('senha')?.value;
    const senha2 = this.registrationForm.get('senha2')?.value;
    this.senhasIguais = senha1 === senha2;
  }
}
