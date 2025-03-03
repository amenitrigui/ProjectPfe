import React, { useState } from "react";
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
            <a href="#" style={{ display: "flex", alignItems: "center" }}>
              <img
                src="logicom.jpg"  // Chemin vers votre logo
                alt="Logicom Logo"
                style={{
                  width: "70px",
                  height: "50px",
                  marginRight: "10px",
                }}
              />
              <span className="title">Logicom ERP</span>
            </a>
          </li>
          {[
            { name: "Dashboard", icon: "home-outline", path: "/" },
            { name: "Clients", icon: "people-outline", path: "/ClientList" },
            { name: "Devis", icon: "chatbubble-outline", path: "/DevisList" },
            {
              name: "devistout",
              icon: "lock-closed-outline",
              path: "/DevisFormTout",
            },
            {
              name: "les societes",
              icon: "help-outline",
              path: "/SocietiesList",
            },
            { name: "Settings", icon: "settings-outline", path: "/" },
            { name: "Deconnexion", icon: "log-out-outline", path: "/deconnexion" },
          ].map((item, index) => (
            <li key={index}>
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
