const errorSpan = document.querySelector('#errorSpan');
const successSpan = document.querySelector('#successSpan');
const ajax = new Ajax()
document.addForm.onsubmit = addToList;

async function addToList(event) {
  event.preventDefault(event);
  const form = event.target;
  try {
    await ajax.postUpdateAndAdd(form);
  } catch (error) {
    console.log(error);
  }
}