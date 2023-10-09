const express = require('express');
const router = express.Router();

const {getBlog , deletePost , editBlog , findBlog , addBlog, add, saveNewBlog}  = require('../Controllers/blogRoutes.js');

router.get('/add',add);
router.get('/blogs' , getBlog);
router.get('/edit/:id',findBlog);
router.post('/edit', editBlog);
router.post('/:id/delete',deletePost);
router.post('/add', addBlog);
router.post('/add', saveNewBlog);

module.exports = router;