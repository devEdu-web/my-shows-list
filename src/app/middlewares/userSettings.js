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

function validatePicture(req, res, next) {
  const picture = req.file
  if(!picture) return res.status(400).json({
    msg: 'Size or format not supported.'
  })

  if(picture.size > 2000000) {
    return res.status(400).json({
      msg: 'Size or format not supported.'
    })
  }
  next()
}

module.exports = {
  checkIfEmailExists,
  validatePicture
}