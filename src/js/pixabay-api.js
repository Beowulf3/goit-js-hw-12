import axios from 'axios';
import { iziError } from '../main';
const PIXABAY_KEY = '51390103-e5f94b12a87f57c9fbe51ad97';

export function getImagesByQuery(query) {
  return axios('https://pixabay.com/api/', {
    params: {
      key: PIXABAY_KEY,
      q: `${query}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  })
    .then(res => {
      return res.data.hits;
    })
    .catch(error => {
      throw error;
    });
}
