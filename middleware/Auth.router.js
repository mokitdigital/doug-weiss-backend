const router = require('express').Router()
const DouglasModels = require('../models/Auth/Douglas.models')

// Configure CORS
router.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

router.post('/register', async(req, res) => {
  const register = await DouglasModels.create(req.body)

  res.status(201).json({
    msg: 'Cadastro feito com sucesso',
    register
  })
})

/**
 * Login com o usuario e senha
 */
router.post('/login', async(req, res) => {
  const { username } = req.body
  const { password } = req.body

  await DouglasModels.findOne({ username }, function(err, user) {
    if (err) throw err;
    if(!user){
      res.status(500).json({ erro: 'Usuario nao encontrado.' }) 
    } else {
      user.checkPassword(password, function(err, isMatch) {
        if (err) throw err;

        if (!isMatch) {
          res.status(500).json({ msg: 'Senha invalida' })
        }else {
          res.status(200).json({ msg: 'Voce esta logado' })
        }
      })
    }
  })
})

module.exports = router