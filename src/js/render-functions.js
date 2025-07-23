import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        tags,
        largeImageURL,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}">
                <div class="image-stats">
                    <p class="img-stat-text"><span class="img-stat-header">Likes</span> ${likes}</p>
                    <p class="img-stat-text"><span class="img-stat-header">Views</span> ${views}</p>
                    <p class="img-stat-text"><span class="img-stat-header">Comments</span> ${comments}</p>
                    <p class="img-stat-text"><span class="img-stat-header">Downloads</span> ${downloads}</p>
                </div>
            </a>
        </li>
    `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  slider.refresh();
}

let slider = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}
