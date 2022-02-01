/** @format */

const url = "./actors.json";

let movies = [];

async function loadJSON() {
	// Henter alle produkter
	const JSONData = await fetch(url);
	data = await JSONData.json();

	data.forEach((el) => {
		if (!movies.includes(el.movie)) {
			movies.push(el.movie);
		}
	});

	createMovies();
	console.log(movies);
	console.table(data);
}

function createMovies() {
	let container = document.querySelector(".actorlist");
	let template = document.querySelector("template");

	data.forEach((movie) => {
		let clone = template.cloneNode(true).content;
		clone.querySelector(".actor").textContent = movie.fullname;
		clone.querySelector(".movie").textContent = movie.movie;

		clone.querySelector("li").addEventListener("click", () => {
			movieModal(movie);
			document.querySelector("modal_container");
		});

		container.appendChild(clone);
	});
}

function movieModal(movie) {
	const modal = document.querySelector(".modal_container");
	modal.querySelector(".backdrop").addEventListener("click", () => {
		modal.classList.add("hide");
	});
	modal.classList.remove("hide");
	console.log(movie);

	modal.querySelector(".actor").textContent = movie.fullname;
	modal.querySelector(".movie").textContent = movie.movie;
}

loadJSON();
