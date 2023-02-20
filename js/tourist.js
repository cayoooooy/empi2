window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    }
    ;

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// for the search results

const searchBtn = document.getElementById('search-btn');
const tourList = document.getElementById('tour');
const tourDeetsContent = document.querySelector('.tour-details-content');
const deetsCloseBtn = document.getElementById('deets-close-btn');

//event listeners

searchBtn.addEventListener('click', getTourList);

//get meal list that matches with the word
function getTourList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://attire-caiman.cyclic.app//keyword?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
          if (data && data.length) {
            let html = "";
            data.forEach(tour => {
                html += `
            <div class ="tour-spots" data-id = "${tour.id}">
            <div class = "tour-img">
                <img src = "${tour.tourimg}" alt = "place">
            </div>
            <div class = "tour-name">
                <h3> "${tour.tourname}" </h3>
                <a href = "#" class = "deets-btn"> More Details </a>
            </div>
        </div>
        `;
            })
            tourList.innerHTML = html;
            
          }
            else {
                tourList.innerHTML = "No results found!";
                tourList.style = "color: #2c3e50; grid-template-columns: 1fr; width: 100%; font-size: 1.8rem;"
            }
          
        })
}
//  get details of the tourist spot
function getTourDetails(e){
    e.preventDefault();
    if(e.target.classList.contains('deets-btn')){
        let tourSpot = e.target.parentElement.parentElement;
        fetch(`http://localhost:8080/i=${tourSpot.dataset.id}`)
        .then(response => response.json())
        .then(data => tourDetailsModal(data.tour));
    }

}

// create a modal
function tourDetailsModal(tour){
    console.log(tour);
    tour = tour[0];
    let html = `

    <h2 class = "deets-title">${tour.tourname}</h2>
    <p class = "deets-category">${tour.touradd}</p>
    <div class = "deets-instruct">
        <h3> Description: </h3>
        <p>  ${tour.tourdesc} </p>
    </div>
<div class = "deets-meal-img">
    <img src = "${tour.tourimg}" alt = "">
</div>
    `;
tourDeetsContent.innerHTML = html;
tourDeetsContent.parentElement.classList.add
('showDetails');

}











