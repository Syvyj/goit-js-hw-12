import { fetchImages } from "./js/pixabay-api.js";
import { renderImages } from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let currentPage = 1;
let currentQuery = '';
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

document.getElementById("search-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  currentPage = 1;
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';
  
  const query = document.getElementById("search-input").value.trim();
  if (!query) {
    iziToast.warning({
      message: "Please enter a search term!",
    });
    return;
  }

  currentQuery = query;
  await fetchAndRender();
});

loadMoreBtn.addEventListener("click", async () => {
  currentPage += 1;
  await fetchAndRender(false);
});

async function fetchAndRender(isNewSearch = true) {
  loader.style.display = 'block';
  
  try {
    const data = await fetchImages(currentQuery, currentPage);
    
    if (data.hits.length === 0 && isNewSearch) {
      iziToast.info({
        message: "Sorry, there are no images matching your search query.",
      });
      return;
    }

    renderImages(data.hits, isNewSearch);

    // Updated pagination check to use 50
    if (currentPage * 50 >= data.totalHits) {
      loadMoreBtn.style.display = 'none';
      if (!isNewSearch) {
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
    } else {
      loadMoreBtn.style.display = 'block';
    }

    if (isNewSearch && data.totalHits > 0) {
      iziToast.success({
        message: `Hooray! We found ${data.totalHits} images.`,
      });
    }

    if (!isNewSearch) {
      const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
      });
    }
  } catch (error) {
    iziToast.error({
      message: "Failed to fetch images. Please try again later.",
    });
  } finally {
    loader.style.display = 'none';
  }
}