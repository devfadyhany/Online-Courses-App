"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { useJwt } from "react-jwt";

export default function Navbar() {
  const pathname = usePathname();
  const cookies = useCookies();
  const [logged, setLogged] = useState(false);
  const { decodedToken, isExpired } = useJwt(cookies.get("token"));
  let toggleMenu = true;

  useEffect(() => {
    if (cookies.get("token") !== undefined) {
      setLogged(true);
    }

    if (isExpired) {
      setLogged(false);
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        let header = document.querySelector("#Header");

        if (window.scrollY > 10) {
          header.classList.add("navbar-scroll");
        } else {
          header.classList.remove("navbar-scroll");
        }
      });
    }
  }, []);

  const MobileMenuToggler = () => {
    let menu = document.querySelector("#myMenu");

    toggleMenu
      ? menu.classList.remove("hide-menu")
      : menu.classList.add("hide-menu");
    toggleMenu = !toggleMenu;
  };

  const LogOut = () => {
    cookies.remove("token");
    setLogged(false);
  };

  return (
    <header id="Header">
      <nav className="navbar">
        <Image src="/Logo.png" width={120} height={50} alt="page_logo" />
        <div>
          <FontAwesomeIcon
            className="menu-btn"
            id="menuBtn"
            icon={fas.faBars}
            onClick={MobileMenuToggler}
          />

          <ul className="menu hide-menu" id="myMenu">
            <li>
              <Link className={pathname == "/" ? "active" : ""} href="/">
                Home
              </Link>
            </li>
            <li>
              <Link
                className={pathname == "/courses" ? "active" : ""}
                href="/courses"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                className={pathname == "/#About" ? "active" : ""}
                href="/#About"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className={pathname == "/#Contact" ? "active" : ""}
                href="/#Contact"
              >
                Contact
              </Link>
            </li>
            {logged && (
              <>
                <li>
                  <div className="Profile">
                    <img
                      src={`http://localhost:8000/api/v1/user/img/${decodedToken.image}`}
                    />
                    <Link href="/#Account">{decodedToken.name}</Link>
                  </div>
                </li>
                <button className="logoutBtn" onClick={LogOut}>
                  Log-Out
                </button>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
