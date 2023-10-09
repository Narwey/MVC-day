const { blogPosts } = require('../Models/blog.js');

const saveNewBlog = (req, res) => {
  // Implement logic to save the new blog post to your data source (e.g., an array or a database)
  // You can access the blog post data from the request body (req.body)

  // For example, you can add the new post to the blogPosts array (if it's an array-based data source)
  const { title, content, author, releaseYear } = req.body;
  const newPost = {
    id: blogPosts.length + 1, // Generate a unique ID (adjust as needed)
    title,
    content,
    author,
    releaseYear,
  };
  blogPosts.push(newPost);

  // After adding the new post, you can redirect to the main blog page or display a success message
  res.redirect('/blogs'); // Redirect to the main blog page after adding
};

const add =  (req, res) => {
  res.render('add'); // You can create an 'add' template for the form
};
const getBlog = (req, res) => {
    res.render('blog', {blogPosts}); // Render the 'blog' template and pass 'blogPosts' data
  };

const addBlog = (req, res) => {
  // Get data from the request body
  const { title, content, author, releaseYear  } = req.body;
  console.log(req.body);

  // Generate a new unique ID for the new blog post (You can use a more robust method)
  const newPostId = blogPosts.length + 1;

  // Create a new blog post object
  const newPost = {
    id: newPostId,
    title,
    content,
    author,
    releaseYear,
  };

  // Add the new blog post to the array
  blogPosts.push(newPost);

  // Redirect to the main blog page after adding
  res.redirect('/blogs');
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
    console.log(req.body);
    // const postId = parseInt(req.params.id);
    const { title, content, author, releaseYear , id } = req.body;
    const post = blogPosts.find((post) => post.id == id);
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
  
  module.exports = {getBlog , addBlog , deletePost , editBlog , findBlog, add , saveNewBlog} ;