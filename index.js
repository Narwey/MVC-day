const express = require('express');
const passport = require('passport');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


const blogRoutes = require('./routes/blog-route.js');
const userRoutes = require('./routes/user-route.js');

app.use(userRoutes);
app.use(blogRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
  





    