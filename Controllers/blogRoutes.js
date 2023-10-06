const { blogPosts } = require('../../Models/blog.js');

  const getBlog = (req, res) => {
    res.render('blog', {blogPosts}); // Render the 'blog' template and pass 'blogPosts' data
  };
  

  const findBlog = (req, res) => {
    const postId = parseInt(req.params.id);
    const post = blogPosts.find((post) => post.id === postId);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
  }
      res.render('edit', { post }); // Render the 'edit' template and pass the post data
  };

  
  // Create a new blog post
const editBlog = (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content, author, releaseYear } = req.body;
    const post = blogPosts.find((post) => post.id === postId);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    post.title = title;
    post.content = content;
    post.author = author;
    post.releaseYear = releaseYear;
    res.redirect('/blogs'); // Redirect to the main blog page after updating
  };
    
  // Delete a blog post by ID
  const deletePost =  (req, res) => {
    const postId = parseInt(req.params.id);
    const index = blogPosts.findIndex((post) => post.id === postId);
    if (index === -1) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    blogPosts.splice(index, 1);
    res.redirect('/blogs'); // Redirect to the main blog page after deleting
  };
  
  module.exports = {getBlog , deletePost , editBlog , findBlog} ;