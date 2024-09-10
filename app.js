let currentIndex = 0;
const items = document.querySelectorAll('.slider .list .item');
let thumbnails = Array.from(document.querySelectorAll('.thumbnail .item'));
const dots = document.querySelectorAll('.dot');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');

function updateActiveImage(index) {
    items.forEach(item => item.classList.remove('active'));
    thumbnails.forEach(thumbnail => thumbnail.classList.remove('active'));

    items[index].classList.add('active');
    thumbnails[index].classList.add('active');

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');

    shiftThumbnails(index);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % items.length;
    updateActiveImage(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateActiveImage(currentIndex);
}

function shiftThumbnails(activeIndex) {
    const thumbnailContainer = document.querySelector('.thumbnail');
    const totalThumbnails = thumbnails.length;
    const visibleThumbnails = [];

    // Collect the current and next 2 thumbnails, wrapping around if necessary
    for (let i = 0; i < 3; i++) {
        visibleThumbnails.push(thumbnails[(activeIndex + i) % totalThumbnails]);
    }

    // Clear the current thumbnails
    thumbnailContainer.innerHTML = ''; 

    // Add the selected thumbnails to the container
    visibleThumbnails.forEach(thumbnail => thumbnailContainer.appendChild(thumbnail));
}

nextButton.addEventListener('click', () => {
    nextImage();
});

prevButton.addEventListener('click', () => {
    prevImage();
});

let refreshInterval = setInterval(() => {
    nextImage();
}, 5000);

document.querySelector('.slider').addEventListener('mouseover', () => clearInterval(refreshInterval));
document.querySelector('.slider').addEventListener('mouseout', () => refreshInterval = setInterval(() => {
    nextImage();
}, 5000));
