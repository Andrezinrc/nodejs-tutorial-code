// const express = require('express');
// const app = express();
// const port = 3000;

// //middleware para parsear o body das requisicoes como JSON
// app.use(express.json())
// //middleware de log de requisicoes
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next(); //chama o proximo middleware ou rota
// });

// //rota GET basica para endpoit raiz "/"
// app.get('/', (req, res) => {
//     res.send('hello world');
// });

// //rota GET para listar todos os usuarios
// app.get('/users', (req, res) => {
//     const users = [
//         {id: 1, name: 'Andre'},
//         {id: 2, name: 'Thaina'},
//         {id: 3, name: 'Julia'}
//     ];
//     res.json(users);
// });

// //rota GET para buscar um usuario pelo id
// app.get('/users/:id', (req, res) => {
//     const userId = parseInt(req.params.id); //captura o parametro de id do usuaurio
//     const users = [
//         {id: 1, name: 'Andre'},
//         {id: 2, name: 'Thaina'},
//         {id: 3, name: 'Julia'}
//     ];
//     const user = users.find(u => u.id === userId);
//     if(user){
//         res.json(user);
//     }else{
//         res.status(404).send('Usuario nao encontrado');
//     }
// });

// //rota POST para adicionr um novo usuaurio
// app.post('/users', (req, res) => {
//     const newUser = req.body; //recebe os dados do usuario via json

//     //logica para adicionar o usuario
//     res.status(201).json({ message: 'usuario criado com sucesso', user: newUser})
// });

// app.listen(port, () => {
//     console.log(`servidor rodando na porta ${port}`)
// });

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Para parsear dados do formulário
const app = express();
const port = 3000;

// Importa as rotas
const usersRouter = require('./routes/users')

// Configura o diretório de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json())
//middleware de log de requisicoes
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); //chama o proximo middleware ou rota
});

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configura o diretório de views e o engine de template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Usa as rotas de usuários
app.use('/', usersRouter);

app.listen(port, () => {
    console.log(`servidor rodando na porta ${port}`)
});
