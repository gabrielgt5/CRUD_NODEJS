const Sequelize = require('sequelize');
const db = require('./db')


const Post = db.sequelize.define('produtos', {
    
    //atributos
    nome_produto: { 
        type: Sequelize.STRING
    },
    valor:{
        type: Sequelize.STRING
    }
});

//Post.sync({force: true});

module.exports = Post;
