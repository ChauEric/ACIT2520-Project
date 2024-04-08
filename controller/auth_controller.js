let database = require('../database');

let authController = {
  login: (req, res) => {
    res.render('login');
  },

  register: (req, res) => {
    res.render('auth/register');
  },

  loginSubmit: (req, res) => {
    // implement later
    res.render('auth/reminders');
  },

  registerSubmit: (req, res) => {
    // implement later
  },
};

module.exports = authController;
