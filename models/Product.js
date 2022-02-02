const mongoose = require('mongoose');
const schema = mongoose.Schema

const dbProduct = new schema({
    title: {
        type: String,
        lowercase: true
    },
    price: {
        type: Number,
        default: '0'
    },
    img: {
        type: String,
    },
    sale: Number,
    category: {
        type: String,
        default: ''
    },
    aboutPro: String,
    phone: Number,
    timePro: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('mahsulot', dbProduct)

