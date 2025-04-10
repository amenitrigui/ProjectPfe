import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function SideBar() {
  const ouvrireMenuDrawer = useSelector((state) => state.uiStates.ouvrireMenuDrawer);

  // // Fonction pour basculer la visibilité de la sidebar
  // const toggleSidebar = () => {
  //   dispatch(setOuvrireDrawerMenu(!ouvrireMenuDrawer));
  // };

  return (
    <>
      <div className={`navigation ${ouvrireMenuDrawer ? "active" : ""}`}>
        <ul>
          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="speedometer-outline"></ion-icon>
              </span>
              <span className="title">ERP Logicom</span>
            </a>
          </li>

          {[
            { name: "Dashboard", icon: "home-outline", path: "/dashboard" },
            {
              name: "Clients",
              icon: "people-outline",
              path: "/ClientFormTout",
            },
            {
              name: "Article",
              icon: "chatbubble-outline",
              path: "/ArticleFormTout",
            },
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
            {
              name: "Deconnexion",
              icon: "log-out-outline",
              path: "/deconnexion",
            },
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
    </>
  );
}

export default SideBar;
