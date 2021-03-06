const {
  authenticateUser,
  signJWT,
  GetUser,
} = require("../services/authService");
const { createUser, createAdmin } = require("../services/userService");
const { validationResult } = require("express-validator");
const utils = require("../utils/utils");

exports.Login = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await authenticateUser({ email, password });
    const token = await signJWT(user.email);
    //console.log(token);
    const userObj = utils.getCleanUser(user);
    return res.json({ user: userObj, token });
  } catch (error) {
    return res.status(401).json({ errors: error });
  }
};

exports.Register = async function (req, res) {
  //console.log(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    email,
    password,
    firstName,
    lastName,
    age,
    gender,
    country,
    state,
    organization,
    phone,
  } = req.body;
  try {
    const createdUser = await createUser({
      email,
      password,
      firstName,
      lastName,
      age,
      gender,
      country,
      state,
      organization,
      phone,
    });
    // console.log(createdUser);
    delete createdUser.password;
    return res.send(createdUser);
  } catch (error) {
    res.status(402).json({ errors: error });
  }
};

exports.GetMyProfile = async function (req, res) {
  return res.status(200).json({ message: "WIP" });
};
exports.RegisterAdmin = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password, firstName, lastName, age, gender } = req.body;
  try {
    const createdAdmin = await createAdmin({
      email,
      password,
    });
    // console.log(createdUser);
    delete createdAdmin.password;
    return res.send(createdAdmin);
  } catch (error) {
    res.status(402).json({ errors: error });
  }
};

exports.GetUserProfile = async function (req, res) {
  try {
    const { email } = req.body;
    // console.log(email);
    const user = await GetUser({ email });
    console.log(user);
    // const userObj = utils.getCleanUser(user);
    return res.status(200).json({ user });
  } catch (error) {
    res.status(402).json({ errors: error });
  }
};
