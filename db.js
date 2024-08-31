const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'database'
});

connection.connect((err) => {
    if(err){
        console.log("erro ao conectar ao banco de dados ",err);
        return;
    }
    console.log("conectado ao banco de dados")
});

module.exports = connection;