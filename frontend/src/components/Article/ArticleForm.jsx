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
  setOuvrireDrawerMenu,
  setToolbarMode,
  setToolbarTable,
} from "../../app/interface_slices/uiSlice";
import SideBar from "../Common/SideBar";
function ArticleForm() {
  // * pour afficher le sidebar
  const ouvrireMenuDrawer = useSelector((state) => state.uiStates.ouvrireMenuDrawer);
  const [isOpen, setIsOpen] = useState(false);
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
// Fonction pour basculer la visibilité de la sidebar
const toggleSidebar = () => {
  dispatch(setOuvrireDrawerMenu(!ouvrireMenuDrawer));
};
return (
  <div className="container">
    <SideBar />
      <div className={`main ${ouvrireMenuDrawer ? "active" : ""}`}>
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
                  value={articleInfos.libelle}
                  disabled={!activerChampsForm}
                  onChange={(e) =>
                    hundlesubmitTousLesChamp(e.target.value, "libelle")
                  }
                />
              </div>
              <div className="flex flex-col w-1/3">
                <label
                  className="font-bold mb-1"
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
        {/* name of each tab group should be unique */}
        <div role="tablist" className="tabs tabs-lifted tabs-lg">
          <input
            type="radio"
            name="my_tabs_6"
            className="tab"
            aria-label="Stock"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            Tab content 1
          </div>

          <input
            type="radio"
            name="my_tabs_6"
            className="tab"
            aria-label="valorisation"
            defaultChecked
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            Tab content 2
          </div>

          <input
            type="radio"
            name="my_tabs_6"
            className="tab"
            aria-label="utilitaire"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
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
                            disabled={!activerChampsForm}
                            className="border border-gray-300 rounded-md"
                            checked={
                              articleInfos.gestionstock != "N" &&
                              articleInfos.gestionstock != ""
                            }
                            onChange={(e) =>
                              handleChangeCheckbox(
                                e.target.checked,
                                "gestionstock"
                              )
                            }
                          />
                          <label className="text-blue-900">
                            Gestion de Stock
                          </label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            disabled={!activerChampsForm}
                            className="border border-gray-300 rounded-md"
                            checked={
                              articleInfos.avecconfig != "N" &&
                              articleInfos.avecconfig != ""
                            }
                            onChange={(e) =>
                              handleChangeCheckbox(
                                e.target.checked,
                                "avecconfig"
                              )
                            }
                          />
                          <label className="text-blue-900">
                            Configuration Art
                          </label>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label
                          className="block font-bold text-center"
                          style={{ color: "rgb(48, 60, 123)" }}
                        >
                          Configuiration
                        </label>

                        <textarea
                          className="w-full border border-gray-300 rounded-md p-2"
                          value={articleInfos.CONFIG}
                          rows={10}
                          cols={30}
                          disabled={!activerChampsForm}
                          onChange={(e) =>
                            hundlesubmitTousLesChamp(e.target.value, "CONFIG")
                          }
                        />
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
                        value={articleInfos.usera || infosUtilisateur.codeuser}
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <label
                        className="font-medium w-1/3 text-left block "
                        style={{ color: "rgb(48, 60, 123)" }}
                      >
                        Date Creation
                      </label>
                      <input
                        type="date"
                        value={articleInfos.datecreate}
                        className="border border-gray-300 rounded-md p-2 w-2/3"
                        disabled
                      />
                    </div>

                    {/* Ligne pour "Modification" */}
                    {toolbarMode == "modification" && (
                      <>
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
                            value={
                              articleInfos.userm || infosUtilisateur.codeuser
                            }
                            disabled
                          />
                        </div>

                        <div className="flex items-center space-x-4">
                          <label
                            className="font-medium w-1/3 text-left block "
                            style={{ color: "rgb(48, 60, 123)" }}
                          >
                            Date modification
                          </label>
                          <input
                            type="date"
                            value={articleInfos.datemaj}
                            className="border border-gray-300 rounded-md p-2 w-2/3"
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
