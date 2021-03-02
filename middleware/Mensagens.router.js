const router = require('express').Router()
const MensagensDouglas = require('../models/Conversas/DouglasForEmpresa.model')
const MensagensEmpresa = require('../models/Conversas/EmpresaForDouglas.model')

// Configure CORS
router.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Content-Type")
  next()
})

/**
 * Todas mensagens da empresa selecionada
 */
router.get('/empresas/:nome', async(req, res) => {
  const nomeEmpresa = req.query.nome
  const status = []
  const mensagens = []
  
  if (nomeEmpresa !== 'Douglas Weiss') {
    await MensagensDouglas.find({ nomeEmpresa, forEmpresa }, (error, documents) => {
      if (error) {
        status.push(500)
      } else {
        status.push(200)
        for (let index = 0; index < documents.length; index++) {
          const element = documents
  
          mensagens.push(element[index])
        }
      }
    })
  } else {
    await MensagensEmpresa.find({ nomeEmpresa }, (error, documents) => {
      if (error) {
        status.push(500)
      } else {
        status.push(200)
        for (let index = 0; index < documents.length; index++) {
          const element = documents
  
          mensagens.push(element[index])
        }
      }
    })
  }

  res.status(status[0]).json({
    mensagens
  })
})

/**
 * Envio de mensagens atraves da empresa passado por query
 */
router.post('/envios/:nome', async(req, res) => {
  const nomeEmpresa = req.query.nome
  const status = []
  const mensagens = []
  const {
    text,
    data,
    hora,
    nomeResponsavel,
    empresa
  } = req.body

  if (nomeEmpresa !== 'Douglas Weiss') {
    await MensagensDouglas.create({
      text,
      data,
      hora,
      nomeEmpresa,
      forEmpresa,
      empresa
    }, (error, document) => {
      if (error) {
        status.push(503)
        mensagens.push('Erro ao enviar mensagem')
      } else {
        status.push(201)
        console.log('Mensagem enviada: ', document)
      }
    })
  } else {
    await MensagensEmpresa.create({
      text,
      data,
      hora,
      nomeEmpresa,
      nomeResponsavel,
      empresa
    }, (error, document) => {
      if (error) {
        status.push(503)
        mensagens.push('Erro ao enviar mensagem')
      } else {
        status.push(201)
        console.log('Mensagem enviada: ', document)
      }
    })
  }

  mensagens.push({
    text,
    data,
    hora,
    nomeResponsavel,
    nomeEmpresa,
    empresa
  })

  res.json({
    mensagens 
  })
})

/**
 * Deleta todas mensagens
 */
router.delete('/empresas/:nome', async(req, res) => {
  const nomeEmpresa = req.query.nome
  const status = []
  const mensagem = []

  await Mensagens.deleteOne({ nomeEmpresa }, (error, document) => {
    if (error) {
      status.push(500)
      mensagem.push('Erro ao excluir as mensagens, por favor, entre em contato com o suporte.')
    } else {
      status.push(200)
      mensagem.push('Mensagens excuida com sucesso!')
    }
  })

  res.status(status[0]).json({
    mensagem: mensagem[0]
  })
})

module.exports = router