import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import menuConfig from "./menuConfig.jsx";

function Menu() {
  const activeLink = "text-blue-700 font-bold";

  return (
    <nav className="h-full min-h-screen min-w-40 bg-gray-200 p-5">
      <div>
        <ul className="space-y-3">
          {menuConfig.map((menuItem, index) => (
            <li key={index} className="flex">
              {/* <img src={menuItem.icon} alt={menuItem.label} className="pr-2 " /> */}

              <NavLink
                to={menuItem.to}
                className={({ isActive }) => (isActive ? activeLink : "")}
              >
                {menuItem.label}
                {/* {isMenuOpen ? menuItem.label : ""} */}
              </NavLink>
              {menuItem.subsections && (
                <ul>
                  {menuItem.subsections.map((subsection, subIndex) => (
                    <li key={subIndex}>
                      <NavLink to={subsection.to} className="text-gray-700">
                        {subsection.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* <button
        className="absolute top-2 left-2 h-8 w-8 rounded-full bg-gray-300 text-gray-600 hover:text-gray-800 transition-all"
        onClick={toggleMenu}
      >
        {isMenuOpen ? "-" : "+"}
      </button> */}
    </nav>
  );
}

export default Menu;
