import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root',
})
export class ApiService {
    private  baseUrl = 'http://localhost:3000'; // URL DO NODEJS SERVER criado no server.js

    constructor(private http: HttpClient){}

    // Função para cadastrar um novo usuario
    registerUser(userData:any):Observable<any>{
        return this.http.post(`${this.baseUrl}/cadastrarUsuario`,userData);
    }
}



