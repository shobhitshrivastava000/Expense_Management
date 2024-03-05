const mongoose = require('mongoose');
const User = require('./UserSchema')
const TransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
    account:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
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
   
    
},{timestamps:true});

module.exports = mongoose.model('Expense', TransactionSchema);
