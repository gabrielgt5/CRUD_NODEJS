const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const Post = require('./models/Post')
const path = require('path');
const { get } = require('http');



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
    //erros atrás de erros 
   app.get('/form-edit/editar/:id', (req, res) => {
    Post.findOne({id: req.params.id}).then((edite) => {
        res.render('form-edit', {edite: edite})
    }).catch((err) => {
        res.send('Categoria não encontrada')
        res.redirect('form-edit')
    })
    
   })


    //Post.where({_id: req.body.id}).update({nome:req.body.nome, slug:req.body.slug})


  //Deletando Registro
  app.get('/:id', (req, res) => {
    Post.destroy({where: {'id': req.params.id}}).then(() => {
        res.redirect('/')
    }).catch(() => {
        res.send("Este produto não existe não existe")
    })
  })






app.listen(8080);