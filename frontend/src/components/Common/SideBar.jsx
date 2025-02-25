import React from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiLogOut,
  FiShoppingCart,
  FiUser,
  FiBox,
  FiSettings,
  FiTruck,
} from "react-icons/fi";

import { useState } from "react";

function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Fonction pour basculer la visibilité de la sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <div className={`navigation ${isSidebarOpen ? "active" : ""}`}>
        <ul>
          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="logo-apple"></ion-icon>
              </span>
              <span className="title">Brand Name</span>
            </a>
          </li>

          {[
            { name: "Dashboard", icon: "home-outline", path: "/" },
            { name: "Customers", icon: "people-outline", path: "/ClientList" },
            { name: "devis", icon: "chatbubble-outline", path: "/DevisList" },
            {
              name: "les societes",
              icon: "help-outline",
              path: "/SocietiesList",
            },
            { name: "Settings", icon: "settings-outline", path: "/" },
            {
              name: "devistout",
              icon: "lock-closed-outline",
              path: "/DevisFormTout",
            },
            { name: "Sign Out", icon: "log-out-outline", path: "/" },
          ].map((item, index) => (
            <li key={index}>
              {/* Use Link instead of <a> */}
              <Link to={item.path}>
                <span className="icon">
                  <ion-icon name={item.icon}></ion-icon>
                </span>
                <span className="title">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="toggle" onClick={toggleSidebar}>
        <ion-icon name="menu-outline"></ion-icon>
      </div>
    </>
  );
}

export default SideBar;
