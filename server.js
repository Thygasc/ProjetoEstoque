const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: '',
    database:'easystock'
});

db.connect(err =>{
    if (err){
        console.error('Erro ao conectar no banco de dados',err);
    } 
    console.log('Conectado ao MySQL');
});

app.post('/cadastrarUsuario',(req,res) =>{
    const {login,senha,nome,email} =req.body;
    const query = 'INSERT INTO usuario (usu_login,usu_senha,usu_nome,usu_email,usu_data_criado) VALUES (?,?,?,?,CURDATE())';
    db.query(query,[login,senha,nome,email],(err,result)=>{
    if(err){
        console.error('Erro ao inserir dados:',err);
        res.status(500).json({message:'Erro ao inserir dados'});
    } else {
        res.status(200).json({message:'Usuario cadastrado com Sucesso'});
    }
    });
});

app.get('/consultarUsuarios',(req,res) =>{
    db.query("SELECT * FROM usuario",req,);
})


app.listen(3000,()=>{
    console.log('Servidor rodando na porta 3000')
})