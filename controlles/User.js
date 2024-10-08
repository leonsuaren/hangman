const User = require('../models/User.js');

exports.register = async (req, res) => {
  const {username, email, password} = req.body;
  try {
    if (!username || !email || !password) {
      res.status(500).json({message: "All fields are require!"});
    }
    const user = await User.create({
      username, email, password
    });
    if (!user) {
      res.status(500).json({message: "All fields are require!"});
    }
    res.status(200).json({"User": user});
  } catch (error) {
    res.json({"Error": error})
  }
}