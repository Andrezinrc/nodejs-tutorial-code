const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');
const db = require("../db"); //importa a conexao com o banco de dados
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if(err){
            console.error("Erro ao buscar usuario ",err);
            res.status(500).send('erro ao buscar usuarios');
            return;
        }
        res.render('index', { users: results}); //passa a lista de usuarios para o template
    });
});


router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }

  // Hash da senha
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error('Erro ao hash da senha:', err);
      return res.status(500).send('Erro ao processar a senha.');
    }

    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err, results) => {
      if (err) {
        console.error('Erro ao adicionar usuário:', err);
        res.status(500).send('Erro ao adicionar usuário');
        return;
      }
      res.redirect('/');
    });
  });
});

module.exports = router;