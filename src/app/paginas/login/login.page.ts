import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {  
  loginForms:FormGroup

  constructor(private formBuilder:FormBuilder,private apiService:ApiService) {
    this.loginForms=this.formBuilder.group([
      login:['',[Validators.required]],
      senha: ['',[Validators.required]],
    ]);
   }

   onSubmit(){
    if(this.loginForms.valid){
      const login = this.loginForms.get('login')?.value;
      const senha = this.loginForms.get('senha')?.value;

      this.apiService.validaUsuario(login,senha).subscribe(
        (response) =>{
          console.log("")
        }
      )
    }
   }

  ngOnInit() {
  }

}
