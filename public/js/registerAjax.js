const errorSpan = document.querySelector('#errorSpan');
const ajax = new Ajax()

document.registerForm.onsubmit = postRegister;

async function postRegister(event) {
  event.preventDefault(event);
  const form = event.target
  try {
    await ajax.postAuth(form, errorSpan, successSpan)
  } catch(error) {
    throw error
  }
}