const updatePasswordErrorSpan = document.querySelector('#updatePasswordErrorSpan');
const updatePasswordSuccessSpan = document.querySelector('#updatePasswordSuccessSpan');

const updateEmailErrorSpan = document.querySelector('#updateEmailErrorSpan')
const updateEmailSuccessSpan = document.querySelector('#updateEmailSuccessSpan')

document.updatePassword.onsubmit = updatePassword;
document.updateEmail.onsubmit = updateEmail

// TODO: Remove errors or success messages with time out

async function updatePassword(event) {
  event.preventDefault(event);
  const form = event.target;
  const userData = new FormData(form);
  const fetchOptions = {
    method: 'POST',
    body: new URLSearchParams(userData),
    redirect: 'follow',
  };
  try {
    const response = await fetch(form.action, fetchOptions);
    if (response.status === 400) {
      const jsonResponse = await response.json();
      if (jsonResponse.errors) {
        updatePasswordSuccessSpan.innerHTML = '';
        updatePasswordErrorSpan.innerHTML = jsonResponse.errors[0].msg;
      } else {
        updatePasswordErrorSpan.innerHTML = jsonResponse.msg;
      }
    } else {
      const jsonResponse = await response.json();
      updatePasswordErrorSpan.innerHTML = ''
      updatePasswordSuccessSpan.innerHTML = jsonResponse.msg;
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateEmail(event) {
  event.preventDefault(event)
  const form = event.target;
  const userData = new FormData(form);
  const fetchOptions = {
    method: 'POST',
    body: new URLSearchParams(userData),
    redirect: 'follow',
  };
  try {
    const response = await fetch(form.action, fetchOptions);
    if (response.status === 400) {
      const jsonResponse = await response.json();
      if (jsonResponse.errors) {
        updateEmailSuccessSpan.innerHTML = '';
        updateEmailErrorSpan.innerHTML = jsonResponse.errors[0].msg;
      } else {
        updateEmailErrorSpan.innerHTML = jsonResponse.msg;
      }
    } else {
      const jsonResponse = await response.json();
      updateEmailErrorSpan.innerHTML = ''
      updateEmailSuccessSpan.innerHTML = jsonResponse.msg;
    }
  } catch (error) {
    console.log(error);
  }
}
