const express = require('express');
const passport = require('passport');
const initializePassport = require('./passport.js');
const flash = require('express-flash');
const session = require('express-session');
const path = require('path');
const app = express();
const {users} = require('./Models/users');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(flash()); // Add this line for flash messages
app.use(session({
  secret: 'shutItsSecret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(methodOverride('_method'));

// Passport-related initialization and configuration should be here
// Passport-related initialization and configuration should be here

const blogRoutes = require('./routes/blog-route.js');
const userRoutes = require('./routes/user-route.js');

// Include the Passport initialization code here 111
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);

app.use(userRoutes);
app.use(blogRoutes);

app.get("/logout", (req, res) => {
  req.logout(req.user, err => {
    if(err) return next(err);
    res.redirect("/login");
  });
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

  





    