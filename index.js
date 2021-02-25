const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./middleware/Clientes.router')
const PORT = process.env.PORT

app.use(bodyParser.json())

app.use('/api', router)
app.use(cors())



//Conexão do Banco de Dados
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})

//Verificação do banco de dados
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão do banco de dados: '));
db.once('open', function() {
  console.log("Banco de dados conectado!!!")
});

app.listen(PORT)