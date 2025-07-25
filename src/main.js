import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery, per_page } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  hideLoader,
  showLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  loadMoreBtn,
} from './js/render-functions';
import xmark from './img/xmark.png';

const form = document.querySelector('.form');
const input = document.querySelector("input[name='search-text']");

let userQuery = '';
let pageNumber = 1;
let totalPages = 0;

async function onSearch() {
  pageNumber = 1;
  clearGallery();
  hideLoadMoreButton();
  if (!input.value.trim()) {
    iziError('Empty input. Please type images you want ot find!');
    return;
  }
  showLoader();
  try {
    const data = await getImagesByQuery(input.value.trim(), pageNumber);
    if (!data.hits.length) {
      iziError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }
    userQuery = input.value.trim();
    totalPages = Math.ceil(data.totalHits / per_page);
    createGallery(data.hits);
    iziToast.success({
      message: 'This is what was found!',
      position: 'topLeft',
      messageSize: 16,
      messageLineHeight: 24,
      closeOnEscape: true,
      closeOnClick: true,
    });
    if (pageNumber === totalPages) {
      return;
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.log(error);
    iziError('Oops... Something went wrong. Please, try again!');
  } finally {
    hideLoader();
  }
}

async function loadMore() {
  hideLoadMoreButton();
  pageNumber += 1;
  showLoader();
  try {
    const data = await getImagesByQuery(userQuery, pageNumber);
    createGallery(data.hits);
    const card = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;
    window.scrollBy({
      top: card * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    handleError(error);
  } finally {
    hideLoader();
    if (pageNumber === totalPages) {
      iziToast.warning({
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: '#0c0c0c',
        messageSize: 16,
        messageLineHeight: 24,
        position: 'bottomCenter',
        closeOnEscape: true,
        closeOnClick: true,
      });
      hideLoadMoreButton();
      return;
    }
    showLoadMoreButton();
  }
}

function iziError(msg) {
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

function handleError(error) {
  const status = error.response?.status;
  switch (status) {
    case 429:
      iziError("Don't push the horses! Too many requests.");
      break;
    case 401:
      iziError('Access denied.');
      break;
    case 404:
      iziError('Resource not found');
      break;
    default:
      iziError(`Error ${status || 'unknown'}`);
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  onSearch();
});

loadMoreBtn.addEventListener('click', loadMore);
