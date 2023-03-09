//const pool = require("mysql2/promise");
const Sequelize = require('sequelize');


  //Conexão com o banco
const sequelize = new Sequelize('crud', 'gabriel', '123456', {
    host: 'localhost',
    dialect: 'mysql', 
    query:{raw:true}
});

module.exports = {Sequelize, sequelize};


/** 
const Sequelize = require('sequelize');
const sequelize = new Sequelize('railway', 'root', 'yM8t5TtYJXTsfEafIzdS', {
  dialect: 'mysql',
  dialectOptions: {
    port: '7232',
    host: 'containers-us-west-186.railway.app'
  }
})

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.')
}).catch((error) =>{
  console.error('Unable to connect to the database:', error);
}) 

module.exports = {Sequelize, sequelize};
*/



