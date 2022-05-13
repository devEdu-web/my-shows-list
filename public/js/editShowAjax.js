const errorSpan = document.querySelector('#errorSpan');
const successSpan = document.querySelector('#successSpan');
const ajax = new Ajax();
document.editShowForm.onsubmit = updateShow;

async function updateShow(event) {
  event.preventDefault(event);
  const form = event.target;
  try {
    await ajax.postUpdateAndAdd(form);
  } catch (error) {
    throw error
  }
}
