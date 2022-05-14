const errorSpan = document.querySelector('#errorSpan');
const loginForm = document.querySelector('#loginForm')
const ajax = new Ajax()

document.loginForm.onsubmit = postLogin;

async function postLogin(event) {
  event.preventDefault(event);
  const form = event.target
  try {
    await ajax.postAuth(form, errorSpan)
  } catch(error) {
    throw error
  }
}