const express = require('express');
const { addTransaction, getAllTransaction, deleteTransaction, updateTransaction, searchTransaction } = require('../controller/TransactionController');
const ValidateToken = require('../middleware/validateToken');



const router = express.Router()

router.post('/', ValidateToken,addTransaction)
router.put('/:id',ValidateToken,updateTransaction)
router.delete('/:id',ValidateToken,deleteTransaction)
router.get('/users/:id',ValidateToken,getAllTransaction)
router.get('/search/:userId/:date',ValidateToken,searchTransaction)

module.exports = router