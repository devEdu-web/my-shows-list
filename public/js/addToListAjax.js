const errorSpan = document.querySelector('#errorSpan');
const successSpan = document.querySelector('#successSpan');
const formContainer = document.querySelector('.form-container')
const form = document.querySelector('#add-to-list-form')

const ajax = new Ajax()
document.addForm.onsubmit = addToList;

async function addToList(event) {
  event.preventDefault(event);
  const form = event.target;
  try {
    await ajax.postUpdateAndAdd(form, errorSpan, successSpan);
    removeForm()
    createAlreadyOnListButton()
  } catch (error) {
    throw error
  }
}

function removeForm() {
  formContainer.removeChild(form)
}

function createAlreadyOnListButton() {
  const button = document.createElement('div')
  button.classList.add('btn', 'btn-success', 'mt-2')
  button.innerHTML = '<span>Item on list.</span>'
  formContainer.appendChild(button)
}