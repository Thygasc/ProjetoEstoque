import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {  
  loginForms:FormGroup

  constructor(private formBuilder:FormBuilder,private apiService:ApiService, private router:Router) {
    this.loginForms=this.formBuilder.group({
      login:['',[Validators.required]],
      senha: ['',[Validators.required]],
    });
   }

   forgotPassword(){
    this.router.navigate(['/cadastro-usuarios']);
   }

   onSubmit(){
    if(this.loginForms.valid){
      const login = this.loginForms.get('login')?.value;
      const senha = this.loginForms.get('senha')?.value;

      this.apiService.validaLogin(login,senha).subscribe(
        (response:any) =>{
          console.log(response);
          if(response.token) {
            localStorage.setItem('token',response.token);
            localStorage.setItem('nome',response.name);
            localStorage.setItem('estoque',response.est_padrao);
            alert('Login com Sucesso');
            this.router.navigate(['/home']);

          }
          else {
            alert("Credenciais Invalidas");
          }
        },
        (error) =>{
          console.error("Erro ao fazer login",error);
          alert("Erro ao fazer login");
        }
      );
    }
   }

  ngOnInit() {
  }

}
