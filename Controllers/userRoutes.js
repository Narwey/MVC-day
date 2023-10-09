const {users} = require('../Models/users.js')
const bcrypt = require('bcrypt')
const passport = require('passport')


const initializePassport = require('../passport.js')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const blog = (checkAuthenticated, (req, res) => {
  res.render('blog.ejs',)
});

const login = (checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

const loginDone = (checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/blogs',
  failureRedirect: '/login',
  failureFlash: true
}))

const registerPage = (checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

const registerDone = (checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: users.length + 1,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

const logOut = function(req, res) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
};

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

module.exports = { initializePassport , 
  blog , 
  login ,
  loginDone, 
  registerPage,
  registerDone,
  logOut,
}
