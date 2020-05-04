const User = require("./user");

const getUserById = (id) => {
  return User.findById(id).exec();
};

const getAllUsers = () => {
  return User.find({});
};

const createUser = (userDetails) => {
  return User.create(userDetails);
};
const removeUserById = (id) => {
  return User.findByIdAndRemove(id).exec();
};

const updateUserById = (id, update) => {
  return User.findByIdAndUpdate(id, update, { new: true });
};

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  removeUserById,
  updateUserById,
};
