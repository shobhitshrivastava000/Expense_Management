const express = require("express");
const Account = require("../models/AccountSchema");
const User = require("../models/UserSchema");

const createNewAccount = async (req, res) => {
  try {
    const { userId, name } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      res.status(400).json({ success: false, message: "user not found" });
    }
    const newAccount = await Account.create({
      user: userId,
      name,
    });
    await newAccount.save();
    // user.account.push(newAccount._id);
    // await user.save();

    return res.status(201).json({ success: true, data: newAccount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllAccounts = async (req, res) => {
  try {
    const { userId } = req.params;
    const accounts = await Account.find({ user: userId });
    res.status(200).json({ success: true, data: accounts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateAccount = async (req, res) => {
  try {
    const { name } = req.body;
    const { accountId } = req.params;
    const updateAccount = await Account.findByIdAndUpdate(accountId, {name}, {
      new: true,
    });

    if (!updateAccount) {
        return res.status(404).json({success:false,message:"Account not found"})
    }
    res.status(200).json({success:true,data:updateAccount})
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const {accountId} = req.params;
    const deleteAccount =  await Account.findByIdAndDelete(accountId);
    if (!deleteAccount) {
        return res.status(404).json({success:false,message:"Account not found"})
    }
    res.status(200).json({success:true,message:"Account deleted successfully"})
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createNewAccount,
  getAllAccounts,
  updateAccount,
  deleteAccount,
};
