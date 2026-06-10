const Blog = require('../models/blogs.js')


exports.createBlog = async (req, res) => {

    try {

        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and Content are required"
            });
        }

        let image = "";

        if (req.file) {
            image = req.file.filename;
        }

        const newBlog = await Blog.create({
            title,
            content,
            image,
            user: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: newBlog
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }

};

exports.getBlogs = async (req, res) => {

    try {


        const blogs = await Blog.find()
  .populate("user", "name")
  .populate("likes", "name");

        res.status(200).json({
            success: true,
            count: blogs.length,
            data: blogs
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.likeBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user.id;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    // Prevent duplicate likes
    if (blog.likes.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "Already liked"
      });
    }

    blog.likes.push(userId);

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog liked successfully"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};