const updatePasswordErrorSpan = document.querySelector(
  '#updatePasswordErrorSpan'
);
const updatePasswordSuccessSpan = document.querySelector(
  '#updatePasswordSuccessSpan'
);

document.updatePassword.onsubmit = updatePassword;

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
        updatePasswordErrorSpan.innerHTML = '';
        updatePasswordErrorSpan.innerHTML = jsonResponse.msg;
      }
    } else {
      const jsonResponse = await response.json();
      updatePasswordSuccessSpan.innerHTML = jsonResponse.msg;
    }
  } catch (error) {
    console.log(error);
  }
}
