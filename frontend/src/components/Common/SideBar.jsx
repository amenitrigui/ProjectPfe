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
  const handleLinkClick = (e, path) => {
    e.preventDefault();
    dispatch(setOuvrireDrawerMenu(false))
    navigate(path);
  };

  const elementsDrawer = [
    { name: "Dashboard", icon: "home-outline", path: "/dashboard" },
    { name: "Gestion Clients", icon: "people-outline", path: "/ClientFormTout" },
    { name: "Gestion Articles", icon: "cube-outline", path: "/ArticleFormTout" },
    { name: "Gestion Devis", icon: "document-text-outline", path: "/DevisFormTout" },
    { name: "Gestion Utilisateurs", icon: "person-circle-outline", path: "/UtilisateurFormTout" },
    { name: "Liste de société", icon: "business-outline", path: "/SocietiesList" },
    { name: "Settings", icon: "settings-outline", path: "/Settings" },
  ];
  return (
    <div className={`navigation ${ouvrireMenuDrawer ? "active" : ""}`}>
      <ul>
        <li>
          <a href="/Dashbord">
            <span className="icon">
              <img src="/logo.png" />
            </span>
            <br /><br /><br /><br /><br />
          </a>
        </li>

        {elementsDrawer.map((item, index) => (
          <li key={index} className="hover:bg-base-100">
            <Link to={item.path} onClick={(e) => {handleLinkClick(e, item.path)}}>
              <span className="icon">
                <ion-icon name={item.icon}></ion-icon>
              </span>
              <span className="title">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
