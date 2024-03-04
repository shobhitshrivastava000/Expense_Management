const Expense = require("../models/TransactionSchema");
const User = require("../models/UserSchema");

const addTransaction = async (req, res) => {
  try {
    const { amount, description, category, userId } = req.body;
    // console.log(req.body);
    if (!amount || !description || !category || !userId) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }



    const newExpense = await Expense.create({
      amount,
      description,
      category,
      userId,
    });

    newExpense.save();



    res.status(201).send({
      success: true,
      message: "Added succesfully",
      newExpense,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Internal Server Errror While Adding" });
  }
};

//update expense controller
const updateTransaction = async (req, res) => {
  try {
    const { amount, description, category } = req.body;

    const id = req.params.id;

    const expense = await Expense.findById(id);
    
    if (!expense) {
      return res.status(404).send({
        success: false,
        message: "expense not found",
      });
    }
    // if (expense.userId.toString() !== req.user.id) {
    //   res.status(403);
    //   throw new Error("User don't have permission to update");
    // }

    const updatedExpense = await Expense.findByIdAndUpdate(id, {
      amount,
      description,
      category,
    });

    updatedExpense.save();
    res.status(200).json(updatedExpense).send({
      success: true,
      message: "Updated Successfully",
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

//delete expense controller
const deleteTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).send({
        success: false,
        message: "expense not found",
      });
    }
    const deleteExpense = await Expense.findByIdAndDelete(id);
    deleteExpense.save();

    return res.status(200).send({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

//getAll expense controller
const getAllTransaction = async (req, res) => {
  try {
   
    const { userId } = req.params;
    const expenses = await Expense.find(userId);
    if (expenses.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No expenses found",
      });
    }
    return res.status(200).json(expenses);
  } catch (error) {
    return res.status(500).send({ message: error.message });
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
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getAllTransaction,
  searchTransaction,
};
