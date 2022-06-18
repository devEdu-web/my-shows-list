const {
  isUserAuthenticated,
  isUserAuthorized,
  doesUserHaveShowInList,
  doesUserHaveMovieInList,
  checkIfEmailExists,
  validatePicture,
  isUserEmailVerified,
} = require('./main');

const {
  registerValidation,
  updateEmailValidation,
  updatePasswordValidation,
  resetPasswordValidation,
} = require('./validation');

module.exports = {
  isUserAuthenticated,
  isUserAuthorized,
  doesUserHaveShowInList,
  doesUserHaveMovieInList,
  checkIfEmailExists,
  registerValidation,
  updateEmailValidation,
  updatePasswordValidation,
  validatePicture,
  isUserEmailVerified,
  resetPasswordValidation,
};
