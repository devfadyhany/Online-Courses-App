let toggleMenu = true;

const MobileMenuToggler = () => {
  let menu = document.querySelector("#myMenu");

  toggleMenu
    ? menu.classList.remove("hide-menu")
    : menu.classList.add("hide-menu");
  toggleMenu = !toggleMenu;
};

const NavbarChangeOnScroll = () => {
  let header = document.querySelector("#Header");

  if (window.scrollY > 10) {
    header.classList.add("navbar-scroll");
  } else {
    header.classList.remove("navbar-scroll");
  }
};
