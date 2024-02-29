let toggleMenu = true;
let header = document.querySelector("#Header")
let menuBtn = document.querySelector("#menuBtn");
let menu = document.querySelector("#myMenu");

function menuToggler() {
  toggleMenu
    ? menu.classList.remove("hide-menu")
    : menu.classList.add("hide-menu");
  toggleMenu = !toggleMenu;
}

function navbarScroll(){
  if (window.scrollY > 10) {
    header.classList.add("navbar-scroll")
  }else {
    header.classList.remove("navbar-scroll")
  }
}
