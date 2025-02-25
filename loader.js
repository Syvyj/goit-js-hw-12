function showLoader() {
  const loader = document.createElement('div');
  loader.className = 'loader';
  document.body.appendChild(loader);
}

function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.remove();
  }
}

document.addEventListener('DOMContentLoaded', () => {
    const loaderProgress = document.getElementById('loader-progress');
    const loaderText = document.getElementById('loader-text');
    let progress = 0;

    const interval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(interval);
        } else {
            progress++;
            loaderProgress.style.width = progress + '%';
            loaderText.textContent = progress + '%';
        }
    }, 100);
});
