const User = require('../models/User');
const { success, error } = require('../utils/response');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    success(res, user);
  } catch (err) {
    error(res, err.message);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    success(res, users);
  } catch (err) {
    error(res, err.message);
  }
};
