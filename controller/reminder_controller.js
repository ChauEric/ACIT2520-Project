let database = require('../database').Database;

let remindersController = {
  //let user = database.find((user) => user.name === req.user.name);
  //Not working on its own so I implemented in all functions

  list: (req, res) => {
    let user = database.find((user) => user.name === req.user.name);
    res.render('reminder/index', { reminders: user.reminders });
  },

  new: (req, res) => {
    res.render('reminder/create');
  },

  listOne: (req, res) => {
    let user = database.find((user) => user.name === req.user.name);
    let reminderToFind = req.params.id;
    let searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render('reminder/single-reminder', { reminderItem: searchResult });
    } else {
      res.render('reminder/index', { reminders: user.reminders });
    }
  },

  create: (req, res) => {
    let user = database.find((user) => user.name === req.user.name);
    let reminder = {
      id: user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    user.reminders.push(reminder);
    res.redirect('/reminders');
  },

  edit: (req, res) => {
    let user = database.find((user) => user.name === req.user.name);
    let reminderToFind = req.params.id;
    let searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render('reminder/edit', { reminderItem: searchResult });
  },

  update: (req, res) => {
    let user = database.find((user) => user.name === req.user.name);
    // implementation here 👈
    let reminderToUpdate = req.params.id;
    let existingReminderIndex = user.reminders.findIndex(function (reminder) {
      return reminder.id == reminderToUpdate;
    });

    if (existingReminderIndex !== -1) {
      let existingReminder = user.reminders[existingReminderIndex];

      let completeStatus = req.body.completed === 'true';

      existingReminder.title = req.body.title;
      existingReminder.description = req.body.description;
      existingReminder.completed = completeStatus;

      // id: 1,
      //     title: 'Grocery shopping',
      //     description: 'Buy milk and bread from safeway',
      //     completed: false,
      res.redirect('/reminders');
    }
  },

  delete: (req, res) => {
    let user = database.find((user) => user.name === req.user.name);
    // implementation here 👈
    let reminderToDelete = req.params.id;
    let searchResult = user.reminders.findIndex(function (reminder) {
      return reminder.id == reminderToDelete;
    });
    user.reminders.splice(searchResult, 1);
    res.redirect('/reminders');
  },
};

module.exports = remindersController;
