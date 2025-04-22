import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SideBar() {
  const ouvrireMenuDrawer = useSelector(
    (state) => state.interfaceSlice.ouvrireMenuDrawer
  );
  return (
    <>
      <div className={`navigation ${ouvrireMenuDrawer ? "active" : ""}`}>
        <ul>
          <li>
            <a href="#">
              <span className="icon">
                {/* <ion-icon name="speedometer-outline"></ion-icon> */}
                <img src="/logo.png" />
              </span>
              {/* <span className="title">ERP Logicom</span> */}
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </a>
          </li>

          {[
            { name: "Dashboard", icon: "home-outline", path: "/dashboard" },
            {
              name: "Gestion Clients",
              icon: "people-outline",
              path: "/ClientFormTout",
            },
            {
              name: "Gestion Articles",
              icon: "cube-outline", // Représente un objet/article (📦)
              path: "/ArticleFormTout",
            },
            
            {
              name: "Gestion Devis",
              icon: "document-text-outline", // Idéal pour un devis/document 📄
              path: "/DevisFormTout",
            }
,            
            {
              name: "Gestion Utilisateurs",
              icon: "person-circle-outline", // même style qu'"lock-closed-outline"
              path: "/UtilisateurFormTout",
            },
            {
              name: "Liste de société",
              icon: "business-outline", // Représente bien une entreprise
              path: "/SocietiesList",
            },
            
            { name: "Settings", icon: "settings-outline", path: "/Parametres" },
            {
              name: "Déconnexion",
              icon: "log-out-outline",
              path: "/deconnexion",
            },
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
    </>
  );
}

export default SideBar;
