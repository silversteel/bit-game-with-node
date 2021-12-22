const db = require('../../database');

async function checkUser(username) {
  try {
    //TODO: Implementation
    return {};
  } catch (error) {
    console.log(error.stack);
    throw error;
  }
}

async function getUser(username, password) {
  try {
    //TODO: Implementation
    return {};
  } catch (error) {
    console.log(error.stack);
    throw error;
  }
}

async function createUser(username, password, email, image, role) {
  try {
    //TODO: Implementation
    return {};
  } catch (error) {
    console.log(error.stack);
    throw error;
  }
}

async function updateUser(username, password, email, image, role) {
  try {
    //TODO: Implementation
    return {};
  } catch (error) {
    console.log(error.stack);
    throw error;
  }
}

async function updateToken(username, token) {
  try {
    //TODO: Implementation
    return {};
  } catch (error) {
    console.log(error.stack);
    throw error;
  }
}

async function checkToken(token) {
  try {
    //TODO: Implementation
    return {};
  } catch (error) {
    console.log(error.stack);
    throw error;
  }
}

module.exports = {
  getUser,
  createUser,
  checkUser,
  updateUser,
  updateToken,
  checkToken
}