const User = require('../schemas/User')

async function checkIfEmailExists(req, res, next) {
  const { newEmail } = req.body;
  try {
    const findExistingEmail = await User.findOne({ email: newEmail });
    if (findExistingEmail) 
      throw new Error('Email already in use.');
    next()
  } catch(error) {
    res.status(400).json({
      msg: error.message
    })
  }
}

module.exports = {
  checkIfEmailExists
}