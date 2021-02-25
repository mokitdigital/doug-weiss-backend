const mongoose = require('mongoose')

const MensagemSchema = new mongoose.Schema({
    text: String, 
    data: String,
    hora: String,
    nomeEmpresa: String,
    nomeResponsavel: String
});

module.exports = mongoose.models.Mensagem || mongoose.model('Mensagem', MensagemSchema);