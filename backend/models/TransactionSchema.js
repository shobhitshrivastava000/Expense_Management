const mongoose = require('mongoose');
const User = require('./UserSchema')
const TransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    // createdAt:{
    //     type: Date,
    //     default:Date.now
    // }
    
},{timestamps:true});

module.exports = mongoose.model('Expense', TransactionSchema);
