const express = require("express");

const connect = require("./configs/db");

const app = express();

const { login, register } = require("./controllers/auth.controller");

const BlogController = require("./controllers/blog.controller");

app.use(express.json());

app.post("/register", register);

app.post("/login", login);

app.use("/blog", BlogController);

app.listen(8080, async (req, res) => {
  try {
    await connect();
    console.log("Listening on 8080");
  } catch (error) {
    console.log(error.message);
  }
});
