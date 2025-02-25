import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Винесено створення lightbox у глобальний код
let lightbox = new SimpleLightbox('.gallery .gallery-item a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function renderImages(images, isNewSearch = true) {
  const gallery = document.querySelector(".gallery");
  
  if (isNewSearch) {
    // Перевіряємо чи існує lightbox і знищуємо його перед очищенням галереї
    if (lightbox) {
      lightbox.destroy();
    }
    gallery.innerHTML = '';
  }
  
  if (images.length === 0) {
    gallery.innerHTML = '<p>No images found. Try another search.</p>';
    return;
  }

  const markup = images
    .map(
      (img) => `
      <div class="gallery-item">
        <a href="${img.largeImageURL}">
          <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy"/>
        </a>
        <div class="info">
          <p><b>Likes:</b> ${img.likes}</p>
          <p><b>Views:</b> ${img.views}</p>
          <p><b>Comments:</b> ${img.comments}</p>
          <p><b>Downloads:</b> ${img.downloads}</p>
        </div>
      </div>`
    )
    .join("");

  if (isNewSearch) {
    gallery.innerHTML = markup;
  } else {
    gallery.insertAdjacentHTML('beforeend', markup);
  }

  // Створюємо новий екземпляр або оновлюємо існуючий
  lightbox = new SimpleLightbox('.gallery .gallery-item a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  
  document.querySelector('main').classList.add('visible');
  document.querySelector('header').classList.add('searched');
}