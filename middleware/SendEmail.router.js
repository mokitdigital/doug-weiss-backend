const dotenv = require('dotenv').config()
const router = require('express').Router()
const FormularioModel = require('../models/Formulario/Formulario.model')
const Nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

// Configure CORS
router.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Content-Type")
  res.header("Access-Control-Allow-Methods", "*")
  next()
})

router.get('/recebidos/empresas/:nome', async(req, res) => {
  const nomeEmpresa = req.query.nome
  const formularios = await FormularioModel.findOne({
    empresa: nomeEmpresa
  })

  res.json({
    formularios
  })
})

router.get('/recebidos/empresas', async(req, res) => {
  const formularios = await FormularioModel.find()

  res.json({
    formularios
  })
})

router.post('/recebidos', (req, res) => {
  const data = req.body
  
  // Mandando email
  const remetente = Nodemailer.createTransport(smtpTransport({
    service: 'Hotmail',
    auth: {
      user: process.env.REMETENTE_EMAIL,
      pass: process.env.REMETENTE_PASS
    }
  }));

  const mailOptions = {
    from: process.env.REMETENTE_EMAIL,
    to: process.env.MAIL_DOUG,
    subject: `Contato de ${data.nome} | Empresa: ${data.empresa}`,
    text: 
    `
      Nome: ${data.nome},
      Sobrenome: ${data.sobrenome}
      Email: ${data.email},
      Celular: ${data.celular},
      Empresa: ${data.empresa},
      Motivo: ${data.motivo},
      Objetivo: \n
      ${data.descricao}
    `
  }

  remetente.sendMail(mailOptions, async(error, info) => {
    if (error) {
      console.log(error)
      res.status(500)
      res.json({
        error: error
      })
    } else {
      console.log(req.body)
      // Salvar no banco de dados
      const newMessage = await FormularioModel.create(req.body)

      console.log(`Email enviado:  + ${info.response}`)
      res.statusCode = 200
      res.json({ 
        mensagem: 'Email enviado com sucesso!',
        data: newMessage
      })
    }
  })
})

router.post('/recebidos/delete', async(req, res) => {
  const empresa = req.body
  const mensagem = []
  const status = []

  await FormularioModel.deleteOne({
    empresa: empresa.Empresa
  }, (error, doc) =>{
    if (error) {
      mensagem.push(error)
      status.push(500)
      console.log(error)
    } else {
      mensagem.push(doc)
      status.push(200)
      console.log(doc)
    }
  })

  res.json({
    mensagem
  })
})

module.exports = router
