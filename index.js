/** @format */

const url = "./actors.json";

// TEST
let movies = [];
let filter = "all";

async function loadJSON() {
	// Henter alle produkter
	const JSONData = await fetch(url);
	data = await JSONData.json();
	// TEST
	data.forEach((el) => {
		if (!movies.includes(el.movie)) {
			movies.push(el.movie);
		}
	});

	createActors();
	createFilters();
	console.log(movies);
	console.table(data);
}

function createActors() {
	let container = document.querySelector(".actorlist");
	let template = document.querySelector("template");
	container.textContent = "";
	console.log(filter);
	data.forEach((movie) => {
		if (
			filter == "all" ||
			(filter == "movie_0" && movie.movie == "Pulp Fiction") ||
			(filter == "movie_1" && movie.movie == "Fight Club") ||
			(filter == "movie_2" && movie.movie == "Goodfellas") ||
			(filter == "movie_3" && movie.movie == "Inception")
		) {
			let clone = template.cloneNode(true).content;
			clone.querySelector(".actor").textContent = movie.fullname;
			clone.querySelector(".movie").textContent = movie.movie;

			clone.querySelector("li").addEventListener("click", () => {
				actorModal(movie);
			});

			container.appendChild(clone);
		}
	});
}

function actorModal(movie) {
	const modal = document.querySelector(".modal_container");
	modal.querySelector(".backdrop").addEventListener("click", () => {
		modal.classList.add("hide");
	});
	modal.classList.remove("hide");

	modal.querySelector(".actor").textContent = movie.fullname;
	modal.querySelector(".movie").textContent = movie.movie;
}

// TEST
function createFilters() {
	movies.forEach((movie, index) => {
		let filterContainer = document.querySelector(".button_container");
		filterContainer.innerHTML += `<button class="filter" data-index="movie_${index}"> ${movie} </button>`;
	});
	filterEvent();
}

function filterEvent() {
	const filterBtn = document.querySelectorAll(".filter");
	filterBtn.forEach((btn) => {
		btn.addEventListener("click", function (e) {
			filter = this.dataset.index;
			createActors();
		});
	});
}

function setFilter() {
	console.log(this);
}
loadJSON();
