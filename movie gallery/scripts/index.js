const activePage = window.location.pathname;
const navLinks = document.querySelectorAll('nav a').
forEach(link =>{
    if (link.href.includes(`${activePage}`)) {
        console.log(activePage, link);
        link.classList.add('active');
    }
})

import * as config from "./config.js"

function fetchMovieList() {
    alert("fetch the movies");
}
document.onload = fetchMovieList();