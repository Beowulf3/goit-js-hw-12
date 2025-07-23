import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  hideLoader,
  showLoader,
} from './js/render-functions';
import xmark from './img/xmark.png';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');

form.addEventListener('submit', event => {
  event.preventDefault();
  clearGallery();
  if (!input.value) {
    iziError('Empty input. Please type images you want ot find!');
    return;
  }
  showLoader();
  getImagesByQuery(input.value.trim())
    .then(data => {
      if (!data.length) {
        iziError(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        return;
      }
      createGallery(data);
      iziToast.success({
        message: 'This is what was found!',
        position: 'topLeft',
        messageSize: 16,
        messageLineHeight: 24,
        closeOnEscape: true,
        closeOnClick: true,
      });
    })
    .catch(error => {
      iziError('Oops... Something went wrong. Please, try again!');
    })
    .finally(() => {
      hideLoader();
    });
});

export function iziError(msg) {
  iziToast.error({
    message: msg,
    messageColor: '#fafafb',
    messageSize: 16,
    messageLineHeight: 24,
    position: 'topRight',
    displayMode: 'replace',
    closeOnEscape: true,
    closeOnClick: true,
    iconUrl: xmark,
    theme: 'dark',
    backgroundColor: '#ef4040',
    maxWidth: 432,
  });
}
