const mongoose = require('mongoose')

//Describing the User
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    admin:{
        type: Boolean,
        default: true
    },
    editor:{
        type: Boolean,
        default: true
    },
    writer:{
        type: Boolean,
        default: true
    }
})

module.exports = User = mongoose.model('user', UserSchema)