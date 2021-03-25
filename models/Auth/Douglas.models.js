const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const DouglasSchema = new mongoose.Schema({
    username: String,
    password: String
});

DouglasSchema.pre('save', function(next){
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

DouglasSchema.methods.checkPassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      console.log(this.password)
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

module.exports = mongoose.models.Douglas || mongoose.model('Douglas', DouglasSchema);