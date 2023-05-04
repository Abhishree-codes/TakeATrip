// ---band aid 
// ---dream  trip 
// ---top trvaeller
// ---explore the beauty 
// ---find location
var menuBtn = document.querySelector('.menu-btn');
var navbar = document.querySelector('.burgerMenu');
var cross = document.querySelector('.cross');
function myburger(){
    navbar.style.display="flex"
}
menuBtn.addEventListener('click', myburger);

cross.addEventListener('click', function(){
    navbar.style.display="none"
})