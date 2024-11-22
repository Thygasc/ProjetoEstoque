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
    const { login, senha, nome, email } = req.query;
    const query = 'INSERT INTO usuario (usu_login,usu_senha,usu_nome,usu_email,usu_data_criado) VALUES (?,?,?,?,NOW())';
    db.query(query, [login, senha, nome, email], err => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            res.status(500).json({ message: 'Erro ao inserir dados' });
        } else {
            res.status(200).json({ message: 'Usuario cadastrado com Sucesso' });
        }
    });
});


// Função que valida o login no banco
app.post('/login', (req, res) => {
    const { usu_login, usu_senha } = req.body;

    db.query('SELECT usu_id,usu_login,usu_nome,usu_est_padrao from usuario where usu_login = ? and usu_senha = ?', [usu_login, usu_senha], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Erro ao verificar o login' });
        }
        else if (results.length > 0) {
            const token = jwt.sign({ id: results[0].usu_id }, CHAVE_SECRETA, { expiresIn: '1h' });
            const name = results[0].usu_nome;
            const est_padrao = results[0].usu_est_padrao;
            res.status(200).json({ message: 'Login com sucesso', token, name, est_padrao  });
        } else {
            res.status(401).json({ message: 'Credenciais inválidas' });
        }
    });
});

