const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    isDeleted : {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null)
}

UserSchema.methods.validPassword = function (password) { 
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("User" , UserSchema);