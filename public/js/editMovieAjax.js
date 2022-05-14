const errorSpan = document.querySelector('#errorSpan');
const successSpan = document.querySelector('#successSpan');
const ajax = new Ajax();

document.editMovieForm.onsubmit = updateMovie;

async function updateMovie(event) {
  event.preventDefault(event);
  const form = event.target;
  try {
    await ajax.postUpdateAndAdd(form, errorSpan, successSpan);
  } catch (error) {
    throw error
  }
}
