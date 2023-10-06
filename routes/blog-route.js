const express = require('express');
const router = express.Router();

const {getBlog , deletePost , editBlog , findBlog}  = require('../MVC-day/Controllers/blogRoutes.js');

router.get('/blogs' , getBlog);
router.get('/:id/edit',findBlog);
router.put('/:id/edit', editBlog); 
router.post('/:id/delete',deletePost);

module.exports = router;