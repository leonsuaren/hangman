const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(`mongodb+srv://leonsua:${process.env.PASSWORD}@cluster0.mtlm3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
  console.log("Mongo DB connected");
};

module.exports = connectDB;