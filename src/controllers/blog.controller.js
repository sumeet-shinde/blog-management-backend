const express = require("express");

const router = express.Router();

const Blog = require("../models/blog.model");

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

router.post("/addBlog", async (req, res) => {
  try {
    let blog = await Blog.create(req.body);
    return res.status(202).send(blog);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
});

router.patch("/publishBlog/:id", async (req, res) => {
  try {
    let blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(202).send(blog);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
});

router.get("/getUsersBlogs/:id", async (req, res) => {
  try {
    let blog = await Blog.find({ user_id: req.params.id }).lean().exec();
    return res.status(202).send(blog);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
});

router.patch("/likeBlog/:userid/:id", async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id).lean().exec();

    let like = blog.likes.length;

    let blogs = await Blog.findByIdAndUpdate(
      { _id: req.params.id },
      { $addToSet: { likes: req.params.userid }, $set: { likesCount: like } },
      {
        new: true,
      }
    )
      .lean()
      .exec();
    return res.status(202).send(blogs);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
});

router.get("/searchBlogs/:name", async (req, res) => {
  try {
    const regex = new RegExp(escapeRegex(req.params.name), "gi");
    const blog = await Blog.find({
      title: regex,
    })
      .lean()
      .exec();
    return res.status(202).send(blog);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/getBlogs", async (req, res) => {
  try {
    const blog = await Blog.find({ publish: true }).lean().exec();
    return res.status(202).send(blog);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
