const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(`mongodb+srv://leonsua:${process.env.PASSWORD}@hangman-user.ox1up.mongodb.net/?retryWrites=true&w=majority&appName=hangman-user`);
  console.log("Mongo DB connected");
};

module.exports = connectDB;