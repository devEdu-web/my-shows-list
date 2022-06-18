const errorSpan = document.querySelector('#errorSpan');
const resetForm = document.querySelector('#resetForm');
const ajax = new Ajax();

document.resetForm.onsubmit = postResetPassword;

async function postResetPassword(event) {
  event.preventDefault(event);
  const form = event.target;
  try {
    await ajax.postAuth(form, errorSpan);
  } catch (error) {
    throw error;
  }
}
