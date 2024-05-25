"use client";

import React from 'react'
import Link from 'next/link';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Navbar() {

  let toggleMenu = true;

  const MobileMenuToggler = () => {
    let menu = document.querySelector("#myMenu");
  
    toggleMenu
      ? menu.classList.remove("hide-menu")
      : menu.classList.add("hide-menu");
    toggleMenu = !toggleMenu;
  }

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", ()=>{
      let header = document.querySelector("#Header");
    
      if (window.scrollY > 10) {
        header.classList.add("navbar-scroll");
      } else {
        header.classList.remove("navbar-scroll");
      }
    })
  }

  return (
    <header id="Header">
      <nav className="navbar">
        <img className="logo" src="Logo.png" alt="page_logo" />
        <div>
          <FontAwesomeIcon className="menu-btn" id="menuBtn" icon={fas.faBars} onClick={MobileMenuToggler}/>
          
          <ul className="menu hide-menu" id="myMenu">
            <li><Link className="active" href="/">Home</Link></li>
            <li><Link href="/courses">Courses</Link></li>
            <li><Link href="/#About">About</Link></li>
            <li><Link href="/#Contact">Contact</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
