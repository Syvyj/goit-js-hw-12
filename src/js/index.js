const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const refs = {
  loader: document.querySelector('.loader'),
};

let currentPage = 1;
let currentSearchQuery = '';

// ...existing code...

async function handleSubmit(event) {
  event.preventDefault();
  const searchQuery = event.target.elements.searchQuery.value.trim();
  
  if (!searchQuery) {
    Notiflix.Notify.failure('Please enter a search query');
    return;
  }

  currentPage = 1;
  currentSearchQuery = searchQuery;
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';
  
  try {
    refs.loader.style.display = 'block';
    const data = await fetchImages(searchQuery, currentPage);
    refs.loader.style.display = 'none';
    
    if (data.hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    renderGallery(data.hits);
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    
    if (data.totalHits > 40) {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    refs.loader.style.display = 'none';
    Notiflix.Notify.failure('Something went wrong. Please try again.');
  }
}

// ...existing code...

async function loadMore() {
  currentPage += 1;
  
  try {
    refs.loader.style.display = 'block';
    const data = await fetchImages(currentSearchQuery, currentPage);
    refs.loader.style.display = 'none';
    
    renderGallery(data.hits);
    
    if (data.hits.length < 40 || currentPage * 40 >= data.totalHits) {
      loadMoreBtn.style.display = 'none';
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
    
    // Smooth scroll
    const { height: cardHeight } = document
      .querySelector(".gallery")
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });
  } catch (error) {
    refs.loader.style.display = 'none';
    Notiflix.Notify.failure('Something went wrong. Please try again.');
  }
}
