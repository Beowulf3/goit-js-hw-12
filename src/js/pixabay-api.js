import axios from 'axios';
const PIXABAY_KEY = '51390103-e5f94b12a87f57c9fbe51ad97';
export const per_page = 15;

export async function getImagesByQuery(query, page) {
  try {
    const response = await axios('https://pixabay.com/api/', {
      params: {
        key: PIXABAY_KEY,
        q: `${query}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
