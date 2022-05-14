const ajax = new Ajax()

const updatePasswordErrorSpan = document.querySelector('#updatePasswordErrorSpan');
const updatePasswordSuccessSpan = document.querySelector('#updatePasswordSuccessSpan');

const updateEmailErrorSpan = document.querySelector('#updateEmailErrorSpan')
const updateEmailSuccessSpan = document.querySelector('#updateEmailSuccessSpan')

document.updatePassword.onsubmit = updatePassword;
document.updateEmail.onsubmit = updateEmail

// TODO: Remove errors or success messages with time out

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
