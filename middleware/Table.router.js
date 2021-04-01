const router = require('express').Router()
const FormularioModel = require('../models/Formulario/Formulario.model')

// Configure CORS
router.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Content-Type")
  res.header("Access-Control-Allow-Methods", "*")
  next()
})

router.get('/search', async (req, res) => {
  const { word } = req.query

  await FormularioModel.find({}, (err, formularios) => {
    if (err) {
      console.log(err)
    }

    function searchName () {
      let pos = 0
      let indices = []
  
      while (pos < formularios.length) {
        let name = formularios[pos].empresa.toLowerCase()
  
        if (name.indexOf(word) != -1) {
          indices.push(formularios[pos])
        }
        pos++;
      }
      return indices
    }

    res.status(200).json({
      word,
      empresas: searchName()
    })
  })
})

module.exports = router