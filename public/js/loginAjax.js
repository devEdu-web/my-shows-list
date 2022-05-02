const errorSpan = document.querySelector('#errorSpan');

document.loginForm.onsubmit = postLogin;

async function postLogin(event) {
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
      errorSpan.innerHTML = jsonResponse.msg;
    } else {
      const location = response.headers.get('location');
      window.location.href = response.url;
    }
  } catch (error) {
    errorSpan.innerHTML = error.message;
  }
}
