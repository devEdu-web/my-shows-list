const { isUserAuthenticated, isUserAuthorized } = require('./permissions')
const { doesUserHaveShowInList, doesUserHaveMovieInList } = require('./userList')
const { checkIfEmailExists } = require('./userSettings')
const { registerValidation, updateEmailValidation, updatePasswordValidation } = require('./validation')


module.exports = {
  isUserAuthenticated,
  isUserAuthorized,
  doesUserHaveShowInList,
  doesUserHaveMovieInList,
  checkIfEmailExists,
  registerValidation,
  updateEmailValidation,
  updatePasswordValidation
}