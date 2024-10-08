const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    require: [true, "Please provide a valid user name"],
    unique: true,
    type: String
  },
  email: {
    require: [true, "Please provide a valid email"],
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/],
    unique: true,
    type: String
  },
  password: {
    require: [true, "Please provide a valid password"],
    type: String,
    minlength: 10,
    select: false 
  }
});

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    next()
  }

  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

