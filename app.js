document.addEventListener('DOMContentLoaded', function () {
    // Event listener for the navigation menu icon
    document.querySelector('.bi-list').addEventListener('click', toggleMenu);

    // Event listener for generating images
    document.querySelector('.generate-form').addEventListener('submit', generateImages);

    // Load initial photos
    loadPhotos();
});

function toggleMenu() {
    const navMenu = document.querySelector('nav ul');
    navMenu.classList.toggle('open');
}

const apiKey = 'uDsaNoiARkVeopRASv9XPIXAT9zPDZ4OPP4Hf6UypKcwoHfRlOaJJ08G';
const apiUrl = `https://api.pexels.com/v1/curated?per_page=9`;
let page = 0;

const fetchImage = async () => {
    try {
        const response = await fetch(`${apiUrl}&page=${page}`, {
            headers: {
                Authorization: apiKey,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching images:', error);
    }
};

const displayImage = (photo) => {
    const gallery = document.querySelector('.image-gallery');
    const imageElement = document.createElement('img');
    imageElement.classList.add('img-card')
    imageElement.src = photo.src.medium;
    gallery.appendChild(imageElement);
};

const loadImage = async () => {
    const data = await fetchImage();
    data.photos.forEach(displayImage);
    page++;
};

const generateImages = (event) => {
    event.preventDefault();
    const input = document.querySelector('.prompt-input');
    const quantity = document.querySelector('.img-quantity').value;
    
    // Clear existing images
    const gallery = document.querySelector('.image-gallery');
    gallery.innerHTML = '';

    for (let i = 0; i < quantity; i++) {
        loadImage();
    }

    // Reset page to 0 after generating new images
    page = 0;
};

const loadPhotos = () => {
    // Load initial photos when the page loads
    loadImage();
};
