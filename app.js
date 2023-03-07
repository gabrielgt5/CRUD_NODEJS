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
   




app.listen(8080);