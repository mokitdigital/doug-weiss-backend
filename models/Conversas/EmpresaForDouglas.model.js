const mongoose = require('mongoose')

const EmpresaForDouglasSchema = new mongoose.Schema({
    text: String, 
    data: String,
    hora: String,
    nomeEmpresa: String,
    nomeResponsavel: String,
    empresa: Boolean
});

module.exports = mongoose.models.EmpresaForDouglas || mongoose.model('EmpresaForDouglas', EmpresaForDouglasSchema);