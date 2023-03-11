// Importando bibliotecas
    const express = require('express');
    const app = express();
    const exphbs  = require('express-handlebars');
    const Post = require('./models/Post')
    const path = require('path');
    const { get } = require('http');

// CONFIGURAÇÃO
    // Tamplete engine
        var handle = exphbs.create({
            defaultLayout: 'main'
            });
        
        app.engine('handlebars', handle.engine);
        app.set('view engine', 'handlebars');

    // Express
        app.use(express.urlencoded({extended:false}))
        app.use(express.json())
  
    // Public
        app.use(express.static(path.join(__dirname, "public")));
        app.use((req, res, next) =>{
            next()
        })


// Rotas
      
    // Listando produtos na tela
        app.get('/', (req, res) => {
            Post.findAll().then(function(posts){
                res.render('index', {posts: posts})
            })
        })

    // Listando produtos por ordem acendente 
        app.get('/asc', (req, res) => {
            Post.findAll({order: [['id', 'ASC']]}).then((posts) => {
            res.render('index', {posts: posts})
            })
        })
    
    // Listando produtos por ordem decrescente
        app.get('/desc', (req, res) => {
            Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
            res.render('index', {posts: posts})
            })
        })
    
    // Adiciona valores a tabela e ao banco de dados
        app.get('/', (req, res) => {
            res.render('/')
        })

        app.post('/add', (req, res) => {

            Post.create({
                id: req.body.cod_produto,
                nome_produto: req.body.nome_produto,
                valor: req.body.valor
            }).then(function(){
                res.redirect("/")
            }).catch(function(err){
                res.send("Houve um erro: " + err)
            });
        });
   
    // Faz o Update nos registros
 
        app.get('/form-edit/editar/:id', (req, res) => {
            Post.findByPk(req.params.id).then(edite => {
                res.render('form-edit', {
                    id: req.params.id,
                    nome_produto: edite.nome_produto,
                    valor: edite.valor
                })
            }).catch((err => {
                res.send('Categoria não encontrada', err)
                res.redirect('form-edit')
            }))
        })
  
        app.post('/atualizado/:id',(req, res) => {
            Post.update({
                nome_produto: req.body.nome_produto,
                valor: req.body.valor
            },
            {
                where: {id: req.params.id}}).then(() => {
                    res.redirect('/')
                }).catch((err) => {
                    console.log(err);
                })
            })

        //Deletando Registro
        app.get('/:id', (req, res) => {
            Post.destroy({where: {id: req.params.id}}).then(() => {
                res.redirect('/')
            }).catch(() => {
                res.send("Este produto não existe não existe")
            })
        })

        //Console de conexão
        const PORT = 8080;
        app.listen(PORT,() => {
        console.log("Servidor funcionando!");
        })