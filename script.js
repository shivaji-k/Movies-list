async function searchMovies() {
    const searchTerm = document.getElementById('searchInput').value;
    const response = await fetch(`/search?title=${searchTerm}`);
    const movies = await response.json();

    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '';

    movies.forEach(movie => {
        const listItem = document.createElement('li');
        listItem.classList.add('movie-item');

        const img = document.createElement('img');
        img.src = movie.Poster !== "N/A" ? movie.Poster : '';
        img.alt = movie.Title;

        const title = document.createElement('span');
        title.textContent = movie.Title;

        const year = document.createElement('span');
        year.textContent = ` (${movie.Year})`;

        listItem.appendChild(img);
        listItem.appendChild(title);
        listItem.appendChild(year);
        listItem.appendChild(intro);

        listItem.addEventListener('click', () => showMovieDetails(movie));

        movieList.appendChild(listItem);
    });
}

async function showMovieDetails(movie) {
    const url = `http://www.omdbapi.com/?apikey=a1b5f9ec&i=${movie.imdbID}`;
    const response = await fetch(url);
    const movieDetails = await response.json();

    const movieDetail = document.getElementById('movieDetail');
    movieDetail.innerHTML = '';

    const img = document.createElement('img');
    img.src = movieDetails.Poster !== "N/A" ? movieDetails.Poster : '';
    img.alt = movieDetails.Title;

    const title = document.createElement('h2');
    title.textContent = movieDetails.Title;

    const year = document.createElement('p');
    year.textContent = `Year: ${movieDetails.Year}`;

    const director = document.createElement('p');
    director.textContent = `Director: ${movieDetails.Director}`;

    const plot = document.createElement('p');
    plot.textContent = `Plot: ${movieDetails.Plot}`;

    movieDetail.appendChild(img);
    movieDetail.appendChild(title);
    movieDetail.appendChild(year);
    movieDetail.appendChild(director);
    movieDetail.appendChild(plot);
}
