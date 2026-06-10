const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

const {
  createBlog,
  getBlogs,
  likeBlog
} = require("../Controller/blogs");

const authMiddleware = require("../middleware/auth");

router.post(
    "/add-blog",
    authMiddleware,
    upload.single("image"),
    createBlog
);
router.get("/get-blog", authMiddleware, getBlogs);
router.put("/like-blog/:id", authMiddleware, likeBlog);

module.exports = router;