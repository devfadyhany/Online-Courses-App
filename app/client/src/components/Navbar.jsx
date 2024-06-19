"use client";

import React, { useContext, useEffect } from "react";
import Link from "next/link";

import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LoginContext } from "./LoginContext";
import { API_URL } from "@/app/layout";

export default function Navbar() {
  const pathname = usePathname();
  const { logged, UpdateLoginState, LogOut } = useContext(LoginContext);
  let toggleMenu = true;

  useEffect(() => {
    UpdateLoginState();

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        let header = document.querySelector("#Header");

        if (header !== null) {
          if (window.scrollY > 10) {
            header.classList.add("navbar-scroll");
          } else {
            header.classList.remove("navbar-scroll");
          }
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

  return (
    <header id="Header">
      <nav className="navbar">
        <Image
          src="/Logo.png"
          width={120}
          height={50}
          alt="page_logo"
          priority
        />
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
                    <img src={`${API_URL}user/img/${logged.user.image}`} />
                    <p>{logged.user.name}</p>
                    <ul className="profileMenu">
                      <li>
                        <Link href={`/user/account`}>My Account</Link>
                      </li>
                      <li>
                        <Link href={`/user/courses`}>
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
