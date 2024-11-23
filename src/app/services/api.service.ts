import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable } from 'rxjs';

import {jwtDecode} from 'jwt-decode';

@Injectable({
    providedIn:'root',
})
export class ApiService {

    private  baseUrl = 'http://localhost:3000'; // URL DO NODEJS SERVER criado no server.js

    constructor(private http: HttpClient){}

    // Função para cadastrar um novo usuario
    registerUser(userData:any):Observable<any>{
        console.log(userData,'ApiService')
        return this.http.post(`${this.baseUrl}/cadastrarUsuario`,userData);
    }

    // Função para cadastrar um novo estoque
    registerEstoque(userData:any):Observable<any>{
        
        const usu_id = this.getUserIdFromToken();
        return this.http.post(`${this.baseUrl}/cadastraEstoque`,{
            est_desc:userData,
            est_titular:usu_id
        });
    }

    // Função para cadastrar um novo produto
    registerProduto(userData:any):Observable<any>{
        console.log(userData);
        const estoq = localStorage.getItem('estoque');
        return this.http.post(`${this.baseUrl}/CadastroProduto`,{        
            prod_nome:userData.produto,
            prod_qtd:userData.quantidade,
            prod_min:userData.minimo,
            prod_max:userData.maximo,
            prod_estoq:estoq
        });
    }

    // Função para validar se ja existe um usuario com este login
    validaUsuario(dados:string){
        return this.http.get(`${this.baseUrl}/validarUsuarioCadastrados`,{params:{usu_login: dados}});
    };

    //Função para cadastrar um novo estoque
    registraEstoque(dados:string):Observable<any>{
        const usu_id = this.getUserIdFromToken();
        return this.http.post(`${this.baseUrl}/cadastrarEstoque`,{dados,usu_id});
    }

    // Função para validar se o usuario ja possui um estoque com este nome
    validaEstoque(dados:string){
        return this.http.get(`${this.baseUrl}/validarEstoqueCadastrado`)
    }


    // função para validar o login
    validaLogin(usu_login: string,usu_senha:string){
        return this.http.post(`${this.baseUrl}/login`,{usu_login,usu_senha});
    }

    // Função para pegar o ID do usuario logado
    getUserIdFromToken(): string | null{
        const token = localStorage.getItem('token');
            if(token){
                console.log('token',token)
                const decodedToken: any = jwtDecode(token);
                console.log('decoded token',decodedToken)
                return decodedToken.id;
            }
            return null;
        }
    
    //Função para consultar os produtos cadastrados
    getProdutosCadastro(): Observable<any>{
        const estoq = localStorage.getItem('estoque');
        const usu_id = this.getUserIdFromToken();
        let params = new HttpParams ()
        if (estoq){
            params = params.set('id_estoq',estoq);
        }
        if (usu_id){
            params= params.set('id_usuario',usu_id);
        }
        console.log('Parâmetros:', params.toString()); // Adicionando para verificar os parâmetros como string
        return this.http.get(`${this.baseUrl}/Produtos`,{params});
        
    }


    //Função para consultar os estoques cadastrados
    getEstoquesCadastrados():Observable<any>{
        const usu_id = this.getUserIdFromToken();
        console.log('usu_id',usu_id)
        let params = new HttpParams()
        if(usu_id){
            params=params.set('id_usuario',usu_id);
        }
        console.log('Parametros estoque:',params.toString());
        return this.http.get(`${this.baseUrl}/Estoques`,{params});
    }

    delProduto(prod_id:string):Observable<any>{
        return this.http.delete(`${this.baseUrl}/ExcluirProduto/${prod_id}`);
    }

    delEstoque(prod_id:string):Observable<any>{
        return this.http.delete(`${this.baseUrl}/ExcluirEstoque/${prod_id}`);
    }

    atualizarEstoque(id: string, est_desc: string): Observable<any> {
         return this.http.patch(`${this.baseUrl}/AtualizarEstoque/${id}`,{ est_desc });

    }
}
