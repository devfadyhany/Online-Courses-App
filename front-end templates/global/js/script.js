let toggleMenu = true;
let toggleLang = false;

const MobileMenuToggler = () => {
  let menu = document.querySelector("#myMenu");

  toggleMenu
    ? menu.classList.remove("hide-menu")
    : menu.classList.add("hide-menu");
  toggleMenu = !toggleMenu;
};

const LanguageToggler = () => {
  let body = document.querySelector("#body");
  let btn = document.querySelector("#languageChanger");

  if (toggleLang) {
    body.classList.remove("arabic");
    btn.innerHTML = "arabic";
  } else {
    body.classList.add("arabic");
    btn.innerHTML = "english";
  }

  toggleLang = !toggleLang;
};

const NavbarChangeOnScroll = () => {
  let header = document.querySelector("#Header");

  if (window.scrollY > 10) {
    header.classList.add("navbar-scroll");
  } else {
    header.classList.remove("navbar-scroll");
  }
};
