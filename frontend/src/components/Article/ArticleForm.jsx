import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaCog, FaCreditCard, FaSignOutAlt } from "react-icons/fa";
import ToolBar from "../Common/ToolBar";
import { useDispatch, useSelector } from "react-redux";
import { getListeFamillesArticle, setArticleInfos } from "../../app/article_slices/articleSlice";
function ArticleForm() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const articleInfos = useSelector((state) => state.ArticlesDevis.articleInfos);
  const ListeCodeArticles = useSelector((state) => state.ArticlesDevis.ListeCodeArticles);
  const ListeFamille = useSelector((state) => state.ArticlesDevis.ListeFamille);
 
  const dispatch = useDispatch();
 

  useEffect(() => {
    dispatch(getListeFamillesArticle())
  }, [])

  const handleCodeFamilleChange = (valeur, colonne) => {
    dispatch(setArticleInfos({colonne: colonne, valeur: valeur}))
  }
  return (
    <div className="container">
      <div className={`navigation ${isSidebarOpen ? "active" : ""}`}>
        <ul>
          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="speedometer-outline"></ion-icon>
              </span>
              <span className="title">ERP Logicom</span>m
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
      <div className={`main ${isSidebarOpen ? "active" : ""}`}>
        <div className="topbar">
          <div className="toggle" onClick={toggleSidebar}>
            <ion-icon name="menu-outline"></ion-icon>
          </div>

          <ToolBar></ToolBar>

          <div className="relative inline-block text-left">
            {/* Avatar avec événement de clic */}
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
              <img
                src="assets/imgs/customer01.jpg"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
              />
              {/* Indicateur de statut en ligne */}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>

            {/* Menu déroulant */}
            {isOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white border rounded-lg shadow-lg z-50">
                <div className="p-4 flex items-center border-b">
                  <img
                    src="assets/imgs/customer01.jpg"
                    alt="User"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-gray-500">Admin</p>
                  </div>
                </div>
                <ul className="py-2">
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer">
                    <FaUser className="mr-3" /> My Profile
                  </li>
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer">
                    <FaCog className="mr-3" /> Settings
                  </li>
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer relative">
                    <FaCreditCard className="mr-3" /> Billing
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      4
                    </span>
                  </li>
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer border-t">
                    <FaSignOutAlt className="mr-3" /> Log Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="details">
          <div className="recentOrders gap-y-0.5">
            <div className="cardHeader">
              <h2
                style={{
                  color: "rgb(48, 60, 123)",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
                className="text-3xl"
              >
                Article
              </h2>
              <a href="#" className="btn">
                View All
              </a>
            </div>
            <div className="flex flex-wrap">
              <div className="flex flex-col w-1/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Code Famille
                </label>

                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value = {articleInfos.famille}
                  onChange={(e) => handleCodeFamilleChange(e.target.value, "famille")}
                  list="listeCodesArticle"
                />

                <datalist id="listeCodesArticle">
                  {ListeFamille.length > 0 ? (
                    ListeFamille.map((famille, indice) => (
                      <option key={indice} value={famille.code}>
                        {famille.code}
                      </option>
                    ))
                  ) : (
                    <option disabled>Aucun article trouvé</option>
                  )}
                </datalist>
              </div>
              <div className="flex flex-col w-2/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Designation Famille
                </label>

                <select className="border border-gray-300 rounded-md p-2"></select>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="flex flex-col w-1/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Code Sous Famille
                </label>

                <select className="border border-gray-300 rounded-md p-2"></select>
              </div>
              <div className="flex flex-col w-2/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Designation sous Famille
                </label>

                <select className="border border-gray-300 rounded-md p-2"></select>
              </div>
            </div>
            <div className="flex flex-wrap">
            <div className="flex flex-col w-1/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Code Article
                </label>

                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value = {articleInfos.code}
                  list="listeCodesArticle"
                />

                <datalist id="listeCodesArticle">
                  {ListeCodeArticles.length > 0 ? (
                    ListeCodeArticles.map((article, indice) => (
                      <option key={indice} value={article.code}>
                        {article.code}
                      </option>
                    ))
                  ) : (
                    <option disabled>Aucun article trouvé</option>
                  )}
                </datalist>
              </div>
              <div className="flex flex-col w-1/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  code A bare
                </label>

                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex flex-col w-1/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Designation Article
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            <div className="flex flex-cols">
              <button className="btn">Taxe</button>
            </div>

            <div className="flex flex-wrap items-center gap-x-6">
              {/* %TVA */}
              <div className="flex flex-col w-1/3">
                <label className="font-bold text-[rgb(48,60,123)]">
                  {" "}
                  %TVA{" "}
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>

              {/* Fodek */}
              <div className="flex flex-col w-1/3">
                <label className="font-bold text-[rgb(48,60,123)]">
                  {" "}
                  Fodek{" "}
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>

              {/* DC (Checkbox) */}
              <div className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  className="border border-gray-300 rounded-md"
                />
                <label className="text-[rgb(48,60,123)] font-bold">DC</label>
              </div>
            </div>

            <div className="flex flex-cols">
              <button className="btn">Stockage</button>
            </div>
            <div className="flex flex-wrap">
              <div className="flex flex-col w-1/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  NGB
                </label>

                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex flex-col w-1/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Lieu de stockage
                </label>

                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex flex-col w-1/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Ref origine
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="flex flex-col w-1/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Fours
                </label>

                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  placeholder="start"
                />
              </div>
              <div className="flex flex-col w-2/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Fours
                </label>

                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  placeholder="start"
                />
              </div>
            </div>
          </div>

          <div className="recentCustomers">
            <div className="cardHeader">
              <h2>Paramettre de fACTURATION</h2>
            </div>
            <div className="card rounded-box p-6 space-y-2">
              {/* Conteneur pour Code Client, Type Client et CIN */}
              <div className="flex flex-wrap">
                <div className="flex flex-col w-1/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    unite
                  </label>

                  <select className="border border-gray-300 rounded-md p-2"></select>
                </div>
                <div className="flex flex-col w-1/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Brut
                  </label>

                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="flex flex-col w-1/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Net
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="flex flex-col w-1/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Nb/Unite
                  </label>

                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="flex flex-col w-2/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Compte Comptable
                  </label>

                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="flex flex-col w-1/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Type
                  </label>

                  <select className="border border-gray-300 rounded-md p-2"></select>
                </div>
                <div className="flex flex-col w-2/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    colisage
                  </label>

                  <select className="border border-gray-300 rounded-md p-2"></select>
                </div>
              </div>
              <div className="flex items-center gap-x-4">
                <div className="flex items-center gap-x-2">
                  <input
                    type="radio"
                    className="border border-gray-300 rounded-md"
                  />
                  <label className="text-[rgb(48,60,123)]">PF</label>
                </div>

                <div className="flex items-center gap-x-2">
                  <input
                    type="radio"
                    className="border border-gray-300 rounded-md"
                  />
                  <label className="text-[rgb(48,60,123)]">X</label>
                </div>

                <div className="flex items-center gap-x-2">
                  <input
                    type="radio"
                    className="border border-gray-300 rounded-md"
                  />
                  <label className="text-[rgb(48,60,123)]">MP</label>
                </div>

                <div className="flex items-center gap-x-2">
                  <input
                    type="radio"
                    className="border border-gray-300 rounded-md"
                  />
                  <label className="text-[rgb(48,60,123)]">Importé</label>
                </div>

                <div className="flex items-center gap-x-2">
                  <input
                    type="radio"
                    className="border border-gray-300 rounded-md"
                  />
                  <label className="text-[rgb(48,60,123)]">Local</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="details">
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Article</h2>
            </div>
            <div className="card rounded-box p-6 space-y-2">
              <div className="flex flex-nowrap">
                <div className="flex">
                  <div className="flex flex-col items-start gap-y-4 p-8">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="border border-gray-300 rounded-md"
                      />
                      <label className="text-blue-900">Gestion SAv</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="border border-gray-300 rounded-md"
                      />
                      <label className="text-blue-900">Consigne</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="border border-gray-300 rounded-md"
                      />
                      <label className="text-blue-900">Nomenec fiche</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="border border-gray-300 rounded-md"
                      />
                      <label className="text-blue-900">Gestion de Stock</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="border border-gray-300 rounded-md"
                      />
                      <label className="text-blue-900">Configuration Art</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="border border-gray-300 rounded-md"
                      />
                      <label className="text-blue-900">Vente Frac</label>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="block font-bold text-center"
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      Configuiration
                    </label>

                    <textarea className="w-full border border-gray-300 rounded-md p-2" />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <label className="block font-bold text-center text-[rgb(48,60,123)]"></label>
                    <button className="w-full border border-gray-300 rounded-md p-2">
                      {" "}
                      Correction de Stock
                    </button>

                    <label className="block font-bold text-center text-[rgb(48,60,123)]"></label>
                    <button className="w-full border border-gray-300 rounded-md p-2">
                      Catalogue des prix
                    </button>

                    <label className="block font-bold text-center text-[rgb(48,60,123)]"></label>
                    <button className="w-full border border-gray-300 rounded-md p-2">
                      Valeur du Stock
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="recentCustomers">
            <div className="card rounded-box p-6 space-y-2">
              <div className="flex flex-col w-full">
                {/* Ligne pour "Creation" */}
                <div className="flex items-center space-x-4">
                  <label
                    className="font-medium w-1/3 text-left block "
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Creation
                  </label>

                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-2/3"
                    disabled
                  />
                </div>

                {/* Ligne pour "Modification" */}
                <div className="flex items-center space-x-4">
                  <label
                    className="font-medium w-1/3 text-left block "
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Modification
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-2/3"
                  />
                </div>

                {/* Ligne pour "Date Maj" */}
                <div className="flex items-center space-x-4">
                  <label
                    className="font-medium w-1/3 text-left block "
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Date Maj
                  </label>
                  <input
                    type="date"
                    className="border border-gray-300 rounded-md p-2 w-2/3"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  className="block font-bold text-center"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  commentaire
                </label>

                <textarea
                  className="w-full border border-gray-300 rounded-md p-2"
                  cols={33}
                  rows={7}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="%PUBLIC_URL%/assets/js/main.js"></script>
    </div>
  );
}

export default ArticleForm;