// Função para cadastrar o estoque
// in: nome estoque, id titular
app.post('/cadastraEstoque', (req, res) => {
    const { est_desc, est_titular } = req.query;

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
            db.query("INSERT INTO estoque (est_desc,est_criado_em,est_titular) VALUES (?,NOW(),?);", [est_desc, est_titular], (error, resultado) => {
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
// in: id usuario, id usuario que vai receber, id estoque
//recebe o id de quem está acessando ja descriptografado

app.post('/CompartilharEstoque', (req, res) => {
    const { fil_master, fil_id_usuario, fil_estoq } = req.body;

    db.query('SELECT est_titular FROM estoque where est_id = ?', [
        fil_estoq
    ], (err, results) => {
        if (err) {
            res.status(500).json({ message: "Erro ao verificar o titular do estoque a ser alterado!" });
            console.log(err);
        }
        else {
            const estTitular = results[0]?.est_titular;
        
        
            if(estTitular !== fil_master){
                res.status(200).json({message:"O usuario que está acessando não possui acesso a este estoque"});
                console.log("O usuario que está acessando não possui acesso a este estoque");
            }

            else if (estTitular == fil_master){
                db.query('Select fil_id_usuario from filiado where fil_estoq = ? and fil_master = ? and fil_id_usuario = ?',[
                    fil_estoq,
                    fil_master,
                    fil_id_usuario
                ],(error,reul) =>{
                    const fil_usuario = reul[0]?.fil_id_usuario;

                    if(error) {
                        res.status(500).json({message:"Erro ao consultar o usuario"});
                        console.log("Erro ao consultar o usuario");
                    }
                    else if(fil_usuario == fil_id_usuario){
                        res.status(200).json({message:"O usuario ja possui acesso a este estoque"});
                        console.log('Usuario ja cadastrado',fil_usuario);
                    }
                    else{
                        db.query("INSERT INTO filiado (fil_master,fil_id_usuario,fil_estoq,fil_inserted_at) VALUES (?,?,?,NOW())", [
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
                        });
                    }
                });
        }}
    });
});

// Função para cadastro de produto
// in: nome , quantidade ,min, max e id do estoq  
app.post('/CadastroProduto',(req,resp) =>{
    const {prod_nome, prod_qtd,prod_min,prod_max,prod_estoq } = req.query;

    db.query("SELECT prod_nome from produto where prod_estoque = ? and prod_nome = ?",[
        prod_estoq,prod_nome
    ],(error,resultado) => {
        if (error){
            resp.status(500).json({message:"Não foi possivel validar o nome do produto no estoque"});
            console.log("Não foi possivel validar o nome do produto no estoque",error);
        }
        else if (resultado.length> 0){
            resp.status(200).json({message:"O produto cadastrado ja existe para este estoque, você deve adicionar a quantidade ao produto ja existente ou alterar o nome do protudo!", bool:false});
            console.log("O produto cadastrado ja existe para este estoque, você deve adicionar a quantidade ao produto ja existente ou alterar o nome do protudo.");
        }
        else if (resultado.length == 0){
            if (prod_min == null && prod_max != null){

                db.query('INSERT INTO produto (prod_nome,prod_qtd,prod_max,prod_estoque,prod_inserted_at) VALUES (?,?,?,?,NOW())',[
                    prod_nome,prod_qtd,prod_max,prod_estoq
                ],(err,result) =>{
                    if (err){
                        resp.status(500).json({message:"Erro ao cadastrar o produto ao estoque!"});
                        console.log("Erro ao acadastrar o novo produto!",err);
                    }
                    else if (result){
                        resp.status(200).json({message:"Novo produto cadastrado com Sucesso!",bool:true});
                        console.log("Novo produto cadastrado com Sucesso com valor max!");
                    }
                }
            );
            }
            else if(prod_min != null && prod_max == null){
                db.query('INSERT INTO produto (prod_nome,prod_qtd,prod_min,prod_estoque,prod_inserted_at) VALUES (?,?,?,?,NOW())',[
                    prod_nome,prod_qtd,prod_min,prod_estoq
                ],(err,result) =>{
                    if (err){
                        resp.status(500).json({message:"Erro ao cadastrar o produto ao estoque!"});
                        console.log("Erro ao acadastrar o novo produto!",err);
                    }
                    else if (result){
                        resp.status(200).json({message:"Novo produto cadastrado com Sucesso!"});
                        console.log("Novo produto cadastrado com Sucesso com valor min!");
                    }
                }
            );
            }
            else if (prod_min == null && prod_max == null){
                db.query('INSERT INTO produto (prod_nome,prod_qtd,prod_estoque,prod_inserted_at) VALUES (?,?,?,NOW())',[
                    prod_nome,prod_qtd,prod_estoq
                ],(err,result) =>{
                    if (err){
                        resp.status(500).json({message:"Erro ao cadastrar o produto ao estoque!"});
                        console.log("Erro ao acadastrar o novo produto!",err);
                    }
                    else if (result){
                        resp.status(200).json({message:"Novo produto cadastrado com Sucesso!"});
                        console.log("Novo produto cadastrado com Sucesso sem valor min ou max!");
                    }
                }
            );
            }
        
            else if (prod_min != null && prod_max != null){
                db.query("INSERT INTO produto (prod_nome,prod_qtd,prod_min,prod_max,prod_estoque,prod_inserted_at) VALUES (?,?,?,?,?,NOW())",[
                    prod_nome,prod_qtd,prod_min,prod_max,prod_estoq
                ],(err,result) => {
                    if (err){
                        resp.status(500).json({message:"Erro ao cadastrar o produto ao estoque."});
                        console.log("Erro ao cadastrar o produto ao estoque.",err)
                    }
                    else {
                        resp.status(200).json({message:"Produto cadastrao com sucesso."});
                        console.log("Novo produto cadastrado com sucesso.");
                    }
                }
            );
            }
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
            const usuario = results[0];
            res.status(200).json({ message: 'Usuario ja cadastrado', bool: true});
            
        } else {
            res.status(200).json({ message: 'Usuario não cadastrado', bool: false });
        }
    });
});


// Consulta produtos/
// Recebe id_estoq e id_usuario
app.get("/Produtos",(req,res) =>{

    const { id_estoq, id_usuario } = req.query;

    db.query("SELECT fil_id_usuario FROM filiado WHERE fil_estoq = ? AND fil_id_usuario = ? LIMIT 1",[
        id_estoq,
        id_usuario
    ],(err,resposta) =>{
        if (err) {
            res.status(500).json({message:"Erro ao consultar o acesso a este usuario;"});
            console.log("Erro ao consultar o acesso a este usuario",err);
        }
        else if (resposta.length == 1){
            db.query("select * from produto WHERE prod_estoque = ?",[
                id_estoq,
                id_usuario
            ],(erro,resp) => {
                if (erro) {
                    res.status(500).json({message:"Erro ao consultar produtos"});
                    console.log("Erro ao consultar produtos",erro);
                }
                else {
                    console.log(resp);
                    res.status(200).json(resp);
                }
            });
        }
        else if (resposta.length == 0){
            res.status(500).json({message:"Não possui acesso a este estoque"});
            console.log("Não possui acesso a este estoque");
            console.log('resposta: ',resposta);
            console.log('id_estoq:',id_estoq,'id_usuario:',id_usuario); 
        }
    });
});

// Consultar estoques
app.get("/Estoques",(req,res) =>{
    const { id_usuario } = req.query;


    db.query("SELECT u.usu_nome,e.* FROM estoque e left join filiado f on e.est_id = f.fil_estoq left join usuario u on f.fil_master = u.usu_id WHERE f.fil_id_usuario = ?",[
        id_usuario
    ],(error,resultado) =>{
        if(error){
            res.status(500).json({message:"Erro ao consultar"});
            console.log("Erro ao consultar",error);
        }
        else if (resultado.length>0){
            res.status(200).json(resultado);
            console.log(resultado);
        }
        else{
            res.status(200).json({message:"Não foi encontrado nenhum estoque para este usuario"});
            console.log("Não foi encontrado nenhum estoque para este usuario");
        }
    })
});

//recebe o id do estoque
app.get("/UsuariosPermitidos/:id",(req,res) =>{
    const {id} = req.params;

    db.query("SELECT u.usu_nome FROM filiado f left join usuario u on f.fil_id_usuario  = u.usu_id where f.fil_estoq = ?",[id],(err,result) =>{
        if (err) {
            console.log("Erro ao consultar os usuario Permitidos",err);
            res.status(500).json({message:"Erro ao consultar os usuarios permitidos"});
        }
        else {
            console.log(result);
            res.status(200).json(result);
        }
    })

})

// Consultar movimentações
app.get("/Movimentacao",(req,resp) =>{

    const { dataini, datafim, id_estoq, usu_id } = req.body;

    db.query(`
    SELECT 
        DATE_FORMAT(m.mov_data,"%d/%m/%Y") as "DATA",
        m.mov_hora as "HORA",
        p.prod_nome AS "PRODUTO",
        m.mov_qtd AS "QUANTIDADE",
        CASE (m.mov_tipo)
            WHEN (1) THEN ("Entrada")
            WHEN (0) THEN ("SAÍDA")
        END AS "ENTRADASAIDA"		
    FROM movimentacao m 
    LEFT JOIN filiado f ON m.mov_est = f.fil_estoq
    LEFT JOIN produto p ON m.mov_prod = p.prod_id
    WHERE f.fil_id_usuario = ? AND m.mov_est = ? AND mov_data BETWEEN ? AND ? ORDER BY mov_data,mov_hora`,[
        usu_id,
        id_estoq,
        dataini,
        datafim
    ],(err,result) =>{
        if (err){
            resp.status(500).json("ERRO AO CONSULTAR A MOVIMENTAÇÃO!");
            console.log("ERRO AO CONSULTAR A MOVIMENTAÇÃO",err);
        }
        else if (result.length > 0 ) {
            resp.status(200).json(result);
            console.log(result);
        }
        else {
            resp.status(200).json("Não foi encontrado nenhuma movimentação no periodo selecionado");
            console.log("Não foi encontrado nenhuma movimentação no periodo selecionado");
        }
            
})

});


//Função para movimentação de produtos
// IN: Id produto e nova quantidade do produto
// Altera a tabela produto, que aciona um trigger para adicionar o registro na tabela de movimentação
app.patch("/MovimentaProduto/:id",(req,resp) =>{
    const { id } = req.params; 
    const {prod_qtd} = req.body;

    if (prod_qtd == null){
        resp.status(500).json({message:"Alguma variavel está vazia, é necessário que todas informações estejam preenchidas corretamente."});
        console.log("Alguma variavel está vazia, é necessário que todas informações estejam preenchidas corretamente");
    }
    else {
        db.query("SELECT * from produto where prod_id = ?",[
            id
        ],(error,resultado) => {
            if (error){
                resp.status(500).json({message:"Erro ao encontrar o produto!"});
                console.log("Erro ao encontrar o produto!",error);
            }
            else if (resultado.length > 0){
                db.query("UPDATE produto SET prod_qtd = ? WHERE prod_id = ?",[
                    prod_qtd,id
                ],(err,result) =>{
                    if (err){
                        resp.status(500).json("Erro au atualizar a nova quantidade do produto");
                        console.log("Erro ao atualizar a nova quantidade do produto",err);
                    }
                    else if (result.affectedRows == 1){
                        resp.status(200).json("Atualizou com sucesso a quantidade do produto");
                        console.log("Atualizou com sucesso a quuantidade do produto");
                    }
                    else {
                        resp.status(500).json("erro?!");
                        console.log("erro?!",result);                        
                    }
                }
                );
            }
            else {
                resp.status(500).json({message:"Não foi encontrado produto com este ID!"});
                console.log("Não foi encontrado produto com este ID!");
            }
        })
    }

});

// funciona show
app.patch("/AtualizaProduto/:id",(req,resp) =>{
    const { id } = req.params;
    const { prod_nome, prod_qtd, prod_min, prod_max,usu_id } = req.body;
    
    let query = "UPDATE produto SET ";
    let values = [];

    if (prod_nome){
        query +="prod_nome = ?, ";
        values.push(prod_nome);
    }
    if (prod_qtd){
        query +="prod_qtd = ?, ";
        values.push(prod_qtd);
    }
    if(prod_min){
        query +="prod_min = ?, ";
        values.push(prod_min);
    }
    if(prod_max){
        query +="prod_max = ?, ";
        values.push(prod_max);
    }
    
    //remove a ultima virgula da consulta query
    query = query.slice(0,-2);
    query += " WHERE prod_id = ?";
    values.push(id);

    // Executa a query do update
    db.query(query,values,(err,results) => {
        if(err){
            console.log("Erro ao atualizar o produto: ",err);
            resp.status(500).json({message:"Erro ao atualizar o produto."});
        }
        if(results.affectedRows === 0){
            console.log("Produto não encontrado");
            resp.status(404).json({message:"Produto não encontrado."});
        }
        else {
            console.log("Sucesso ao atualizar o produto",query);
            resp.status(200).json({message:"Produto atualizado com sucesso!"});
        }
    });


});

//funciona show
app.patch("/AtualizarEstoque/:id",(req,resp) =>{
    const {id} = req.params;
    const { est_desc } = req.body;

    db.query("UPDATE estoque SET est_desc = ? WHERE est_id = ?",[est_desc,id],(err,result) =>{
        if (err) {
            console.log("Erro ao atualizar o esotque");
            resp.status(500).json({message:"Erro ao atualizar o estoque!"});
        }   
        if (result.affectedRows === 0){
            console.log("Não foi encontrado nenhum estoque com este ID");
            resp.status(404).json({message:"Não foi encontrado nenhum estoque com este ID"});
        }
        else {
            console.log("Foi atualizado um estoque");
            resp.status(200).json({message:"Foi ataulizado um estoque."});
        }
    });
});

// funciona show
app.patch("/AtualizaUsuario/:id",(req,resp) =>{
    const { id } = req.params;
    const { usu_senha, usu_nome,usu_email } = req.body;

    let query = "UPDATE usuario SET ";
    let values = [];

    if (usu_senha) {
        query += "usu_senha = ?, ";
        values.push(usu_senha);
    }
    if(usu_nome){
        query += "usu_nome = ?, ";
        values.push(usu_nome);
    }
    if(usu_email){
        query += "usu_email = ?, ";
        values.push(usu_email);
    }

    // Remover a virgula no final
    query = query.slice(0,-2);
    query += "WHERE usu_id = ?";
    values.push(id);

    db.query(query,values,(err,result) =>{
        if (err){
            console.log("Erro ao atualizar o registro");
            resp.status(500).json({message:"Erro ao atualizar o registro"});
        }
        if (result.affectedRows === 0 ){
            console.log ("Não foi encontrado nenhum registro com este ID");
            resp.status(404).json({message:"Não foi encontrado nenhum registro com este ID"});
        }
        else {
            console.log("Foi atualizado o registro referente a este ID");
            resp.status(200).json({message:"Sucesso ao atualizar o registro referente a este ID"});
        }
    });
});

// funciona show
app.delete("/ExcluirProduto/:id",(req,resp) =>{
    const { id } = req.params;
    
    db.query("DELETE FROM produto WHERE prod_id = ?",[id],(err,result) =>{
        if(err){
            console.log("erro ao excluir produto");
            resp.status(500).json({message:"Erro ao excluir produto"});
        }
        if (result.affectedRows === 0){
            console.log("Não foi encontrado nenhum registro com este id para exlcuir");
            resp.status(404).json({message:"Não foi encontrado nenhum registro com este id para excluir"});
        }
        else{
            console.log("Foi realizado a exclusão com sucesso!");
            resp.status(200).json({message:"Foi realizado a exclusao com sucesso"});
        }
    });
});


// Funciona show
app.delete("/ExcluirEstoque/:id",(req,resp) =>{
    const { id } = req.params;

    db.query("DELETE FROM estoque WHERE est_id = ?",[id],(erro,resultado) =>{
        if(erro) {
            console.log("Erro ao deletar o estoque. O estoque não deve ter produtos vinculados a ele");
            resp.status(500).json({message:"Erro ao deletar o estoque. O estoque não deve ter produtos vinculados a ele"});
        }
        else if (resultado.affectedRows === 0) {
            console.log("Não foi encontrado nenhum registro com este id");
            resp.status(404).json({mnessage:"Não foi encontrado nenhum registro com este id"});
        }
        else {
            console.log("Sucesso ao deletar o estoque!");
            resp.status(200).json({message:"Sucesso ao deletar o estoque"});
        }
    })
});

// Funcionando show
app.delete("/RemoverAcessoEstoque/:id",(req,resp) =>{
    const { id } = req.params; // id do estoque
    const { usu_id} = req.body;

    db.query("DELETE FROM filiado WHERE fil_id_usuario = ? AND fil_estoq = ?", [
        usu_id,
        id
    ],(err,result) =>{
        if (err){
            console.log("Erro ao deletar da tabela de filiado");
            resp.status(500).json({message:"Erro ao deletar da tabela de filiado"});
        }
        if (result.affectedRows === 0){
            console.log("Não foi encontrado nenhum acesso para este usuario neste estoque");
            resp.status(404).json({message:"Não foi encontrado nenhum acesso para este usuario neste estoque"});
        }
        else {
            console.log("Foi removido com sucesso o acesso deste estoque");
            resp.status(200).json({message:"Foi removido com sucesso o acesso a este estoque"});
        }
    });
});





app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
