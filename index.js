// This is a change.
// This is another change.
const express = require('express');
const app = express();
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const reminderController = require('./controller/reminder_controller');
const authController = require('./controller/auth_controller');
const session = require('express-session');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require('./middleware/passport');
app.use(passport.initialize());
app.use(passport.session());

// Checks if passport session is valid
function isValidSession(req) {
  console.log('Session is authenticated!');
  return req.isAuthenticated();
}
// Routes start here
app.get(
  '/reminders',
  function (req, res, next) {
    // if the passport session is not valid, redirects to login page
    if (!isValidSession(req)) {
      console.log('User not logged in, redirected');
      return res.redirect('login');
    }
    next();
  },
  reminderController.list
);
// app.get('/reminders', reminderController.list);
app.get('/reminder/new', reminderController.new);
app.get('/reminder/:id', reminderController.listOne);
app.get('/reminder/:id/edit', reminderController.edit);
app.post('/reminder/', reminderController.create);
// ⭐ Implement these two routes below!
app.post('/reminder/update/:id', reminderController.update);
app.post('/reminder/delete/:id', reminderController.delete);

// 👌 Ignore for now
app.get('/register', authController.register);
app.get('/login', authController.login);
app.post('/register', authController.registerSubmit);
// app.post('/login', authController.loginSubmit);

app.post(
  '/auth/login',
  passport.authenticate('local', {
    successRedirect: '/reminders',
    failureRedirect: '/auth/login',
  })
);

const authRoutes =require('express-session');
app.use('/auth', authRoutes);


app.listen(3001, function () {
  console.log(
    'Server running. Visit: http://localhost:3001/reminders in your browser 🚀'
  );
});

// Another change from Lanz

// This is my change
