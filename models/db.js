const Sequelize = require('sequelize');


  //Conexão com o banco
const sequelize = new Sequelize('crud', 'gabriel', '123456', {
    host: 'localhost',
    dialect: 'mysql', 
    query:{raw:true}
});

module.exports = {Sequelize, sequelize};