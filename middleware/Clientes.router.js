const router = require('express').Router()
const Cadastros = require('../models/Usuarios/Cadastrados.model')

// Configure CORS
router.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

router.get('/cadastros', async(req, res) => {
  const cadastrosAll = await Cadastros.find()

  res.json({
    cadastrosAll
  })
})

router.post('/cadastros', async(req, res) => {
  await Cadastros.create(req.body)

  res.status(201).json({
    msg: 'Cadastro feito com sucesso'
  })
})

/**
 * Login com o usuario e senha
 */
router.post('/login', async(req, res) => {
  const { user } = req.body
  const { password } = req.body

  const newMensagem = await Cadastros.findOne({ 
    nomeUsuario: user,
    password: password
  }, (err, doc) => {
    if (err) {
      res.status(500).json({
        error: 'Erro ao fazer login'
      })
    } else {
      res.status(200).json({
        msg: 'Login feito com sucesso'
      })
    }
  })
})

module.exports = router