const express = require('express');

const ValidateToken = require('../middleware/validateToken');
const { createNewAccount, getAllAccounts, updateAccount, deleteAccount } = require('../controller/AccountController');
const { addExpense, getAllExpense, updateExpense, deleteExpense, searchTransaction } = require('../controller/TransactionController');


const router = express.Router()



//
router.post('/account/createaccount',ValidateToken,createNewAccount)
router.get('/account/:userId',ValidateToken,getAllAccounts)
router.put('/account/update/:accountId',ValidateToken,updateAccount)
router.delete('/account/delete/:accountId',ValidateToken,deleteAccount)
//
router.post('/expense/',ValidateToken,addExpense);
router.get('/expense/:accountId',ValidateToken,getAllExpense);
router.put('/expense/update',ValidateToken,updateExpense);
router.patch('/expense/delete',ValidateToken,deleteExpense)
router.get('/expense/search/:userId/:date',ValidateToken,searchTransaction)




module.exports = router