const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const Post = require('./models/Post')
const path = require('path')



//config
    //Tamplete engine
    var handle = exphbs.create({
        defaultLayout: 'main'
        });
    
    app.engine('handlebars', handle.engine);
    app.set('view engine', 'handlebars');
    //Body-Parser
    app.use(express.urlencoded({extended:false}))
    app.use(express.json())
  
    //Public
    app.use(express.static(path.join(__dirname, "public")));

    app.use((req, res, next) =>{
        next()
    })

    //Tratando erros
 


    //Rotas
    app.get('/', (req, res) => {
       Post.findAll().then(function(posts){
        res.render('index', {posts: posts})
       })
    })

    app.get('/', (req, res) => {
        res.render('/')
    })

    app.post('/add', (req, res) => {

        /*
        var erros = []

        if(!req.body.nome_produto && req.body.nome_produto == undefined || req.body.nome_produto == null){
            erros.push({texto: "Nome inválido"})
        }
        if(!req.body.cod_produto && req.body.cod_produto == undefined || req.body.cod_produto == null){
            erros.push({texto: "Por favor insira um código válido"})
        }
        if(!req.body.preco_produto && req.body.preco_produto == undefined || req.body.preco_produto == null){
            erros.push({texto: "Por favor insira um preço"})
        }

        if(erros.length > 0){
            res.render('/', {erros: erros})
        }
        */

        Post.create({
            id: req.body.cod_produto,
            nome_produto: req.body.nome_produto,
            valor: req.body.preco_produto
        }).then(function(){
            res.redirect("/")
        }).catch(function(err){
            res.send("Houve um erro: " + err)
        });
    });
   
    //Atualizar objeto BUGGGGGGGG - resolver
    app.post('/:id', (req, res) =>{
        Post.findOne({_id:req.params.id}).then((edit) => {
            res.render('/', {edit: edit})
        }).catch((err) => {
            req.flash("error_msg", "não há nada aqui")
            req.redirect('/')
        })
    })

    //Deletando 
    app.post("/produto/deletar", (req, res) => {
        Post.remove({_id: req.body.id}).then(() =>{
            req.flash("success_msg", "Categoria Deletada com sucesso")
            res.redirect('index')
        }).catch((err) => {
            req.flash("error_msg", "Houve um error ao deletar a categoria")
            res.redirect('index')
        })
    })




app.listen(8080);