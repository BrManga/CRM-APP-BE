const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: [true, "Email is mandatory"]
  },
  pass: {
    type: String,
    required: [true, "Password is mandatory"]
  }
});
module.exports = mongoose.model("user", userSchema);
/* 
const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is mandatory"]
  },
  email: {
    type: String,
    required: [true, "Email is mandatory"]
  },
  pass: {
    type: String,
    required: [true, "Password is mandatory"]
  }
});

module.exports = login = mongoose.model("user", loginSchema); */


