import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
editarUsuario:FormGroup;
senhasIguais:boolean = false;

  constructor(private formBuilder:FormBuilder,private apiService:ApiService,private route:ActivatedRoute,private alertController: AlertController, private router:Router) { 
    this.editarUsuario=this.formBuilder.group({
      login:[''],
      senha:['',[Validators.minLength(6)]],
      nome:[''],
      email:['',[Validators.email]],
      senha2: ['',[Validators.minLength(6)]],      
    });
  }
  

  ngOnInit() {
  }

  verificarSenhas(){
    const senha1 = this.editarUsuario.get('senha')?.value;
    const senha2 = this.editarUsuario.get('senha2')?.value;
    this.senhasIguais = senha1 === senha2;
  }


  onSubmit(){
    if (this.editarUsuario.value){
            this.apiService.atualizarUsuario(this.editarUsuario.value).subscribe(
              (response) =>{
                console.log("Alterado informações com Sucesso:",response);
                alert('Alterado informações com Sucesso');
                this.router.navigate(['/inicial']);
              },
              (error) =>{
                console.error("Erro ao cadastrar usuario:",this.editarUsuario.value);
              }
            );
          }
    else {
      console.log(this.editarUsuario.value);
    }
        
  }

}
