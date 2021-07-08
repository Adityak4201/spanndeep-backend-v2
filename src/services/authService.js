const User = require("../models/user");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

exports.authenticateUser = async (credentials) => {
  try {
    const user = await User.findOne({ email: credentials.email });
    if (!user) {
      throw "Invalid Credentials";
    }
    if (await argon2.verify(user.password, credentials.password)) {
      delete user.password;
      // console.log(user);
      return user;
    } else {
      throw "Invalid Credentials";
    }
  } catch (error) {
    throw error;
  }
};

exports.signJWT = async (email) => {
  const payload = {
    user: {
      email,
    },
  };

  const jwtoken = jwt.sign(payload, process.env.COOKIE_SECRET, {
    expiresIn: 10000,
  });
  if (jwtoken) return jwtoken;
  throw "Error signing JWT";
};

exports.GetUser = async (credentials) => {
  // console.log(credentials);
  try {
    const user = await User.findOne({ email: credentials.email });
    console.log("user", user);
    // if (!user) {
    //   throw "Invalid Credentials";
    // }
  } catch (error) {
    throw error;
  }
};
