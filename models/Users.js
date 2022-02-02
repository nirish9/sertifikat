const mongoose = require('mongoose');
const schema = mongoose.Schema

const dbUsers = new schema({
    name: {
        type: String
    },
    surname: {
        type: String
    },
    login: {
        type: String
    },
    phone_number: {
        type: Number
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
})

module.exports = mongoose.model('userDB' , dbUsers)
