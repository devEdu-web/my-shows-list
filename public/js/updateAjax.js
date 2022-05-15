const ajax = new Ajax()

const updatePasswordErrorSpan = document.querySelector('#updatePasswordErrorSpan');
const updatePasswordSuccessSpan = document.querySelector('#updatePasswordSuccessSpan');

const updateEmailErrorSpan = document.querySelector('#updateEmailErrorSpan')
const updateEmailSuccessSpan = document.querySelector('#updateEmailSuccessSpan')

const updatePictureErrorSpan = document.querySelector('#updatePictureErrorSpan')
const updatePictureSuccessSpan = document.querySelector('#updatePictureSuccessSpan')

document.updatePassword.onsubmit = updatePassword;
document.updateEmail.onsubmit = updateEmail
document.updatePicture.onsubmit = 
// TODO: Remove errors or success messages with time out

async function updatePicture(event) {
  event.preventDefault(event)
  const form = event.target 
  try {
    await ajax.updatePicture(form, updatePictureErrorSpan, updatePictureSuccessSpan)
  } catch(error) {
    throw error
  }
}

async function updatePassword(event) {
  event.preventDefault(event);
  const form = event.target
  try {
    await ajax.postUpdateAndAdd(form, updatePasswordErrorSpan, updatePasswordSuccessSpan)
  } catch(error) {
    throw error
  }
}

async function updateEmail(event) {
  event.preventDefault(event);
  const form = event.target
  try {
    await ajax.postUpdateAndAdd(form, updateEmailErrorSpan, updateEmailSuccessSpan)
  } catch(error) {
    throw error
  }
}
