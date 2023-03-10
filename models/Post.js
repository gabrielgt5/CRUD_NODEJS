const Sequelize = require('sequelize');
const db = require('./db')


const Post = db.sequelize.define('produtos', {
    //Atributos
    nome_produto: { 
        type: Sequelize.STRING
    },
    valor:{
        type: Sequelize.INTEGER
    }
});

//Post.sync({force: true});

module.exports = Post;
