const User = require('../models/User.js');

exports.register = async (req, res) => {
  const {username, email, password} = req.body;

  try {
    const user = await User.create({
      username, email, password
    });
    res.status(200).json({"User": user});
  } catch (error) {
    res.json({"Error": error})
  }
}