"use client";

import React, { useContext, useEffect } from "react";
import Link from "next/link";

import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LoginContext } from "./LoginContext";

export default function Navbar() {
  const pathname = usePathname();
  const { logged, changeLogin } = useContext(LoginContext);
  let toggleMenu = true;

  useEffect(() => {
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
    changeLogin({ value: false, user: {} });
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
            {logged.value && logged.user != null && (
              <>
                <li>
                  <div className="Profile">
                    <img
                      src={`http://localhost:8000/api/v1/user/img/${logged.user.image}`}
                    />
                    <p>{logged.user.name}</p>
                    <ul className="profileMenu">
                      <li>
                        <Link href={`/user/${logged.user.id}`}>My Account</Link>
                      </li>
                      <li>
                        <Link href={`/user/courses/${logged.user.id}`}>
                          My Courses
                        </Link>
                      </li>
                      {logged.user.isInstructor == "Y" && (
                        <li>
                          <Link href={`/instructor/${logged.user.id}`}>
                            Dashboard
                          </Link>
                        </li>
                      )}
                    </ul>
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
