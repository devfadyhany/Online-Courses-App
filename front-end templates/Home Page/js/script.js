let toggleMenu = true;
let menuBtn = document.querySelector("#menuBtn");
let menu = document.querySelector("#myMenu");

function menuToggler() {
  toggleMenu
    ? menu.classList.remove("hide-menu")
    : menu.classList.add("hide-menu");
  toggleMenu = !toggleMenu;
}
