import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setOuvrireDrawerMenu } from "../../app/interface_slices/interfaceSlice";
function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ouvrireMenuDrawer = useSelector(
    (state) => state.interfaceSlice.ouvrireMenuDrawer
  );
  const selectionnerElementSideBar = () => {
    dispatch(setOuvrireDrawerMenu(!ouvrireMenuDrawer));
  };
  const elementsDrawer = [
    { name: "Dashboard", icon: "home-outline", path: "/dashboard" },
    {
      name: "Gestion Clients",
      icon: "people-outline",
      path: "/ClientFormTout",
    },
    {
      name: "Gestion Articles",
      icon: "chatbubble-outline",
      path: "/ArticleFormTout",
    },
    {
      name: "Gestion Devis",
      icon: "lock-closed-outline",
      path: "/DevisFormTout",
    },
    {
      name: "Gestion Utilisateurs",
      icon: "help-outline",
      path: "/UtilisateurFormTout",
    },
    {
      name: "Liste de société",
      icon: "help-outline",
      path: "/SocietiesList",
    },
    { name: "Settings", icon: "settings-outline", path: "/Parametres" },
    {
      name: "Déconnexion",
      icon: "log-out-outline",
      path: "/deconnexion",
    },
  ];
  return (
    <>
      <div
        className={`navigation ${
          ouvrireMenuDrawer ? "active" : ""
        }`}
      >
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

          {elementsDrawer.map((item, index) => (
            <li key={index}>
              <Link to={item.path}>
                <span className="icon">
                  <ion-icon name={item.icon}></ion-icon>
                </span>
                <span className="title" onClick={selectionnerElementSideBar}>
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SideBar;
