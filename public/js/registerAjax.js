const errorSpan = document.querySelector('#errorSpan')

document.registerForm.onsubmit = postRegister

async function postRegister(event) {
  event.preventDefault(event);

  const form = event.target;
  const userData = new FormData(form);
  const options = {
    method: 'POST',
    body: new URLSearchParams(userData),
    redirect: 'follow'
  }

  try {
    const response = await fetch(form.action, options)
    if(response.status === 400) {
      const jsonResponse = await response.json()
      if(jsonResponse.errors) {
        errorSpan.innerHTML = jsonResponse.errors[0].msg
      } else {
        console.log(jsonResponse)
        errorSpan.innerHTML = jsonResponse.msg
      }
    } else {
      const location = response.headers.get('location');
      // console.log(location)
      window.location.href = location
    }

  } catch(error) {
    
  }


}