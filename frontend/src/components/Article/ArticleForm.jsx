import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaCog, FaCreditCard, FaSignOutAlt } from "react-icons/fa";
import ToolBar from "../Common/ToolBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getArticleParCode,
  getDesignationFamilleParCodeFamille,
  getdesignationSousFamillebycodeSousFamille,
  getListeCodesArticles,
  getListecodesousFamille,
  getListeFamillesArticle,
  setArticleInfos,
  viderChampsArticleInfo,
} from "../../app/article_slices/articleSlice";
import {
  setAfficherRecherchePopup,
  setToolbarMode,
  setToolbarTable,
} from "../../app/interface_slices/uiSlice";
function ArticleForm() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const articleInfos = useSelector((state) => state.ArticlesDevis.articleInfos);
  const ListeCodeArticles = useSelector(
    (state) => state.ArticlesDevis.ListeCodeArticles
  );
  const ListeFamille = useSelector((state) => state.ArticlesDevis.ListeFamille);
  const toolbarMode = useSelector((state) => state.uiStates.toolbarMode);
  const ListeSousFamille = useSelector(
    (state) => state.ArticlesDevis.ListeSousFamille
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListeFamillesArticle()); //* la colonne code Famille
    dispatch(getListecodesousFamille()); //** la collone de code sous famille */
    dispatch(getListeCodesArticles()); // * la colonne de code article
  }, []);

  const infosUtilisateur = useSelector(
    (state) => state.UtilisateurInfo.infosUtilisateur
  );

  const hundlesubmitTousLesChamp = (valeur, colonne) => {
    // console.log(colonne, " ", valeur);
    dispatch(setArticleInfos({ valeur, colonne }));

    if (colonne == "code") {
      if (valeur == "") {
        {
          dispatch(viderChampsArticleInfo());
        }
      }
    }

    if (colonne == "famille") {
      if (valeur != "") {
        dispatch(getDesignationFamilleParCodeFamille(valeur));
      } else {
        dispatch(setArticleInfos({ colonne: "libelleFamille", valeur: "" }));
      }
    }

    if (colonne == "codesousfam") {
      if (valeur != "") {
        dispatch(getdesignationSousFamillebycodeSousFamille(valeur));
      } else {
        dispatch(
          setArticleInfos({ colonne: "Libellesousfamille", valeur: "" })
        );
      }
    }
  };

  useEffect(() => {
    if (articleInfos.codesousfam) {
      dispatch(
        getdesignationSousFamillebycodeSousFamille(articleInfos.codesousfam)
      );
    }
  }, [articleInfos.codesousfam]);

  useEffect(() => {
    if (articleInfos.famille) {
      dispatch(getDesignationFamilleParCodeFamille(articleInfos.famille));
    }
  }, [articleInfos.famille]);

  const activerChampsForm = useSelector(
    (state) => state.uiStates.activerChampsForm
  );
  console.log(articleInfos);
  const handleChangeCheckbox = (checked, colonne) => {
    if (toolbarMode == "ajout" || toolbarMode == "modification") {
      dispatch(
        setArticleInfos({
          colonne: colonne,
          valeur: checked == true ? "1" : "0",
        })
      );
    }
  };

  const handleChangeRadio = (valeur, colonne) => {
    if (toolbarMode == "ajout" || toolbarMode == "modification") {
      dispatch(setArticleInfos({ colonne: colonne, valeur: valeur }));
    }
  };

  const afficherRecherchePopup = () => {
    dispatch(setAfficherRecherchePopup(true));
  };

  return (
    <div className="container">
      <div className={`navigation ${isSidebarOpen ? "active" : ""}`}>
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
                Fiche Article
              </h2>
              {/* <a href="#" className="btn">
                View All
              </a> */}
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
                  value={articleInfos.famille}
                  onChange={(e) =>
                    hundlesubmitTousLesChamp(e.target.value, "famille")
                  }
                  disabled={!activerChampsForm}
                  list="listeCodesFamilles"
                  onClick={() => {
                    dispatch(setToolbarTable("famille"));
                    afficherRecherchePopup();
                  }}
                />

                <datalist id="listeCodesFamilles">
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

                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value={articleInfos.libelleFamille}
                  onChange={(e) =>
                    hundlesubmitTousLesChamp(e.target.value, "libelleFamille")
                  }
                  disabled={!activerChampsForm}
                />
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

                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value={articleInfos.codesousfam}
                  list="listeCodesSousFamille"
                  onChange={(e) =>
                    hundlesubmitTousLesChamp(e.target.value, "codesousfam")
                  }
                  disabled={!activerChampsForm}
                  onClick={() => {
                    dispatch(setToolbarTable("sousfamille"));
                    afficherRecherchePopup();
                  }}
                />
                <datalist id="listeCodesSousFamille">
                  {ListeSousFamille.length > 0 ? (
                    ListeSousFamille.map((Sousfamille, indice) => (
                      <option key={indice} value={Sousfamille.code}>
                        {Sousfamille.code}
                      </option>
                    ))
                  ) : (
                    <option disabled>Aucune liste Sous famille trouvé</option>
                  )}
                </datalist>
              </div>
              <div className="flex flex-col w-2/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Designation sous Famille
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value={articleInfos.Libellesousfamille}
                  disabled={!activerChampsForm}
                  onChange={(e) =>
                    hundlesubmitTousLesChamp(
                      e.target.value,
                      "Libellesousfamille"
                    )
                  }
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label
                  className="font-bold mb-1 block"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Code Article
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  disabled={toolbarMode == "modification"}
                  value={articleInfos.code}
                  list={toolbarMode == "ajout" ? "listeCodesArticle" : ""}
                  onChange={(e) =>
                    hundlesubmitTousLesChamp(e.target.value, "code")
                  }
                  onClick={() => {
                    dispatch(setToolbarTable("article"));
                    if (toolbarMode === "consultation") {
                      afficherRecherchePopup();
                    }
                  }}
                />
                <datalist id="listeCodesArticle">
                  {ListeCodeArticles.length > 0 ? (
                    ListeCodeArticles.map((article, indice) => (
                      <option key={indice} value={article.code}>
                        {article.code}
                      </option>
                    ))
                  ) : (
                    <option disabled>Aucun code d'article trouvé</option>
                  )}
                </datalist>
              </div>

              <div className="flex-1">
                <label
                  className="font-bold mb-1 block"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Designation Article
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={articleInfos.libelle}
                  disabled={!activerChampsForm}
                  onChange={(e) =>
                    hundlesubmitTousLesChamp(e.target.value, "libelle")
                  }
                />
              </div>

              <div className="flex items-center gap-2">
                <label
                  className="font-bold"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  DC
                </label>
                <input
                  type="checkbox"
                  className="border border-gray-300 rounded-md p-2"
                  checked={articleInfos.dtcons == 1}
                  disabled={!activerChampsForm}
                  onChange={(e) =>
                    handleChangeCheckbox(e.target.checked, "dtcons")
                  }
                />
              </div>
            </div>
            <fieldset className="border border-gray-300 p-4 rounded-md">
              <legend className="text-lg font-semibold text-[rgb(48,60,123)] px-2">
                Taxe
              </legend>

              <div className="flex flex-wrap items-center gap-x-6">
                {/* %TVA */}
                <div className="flex flex-col w-1/3">
                  <label className="font-bold text-[rgb(48,60,123)]">
                    %TVA
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={articleInfos.tauxtva}
                    onChange={(e) =>
                      hundlesubmitTousLesChamp(e.target.value, "tauxtva")
                    }
                    disabled={!activerChampsForm}
                  />
                </div>

                {/* Fodec */}
                <div className="flex flex-col w-1/3">
                  <label className="font-bold text-[rgb(48,60,123)]">
                    Fodec
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={articleInfos.fodec}
                    onChange={(e) =>
                      hundlesubmitTousLesChamp(e.target.value, "fodec")
                    }
                    disabled={!activerChampsForm}
                  />
                </div>
              </div>
            </fieldset>
          </div>

          <div className="recentCustomers">
            <div className="cardHeader">
              {/* <h2>PARAMETTRE DE FACTURATION</h2> */}
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

                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    value={articleInfos.unite}
                    onChange={(e) =>
                      hundlesubmitTousLesChamp(e.target.value, "unite")
                    }
                    disabled={!activerChampsForm}
                  />
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
                    value={articleInfos.prixbrut}
                    onChange={(e) =>
                      hundlesubmitTousLesChamp(e.target.value, "prixbrut")
                    }
                    disabled={!activerChampsForm}
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
                    value={articleInfos.prixnet}
                    onChange={(e) =>
                      hundlesubmitTousLesChamp(e.target.value, "prixnet")
                    }
                    disabled={!activerChampsForm}
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
                    value={articleInfos.nbrunite}
                    onChange={(e) =>
                      hundlesubmitTousLesChamp(e.target.value, "nbrunite")
                    }
                    disabled={!activerChampsForm}
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
                    value={articleInfos.comptec}
                    onChange={(e) =>
                      hundlesubmitTousLesChamp(e.target.value, "comptec")
                    }
                    disabled={!activerChampsForm}
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="flex flex-col w-2/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Type
                  </label>
                  <select
                    className="border border-gray-300 rounded-md p-2"
                    value={articleInfos.type}
                    onChange={(e) =>
                      hundlesubmitTousLesChamp(e.target.value, "type")
                    }
                    disabled={!activerChampsForm}
                  >
                    <option value="">-- Sélectionner --</option>
                    <option value="stock">sur Stock</option>
                    <option value="service">de service</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-x-4">
                <div className="flex items-center gap-x-2">
                  <input
                    disabled={!activerChampsForm}
                    type="radio"
                    className="border border-gray-300 rounded-md"
                    checked={articleInfos.typeart == "PF"}
                    name="typeart"
                    onChange={(e) => handleChangeRadio("PF", "typeart")}
                  />
                  <label className="text-[rgb(48,60,123)]">PF</label>
                </div>

                <div className="flex items-center gap-x-2">
                  <input
                    disabled={!activerChampsForm}
                    type="radio"
                    className="border border-gray-300 rounded-md"
                    checked={articleInfos.typeart == "X"}
                    name="typeart"
                    onChange={(e) => handleChangeRadio("X", "typeart")}
                  />
                  <label className="text-[rgb(48,60,123)]">X</label>
                </div>

                <div className="flex items-center gap-x-2">
                  <input
                    disabled={!activerChampsForm}
                    type="radio"
                    className="border border-gray-300 rounded-md"
                    checked={articleInfos.typeart == "MP"}
                    name="typeart"
                    onChange={(e) => handleChangeRadio("MP", "typeart")}
                  />
                  <label className="text-[rgb(48,60,123)]">MP</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full min-h-screen p-4">
          {/* Conteneur principal des onglets - Taille augmentée */}
          <div
            role="tablist"
            className="tabs tabs-lifted tabs-lg w-full [&>.tab]:flex-1 [&>.tab]:px-6 [&>.tab]:py-4 [&>.tab]:text-lg"
           >
            {/* Onglet Stock */}
            <input
              type="radio"
              name="my_tabs_6"
              className="tab"
              aria-label="Stock"
            />
            <div className="tab-content bg-base-100 border-base-300 rounded-lg p-8 w-full min-h-[400px]">
              <div className="w-full h-full flex flex-col">
                {/* Partie supérieure (Tables - 49%) */}
                <div className="flex flex-nowrap w-full h-[49%] mb-6">
                  {" "}
                  {/* Added mb-4 for space */}
                  {/* Première table */}
                  <div className="h-full overflow-y-auto w-1/2 pr-2">
                    <table className="table table-pin-rows bg-base-200 w-full">
                      <thead>
                        <tr>
                          <th>N°</th>
                          <th>Point de Vente</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Ant-Man</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Aquaman</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Asterix</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* Deuxième table */}
                  <div className="h-full overflow-y-auto w-1/2 pl-2">
                    <table className="table table-pin-rows bg-base-200 w-full">
                      <thead>
                        <tr>
                          <th>N°</th>
                          <th>Dépôt de stock</th>
                          <th>QTE ART</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Cy Ganderton</td>
                          <td>Quality Control Specialist</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Hart Hagerty</td>
                          <td>Desktop Support Technician</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Brice Swyre</td>
                          <td>Tax Accountant</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Partie inférieure (Stats - 49%) */}
                <div className="flex flex-nowrap w-full h-[49%] mt-9">
                  {" "}
                  {/* Added mt-4 for space */}
                  {/* Section Siege Local */}
                  <div className="w-1/2 flex flex-col justify-center items-center border border-base-300 rounded-lg p-4">
                    <h1 className="text-lg font-bold mb-2">Siege Local</h1>
                    <div className="grid grid-cols-2 gap-x-4 w-full">
                      <div>Qte en Stock</div>
                      <div className="text-right">1000</div>
                    </div>
                  </div>
                  {/* Section Stock global */}
                  <div className="w-1/2 flex flex-col justify-center items-center border border-base-300 rounded-lg p-4 ml-4">
                    <h1 className="text-lg font-bold mb-2">
                      Stock tous points de vente
                    </h1>
                    <div className="grid grid-cols-2 gap-x-4 w-full">
                      <div>Qte en Stock</div>
                      <div className="text-right">1000</div>
                      <div>Qte Reserve</div>
                      <div className="text-right">9</div>
                      <div>Qte Disponible</div>
                      <div className="text-right">9</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Onglet Valorisation (par défaut) */}
            <input
              type="radio"
              name="my_tabs_6"
              className="tab"
              aria-label="Valorisation"
              defaultChecked
            />
            <div className="tab-content bg-base-100 border-base-300 rounded-lg p-8 w-full min-h-[400px] space-y-6">
              <div className="w-full h-full">
                {/* Contenu Valorisation */}
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    {/* head */}
                    <thead>
                      <tr>
                        <th></th>
                        <th>Prix Ht</th>
                        <th>Prix TTC</th>
                        <th>Rem.Max</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      <tr>
                        <th>Prix 1</th>
                        <td>
                          <input
                            type="text"
                            placeholder="Extra Small"
                            className="input input-xs"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="Extra Small"
                            className="input input-xs"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="Extra Small"
                            className="input input-xs"
                          />
                        </td>
                      </tr>
                      {/* row 2 */}
                      <tr>
                        <th>prix2</th>
                        <td>
                          <input
                            type="text"
                            placeholder="Extra Small"
                            className="input input-xs"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="Extra Small"
                            className="input input-xs"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="Extra Small"
                            className="input input-xs"
                          />
                        </td>
                      </tr>
                      {/* row 3 */}
                      <tr>
                        <th>prix 3</th>
                        <td>
                          <input
                            type="text"
                            placeholder="Extra Small"
                            className="input input-xs"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="Extra Small"
                            className="input input-xs"
                          />
                        </td>
                      </tr>
                      {/* row 4 */}
                      <tr>
                        <th>prix 4</th>
                        <td>
                          <input
                            type="text"
                            placeholder="Extra Small"
                            className="input input-xs"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="Extra Small"
                            className="input input-xs"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="Extra Small"
                            className="input input-xs"
                          />
                        </td>
                      </tr>
                      {/* row 5 */}
                      <tr>
                        <th>prix 1 publique</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Onglet Utilitaire - Version améliorée */}
            {/* Onglet Utilitaire - Version alignée sur une ligne */}
            <input
              type="radio"
              name="my_tabs_6"
              className="tab"
              aria-label="Utilitaire"
            />
            <div className="tab-content bg-base-100 border border-gray-200 rounded-lg p-6 w-full min-h-[400px]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Section Options */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">
                    Options
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        disabled={!activerChampsForm}
                        className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                        checked={
                          articleInfos.gestionstock != "N" &&
                          articleInfos.gestionstock != ""
                        }
                        onChange={(e) =>
                          handleChangeCheckbox(e.target.checked, "gestionstock")
                        }
                      />
                      <label className="ml-3 text-gray-700 font-medium">
                        Gestion de Stock
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        disabled={!activerChampsForm}
                        className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                        checked={
                          articleInfos.avecconfig != "N" &&
                          articleInfos.avecconfig != ""
                        }
                        onChange={(e) =>
                          handleChangeCheckbox(e.target.checked, "avecconfig")
                        }
                      />
                      <label className="ml-3 text-gray-700 font-medium">
                        Configuration Art
                      </label>
                    </div>
                  </div>
                </div>

                {/* Section Configuration */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">
                    Configuration
                  </h3>
                  <textarea
                    className="w-full h-48 border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={articleInfos.CONFIG}
                    disabled={!activerChampsForm}
                    onChange={(e) =>
                      hundlesubmitTousLesChamp(e.target.value, "CONFIG")
                    }
                  />
                </div>

                {/* Section Historique */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">
                    Historique
                  </h3>
                  <div className="space-y-4">
                    {/* Création */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1">
                        Création
                      </label>
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                        disabled
                        value={articleInfos.usera || infosUtilisateur.codeuser}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1">
                        Date Création
                      </label>
                      <input
                        type="date"
                        value={articleInfos.datecreate}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                        disabled
                      />
                    </div>

                    {/* Modification (si en mode modification) */}
                    {toolbarMode == "modification" && (
                      <>
                        <div className="flex flex-col">
                          <label className="text-sm font-medium text-gray-700 mb-1">
                            Modification
                          </label>
                          <input
                            type="text"
                            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                            value={
                              articleInfos.userm || infosUtilisateur.codeuser
                            }
                            disabled
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-sm font-medium text-gray-700 mb-1">
                            Date modification
                          </label>
                          <input
                            type="date"
                            value={articleInfos.datemaj}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                            disabled
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
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
