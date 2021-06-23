/* eslint-disable no-console */
const { User } = require('../../models/User');

module.exports = async (userData) => {
  let newUser;
  try {
    newUser = new User(userData);
    await newUser.save();
  } catch (error) {
    console.log(error);
  }
  return newUser;
};
