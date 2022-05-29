const Users = require("../models/user.model");

const register = async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email }).lean().exec();

    if (user) {
      return res.status(400).send({ message: "Please try another email" });
    }

    user = await Users.create(req.body);

    res.send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(400)
        .send({ message: "Please check your email or password" });
    }

    const match = user.checkPassword(req.body.password);

    if (!match) {
      return res
        .status(400)
        .send({ message: "Please check your email or password" });
    }

    res.send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { register, login };
