// API endpoints
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

// DOM elements
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Fetch and display popular movies initially
getMovies(API_URL);

/**
 * Fetch movies from API
 * @param {string} url - API endpoint
 */
async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
}

/**
 * Display movies in the DOM
 * @param {Array} movies - List of movie objects
 */
function showMovies(movies) {
    main.innerHTML = ''; // Clear previous movies

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        // Add class to change card color based on rating
        movieEl.classList.add(getClassByRate(vote_average));

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="{title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieEl);
    });
}

/**
 * Return class name based on rating
 * @param {number} vote - Movie rating
 * @returns {string} CSS class name
 */
function getClassByRate(vote) {
    if (vote >= 8) return 'green';
    else if (vote >= 5) return 'orange';
    else return 'red';
}

// Handle search form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm);
        search.value = '';
    } else {
        window.location.reload();
    }
});
