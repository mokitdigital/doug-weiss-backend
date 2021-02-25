const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const CadastradosSchema = new mongoose.Schema({
    imagem: String, 
    email: String,
    ddd: Number,
    celular: Number,
    nomeEmpresa: String,
    nomeResponsavel: String,
    nomeUsuario: String,
    password: String
});

CadastradosSchema.pre('save', function(next){
    const user = this

    //Se ele não modificou a senha
    if(!user.isModified('password')){
        return next()
    }

    //gera um hash com salt 
    bcrypt.genSalt((err, salt)=> {
        bcrypt.hash(user.password, salt, (err, hash)=>{
            user.password = hash
            next()
        })
    })
})

CadastradosSchema.methods.checkPassword = function(password){
    return new Promise((resolve, reject)=>{
        bcrypt.compare(password, this.password, (err, res)=>{
            res ? resolve(true) : reject();
        })
    })
}

module.exports = mongoose.models.Cadastrado || mongoose.model('Cadastrado', CadastradosSchema);