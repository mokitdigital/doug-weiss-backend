const mongoose = require('mongoose')

const FormularioSchema = new mongoose.Schema({
    nome: String, 
    sobrenome: String,
    empresa: String,
    email: String,
    celular: String,
    motivo: String,
    descricao: String,
    dataHora: String
});

module.exports = mongoose.models.Formulario || mongoose.model('Formulario', FormularioSchema);