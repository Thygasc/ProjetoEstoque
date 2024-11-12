const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const { log } = require('@angular-devkit/build-angular/src/builders/ssr-dev-server');
const jsonwebtoken = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const CHAVE_SECRETA = '4815162342007';


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'easystock'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar no banco de dados', err);
    }
    console.log('Conectado ao MySQL');
});

// Função para cadastrar um usuario
app.post('/cadastrarUsuario', (req, res) => {
    const { login, senha, nome, email } = req.body;
    const query = 'INSERT INTO usuario (usu_login,usu_senha,usu_nome,usu_email,usu_data_criado) VALUES (?,?,?,?,CURDATE())';
    db.query(query, [login, senha, nome, email], err => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            res.status(500).json({ message: 'Erro ao inserir dados' });
        } else {
            res.status(200).json({ message: 'Usuario cadastrado com Sucesso' });
        }
    });
});

// Função que valida se ja existe um usuario cadastrado com este login
app.get('/validarUsuarioCadastrados', (req, res) => {
    const { usu_login } = req.query; // Extrair o login da consulta

    db.query('Select * from usuario where usu_login = ?', [usu_login], (err, results) => {
        if (err) {
            console.error('Erro ao consultar dados:', (err));
            res.status(500).json({ message: 'Erro ao consultar os dados no banco' });
        }

        if (results.length > 0) {
            res.status(200).json({ message: 'Usuario ja cadastrado', bool: true });
        } else {
            res.status(200).json({ message: 'Usuario não cadastrado', bool: false });
        }
    });
});



// Função que valida o login no banco
app.post('/login', (req, res) => {
    const { usu_login, usu_senha } = req.body;

    db.query('SELECT usu_login from usuario where usu_login = ? and usu_senha = ?', [usu_login, usu_senha], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Erro ao verificar o login' });
        }
        else if (results.length > 0) {
            const token = jwt.sign({ id: results[0].usu_id }, CHAVE_SECRETA, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login com sucesso', token });
        } else {
            res.status(401).json({ message: 'Credenciais inválidas' });
        }
    });
});

// Função para cadastrar o estoque
app.post('/cadastraEstoque', (req, res) => {
    const { est_desc, est_titular } = req.body;

    db.query('SELECT * FROM estoque where est_desc = ? AND est_titular = ?', [est_desc, est_titular], (err, results) => {
        if (err) {
            switch (err.errno) {
                case 1452:
                    console.error('O id do usuario não foi encontrado');
            }
            res.status(500).json({ message: "Erro ao verificar o estoque" });
        }
        else if (results.length > 0) {
            res.status(403).json({ message: "Este usuario ja possui um estoque com este nome" });
        }
        else {
            db.query("INSERT INTO estoque (est_desc,est_criado_em,est_titular) VALUES (?,CURDATE(),?);", [est_desc, est_titular], (error, resultado) => {
                if (error) {
                    res.status(500).json({ message: 'Erro ao inser o estoque!' });
                }
                else {
                    res.status(200).json({ message: 'Estoque inserido com sucesso' });
                    console.log(resultado) //teste
                }
            });
        }
    });


});


//Função para compartilhar o estoque
//recebe o id de quem está acessando ja descriptografado,  
// Nao está trazendo o valor de results na linha 128
app.post('/CompartilharEstoque', (req, res) => {
    const { fil_master, fil_id_usuario, fil_estoq } = req.body;

    db.query('SELECT est_titular FROM estoque where est_id = ?', [
        fil_estoq
    ], (err, results) => {
        if (err) {
            res.status(500).json({ message: "Erro ao verificar o titular do estoque a ser alterado!" });
            console.log(err);
        }
        else if(results[1] != fil_master){
            res.status(200).json({message:"O usuario que está acessando não possui acesso a este estoque"});
            console.log(results[1]);
        }
        else if(results[1] = fil_master){
            db.query('Select fil_id_usuario from filiado where fil_estoq = ? and fil_master = ? and fil_id_usuario = ?',[
                fil_estoq,
                fil_master,
                fil_id_usuario
            ],(error,reul) =>{
                if(error) {
                    res.status(500).json({message:"Erro ao consultar o usuario"});
                    console.log("Erro ao consultar o usuario");
                }
                else if(reul.affectedRows > 0){
                    res.status(200).json({message:"O usuario ja possui acesso a este estoque"});
                    console.log('O usuario ja possui acesso a este estoque');
                }
                else{
                    db.query("INSERT INTO filiado (fil_master,fil_id_usuario,fil_estoq,fil_inserted_at) VALUES (?,?,?,CURDATE())", [
                        fil_master,
                        fil_id_usuario,
                        fil_estoq
                    ], (erro, resultado) => {
                        if(erro){
                            res.status(500).json({message:"Erro ao cadastrar o novo usuario no estoque!"});
                            console.log("ERRO AO CADASTRAR O NOVO USUARIO",erro);
                        }
                        else if(resultado.affectedRows>0) {
                            res.status(200).json({message:"Estoque compartilhado com sucesso;"});
                            console.log("Cadastrado com sucesso",results);
                        }
                        else {
                            console.log('Erro??') //teste
                        }
                    });
                }
            });
        }
    });
});




app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});