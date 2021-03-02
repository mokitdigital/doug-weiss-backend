const mongoose = require('mongoose')

const DouglasForEmpresaSchema = new mongoose.Schema({
    text: String, 
    data: String,
    hora: String,
    nomeEmpresa: String,
    forEmpresa: String,
    empresa: Boolean
});

module.exports = mongoose.models.DouglasForEmpresa || mongoose.model('DouglasForEmpresa', DouglasForEmpresaSchema);