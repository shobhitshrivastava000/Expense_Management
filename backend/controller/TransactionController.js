const Expense = require("../models/TransactionSchema");
const Account = require("../models/AccountSchema");

//add transaction
const addExpense = async (req, res) => {
  try {
    const { userId, accountId, amount, description, category } = req.body;
    const account = await Account.findById(accountId);
    if (!account) {
      return res
        .status(404)
        .json({ success: true, message: "Account not found" });
    }
    const transaction = await Expense.create({
      userId,
      account: accountId,
      amount,
      description,
      category,
    });

    await transaction.save();

    const updateAccount = await Account.findById(accountId);

    updateAccount.transactions.push(transaction._id);

    await updateAccount.save();

    res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get all transaction
const getAllExpense = async (req, res) => {
  try {
    const { accountId } = req.params;
    const transaction = await Expense.find({ account: accountId });
    res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { amount, description, category, transactionId } = req.body;
    // const { transactionId } = req.params;
    const updateTransaction = await Expense.findByIdAndUpdate(
      transactionId,
      { amount, description, category },
      { new: true }
    );
    if (!updateTransaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }
    res.status(200).json({ success: true, data: updateTransaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { accountId, transactionId } = req.body;

    const account = await Account.findById(accountId);
    if (!account) {
      return res
        .status(404)
        .json({ success: false, message: "Account not found" });
    }

    const expenseIndex = account.transactions.findIndex(
      (transaction) => transaction._id.toString() === transactionId
    );

    if (expenseIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    
    // Remove the transaction from the account's transactions array
    account.transactions.splice(expenseIndex, 1);
    
    // Save the updated account document
    await account.save();
    
    await Expense.findByIdAndDelete(transactionId);

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const searchTransaction = async (req, res) => {
  try {
    const { userId, date } = req.params;

    if (!userId || !date) {
      return res.status(400).json({
        success: false,
        message: "userId and timestamp are required",
      });
    }
    const dateIs = new Date(date);
    const searchQuery = {
      userId: userId,
      createdAt: {
        $gte: dateIs,
        $lt: new Date(dateIs.getTime() + 24 * 60 * 60 * 1000),
      },
    };
    const expense = await Expense.find(searchQuery);
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addExpense,
  getAllExpense,
  updateExpense,
  deleteExpense,
  searchTransaction,
};
