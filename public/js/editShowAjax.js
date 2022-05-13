const errorSpan = document.querySelector('#errorSpan');
const successSpan = document.querySelector('#successSpan');
const ajax = new Ajax()
document.editShowForm.onsubmit = addToList;



async function addToList(event) {
  event.preventDefault(event);
  const form = event.target
  try { 
    await ajax.postUpdate(form)
  } catch(error) {
    console.log(error)
  }
}

// async function addToList(event) {
//   event.preventDefault(event);
//   const form = event.target;
//   const userData = new FormData(form);
//   const fetchOptions = {
//     method: 'POST',
//     body: new URLSearchParams(userData),
//     redirect: 'follow',
//   };

//   try {
//     const response = await fetch(form.action, fetchOptions);
//     if (response.status === 400) {
//       const error = await response.json();
//       successSpan.innerHTML = '';
//       errorSpan.innerHTML = error.msg;
//     } else {
//       errorSpan.innerHTML = '';
//       successSpan.innerHTML = 'Updated';
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
