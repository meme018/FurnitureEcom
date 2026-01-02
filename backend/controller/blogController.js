const Blog = require("../model/blogModel.js");

// Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const { title, description, image, author, category } = req.body;
    const newBlog = await Blog.create({
      title,
      description,
      image,
      author,
      category,
    });

    res.status(201).json({
      message: "Blog post created successfully",
      data: newBlog,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all blog posts
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      message: "Blogs retrieved successfully",
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get blog post by ID
exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.status(200).json({
      message: "Blog post retrieved successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update blog post by ID
exports.updateBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.status(200).json({
      message: "Blog post updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete blog post by ID
exports.deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.status(200).json({
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
