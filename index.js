const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./middleware/Clientes.router')

app.use(bodyParser.json())

app.use('/api', router)
app.use(cors())

app.listen(3000)

//Conexão do Banco de Dados
mongoose.connect('mongodb+srv://mokitdigital:20denovembro@cluster0.qpd1r.mongodb.net/mokitdigital?retryWrites=true&w=majority', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})

//Verificação do banco de dados
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão do banco de dados: '));
db.once('open', function() {
  console.log("Banco de dados conectado!!!")
});