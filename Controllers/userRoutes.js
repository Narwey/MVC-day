const {users} = require('../../Models/users.js')
const bcrypt = require('bcrypt');

// User registration route (GET)
const registerPage =  (req, res) => {
  res.render('register'); // Render the 'register' view for user registration
};

// User registration route (POST)
const registerDone = (req, res) => {
  try {
    // Get user input from the registration form
    const { email, password } = req.body;

    // Check if the email is already registered (you should validate email uniqueness)
    const isEmailTaken = users.some((user) => user.email === email);
    if (isEmailTaken) {
      return res.render('register', { error: 'Email is already registered' });
    }

    // Hash the user's password securely
    const hashedPassword = bcrypt.hash(password, 10); // 10 is the number of hashing rounds

    // Create a new user object with the hashed password
    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
    };

    // Add the new user to the users array (for simplicity, we're using an array)
    users.push(newUser);

    // Redirect to the login page after successful registration
    res.redirect('/login');
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// User login route (GET)
const login =  (req, res) => {
  res.render('login'); // Render the 'login' view for user login
};

// User login route (POST)
const loginDone = (req, res) => {
  try {
    // Get user input from the login form
    const { email, password } = req.body;

    // Find the user by email (you should retrieve the user from a database)
    const user = users.find((user) => user.email === email);

    // Check if the user exists and the password matches
    if (!user || !( bcrypt.compare(password, user.password))) {
      return res.render('login', { error: 'Invalid email or password' });
    }

    // At this point, the user is successfully authenticated
    // In a real application, you would typically use JWT or sessions to manage the authenticated state
    // Redirect to a user profile page or dashboard after successful login
    res.redirect('/blogs');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { registerPage , registerDone , loginDone , login };
