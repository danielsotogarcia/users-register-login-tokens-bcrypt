const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creamos nuestro modelo del documento
const userSchema = new Schema({
    email: String,
    password: String,
}, {
    versionKey: false
});

//exportamos el modelo
module.exports = mongoose.model('Users', userSchema);