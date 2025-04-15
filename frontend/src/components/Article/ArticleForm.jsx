import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaCog, FaSignOutAlt, FaRegUserCircle } from "react-icons/fa";
import ToolBar from "../Common/ToolBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getDesignationFamilleParCodeFamille,
  getdesignationSousFamillebycodeSousFamille,
  getListeCodesArticles,
  getListecodesousFamille,
  getListeFamillesArticle,
  setArticleInfos,
  viderChampsArticleInfo,
} from "../../app/article_slices/articleSlice";
import {
  setAfficherFamillePopub,
  setAfficherRecherchePopup,
  setOuvrireDrawerMenu,
  setToolbarTable,
} from "../../app/interface_slices/uiSlice";
import SideBar from "../Common/SideBar";
import { getPrixVente } from "../../app/Stock_valorisation_utilitaires/valorisation_Slice";
import {
  getListedepotdeStockparpcodepointvente,
  getlistepointvente,
  getQteTotalArticle,
} from "../../app/Stock_valorisation_utilitaires/Stock_Slice";
import Tab from "./Tab";
function ArticleForm() {
  //?==================================================================================================================
  //?=====================================================variables====================================================
  //?==================================================================================================================
  // * pour afficher le sidebar
  const ouvrireMenuDrawer = useSelector(
    (state) => state.uiStates.ouvrireMenuDrawer
  );
  const [isOpen, setIsOpen] = useState(false);
  const articleInfos = useSelector((state) => state.ArticlesDevis.articleInfos);
  const ListeFamille = useSelector((state) => state.ArticlesDevis.ListeFamille);
  const toolbarMode = useSelector((state) => state.uiStates.toolbarMode);
  const ListeSousFamille = useSelector(
    (state) => state.ArticlesDevis.ListeSousFamille
  );
  const dispatch = useDispatch();
  const infosUtilisateur = useSelector(
    (state) => state.UtilisateurInfo.infosUtilisateur
  );
  //?==================================================================================================================
  //?==============================================appels UseEffect====================================================
  //?==================================================================================================================
  useEffect(() => {
    dispatch(getListeFamillesArticle()); //* la colonne code Famille
    dispatch(getListecodesousFamille()); //** la collone de code sous famille */
    dispatch(getListeCodesArticles()); // * la colonne de code article
  }, []);
  useEffect(() => {
    if (articleInfos.code && articleInfos.code != "")
      dispatch(getPrixVente(articleInfos.code));
  }, [articleInfos.code]);
  useEffect(() => {
    if (articleInfos.code) dispatch(getPrixVente(articleInfos.code));
  }, [articleInfos.code]);
  useEffect(() => {
    if (articleInfos.codesousfam && articleInfos.codesousfam != "") {
      dispatch(
        getdesignationSousFamillebycodeSousFamille(articleInfos.codesousfam)
      );
    }
  }, [articleInfos.codesousfam]);

  useEffect(() => {
    if (articleInfos.famille && articleInfos.famille != "") {
      dispatch(getDesignationFamilleParCodeFamille(articleInfos.famille));
    }
  }, [articleInfos.famille]);

  const activerChampsForm = useSelector(
    (state) => state.uiStates.activerChampsForm
  );
  useEffect(() => {
    if (articleInfos.code && articleInfos.code != "") {
      dispatch(
        getListedepotdeStockparpcodepointvente({
          codepv: "01",
          codeArticle: articleInfos.code,
        })
      );
      dispatch(getQteTotalArticle(articleInfos.code));
      dispatch(getlistepointvente());
    }
  }, [articleInfos.code]);

  //?==================================================================================================================
  //?=====================================================fonctions====================================================
  //?==================================================================================================================
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

  const togglePopup = (NomTable) => {
    dispatch(setToolbarTable(NomTable));

    dispatch(setAfficherFamillePopub(true));
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
              <FaRegUserCircle className="mr-3 text-3xl" />
              {/* Indicateur de statut en ligne */}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>

            {/* Menu déroulant */}
            {isOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white border rounded-lg shadow-lg z-50">
                <div className="p-4 flex items-center border-b">
                  <FaRegUserCircle className="mr-3 text-3xl" />
                  <div>
                    <p className="font-semibold">{infosUtilisateur.nom}</p>
                    <p className="text-sm text-gray-500">
                      {infosUtilisateur.type}
                    </p>
                  </div>
                </div>
                <ul className="py-2">
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer">
                    <Link
                      to="/UtilisateurFormTout"
                      className="flex items-center w-full"
                    >
                      <FaUser className="mr-3" /> My Profile
                    </Link>
                  </li>
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer">
                    <Link to="/Settings" className="flex items-center w-full">
                      <FaCog className="mr-3" /> Settings
                    </Link>
                  </li>

                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer border-t">
                    <Link to="/" className="flex items-center w-full">
                      <FaSignOutAlt className="mr-3" /> Log Out
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="details p-6">
          <div className="ameni">
            {/* Titre */}
            <div className="cardHeader mb-6">
              <h2 className="text-3xl font-bold text-blue-900 italic">
                Fiche Article
              </h2>
            </div>

            {/* Conteneur principal avec disposition horizontale */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Section Article (gauche) */}
              <div className="flex-1 space-y-4">
                {/* Famille/Sous-Famille */}

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  <div className="col-span-12 md:col-span-3 space-y-1">
                    <label className="block font-semibold text-blue-900">
                      Code Famille
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
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
                      {ListeFamille.map((famille, indice) => (
                        <option key={indice} value={famille.code}>
                          {famille.code}
                        </option>
                      ))}
                    </datalist>
                  </div>

                  <div className="col-span-12 md:col-span-7 space-y-1">
                    <label className="block font-semibold text-blue-900">
                      Désignation Famille
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                      value={articleInfos.libelleFamille}
                      onChange={(e) =>
                        hundlesubmitTousLesChamp(
                          e.target.value,
                          "libelleFamille"
                        )
                      }
                      disabled={!activerChampsForm}
                    />
                  </div>

                  <div className="col-span-12 md:col-span-2 flex items-end">
                    <button
                      className="btn btn-outline btn-accent w-full"
                      onClick={() => togglePopup("famille")}
                    >
                      <i className="fas fa-plus-circle"></i>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  {/* Code Sous-Famille */}
                  <div className="col-span-12 md:col-span-3 space-y-1">
                    <label className="block font-semibold text-blue-900">
                      Code Sous-Fam
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
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
                      {ListeSousFamille.map((Sousfamille, indice) => (
                        <option key={indice} value={Sousfamille.code}>
                          {Sousfamille.code}
                        </option>
                      ))}
                    </datalist>
                  </div>

                  {/* Désignation Sous-Famille */}
                  <div className="col-span-12 md:col-span-7 space-y-1">
                    <label className="block font-semibold text-blue-900">
                      Désignation Sous-Famille
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
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

                  {/* Bouton */}
                  <div className="col-span-12 md:col-span-2 flex items-end">
                    <button
                      className="btn btn-outline btn-accent w-full"
                      onClick={() => togglePopup("sousfamille")}
                    >
                      <i className="fas fa-plus-circle"></i>
                    </button>
                  </div>
                </div>

                {/* Code Article et Désignation */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  {/* Code Article */}
                  <div className="col-span-12 md:col-span-4 space-y-1">
                    <label className="block font-semibold text-blue-900">
                      Code Article
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
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
                  </div>

                  {/* Désignation Article */}
                  <div className="col-span-12 md:col-span-8 space-y-1">
                    <label className="block font-semibold text-blue-900">
                      Désignation Article
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                      value={articleInfos.libelle}
                      disabled={!activerChampsForm}
                      onChange={(e) =>
                        hundlesubmitTousLesChamp(e.target.value, "libelle")
                      }
                    />
                  </div>
                </div>

                {/* Checkbox DC */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    checked={articleInfos.dtcons == 1}
                    disabled={!activerChampsForm}
                    onChange={(e) =>
                      handleChangeCheckbox(e.target.checked, "dtcons")
                    }
                  />
                  <label className="font-semibold text-blue-900">DC</label>
                </div>

                {/* Taxe */}
                <fieldset className="border border-gray-300 p-4 rounded-lg mt-4">
                  <legend className="px-2 text-lg font-semibold text-blue-900">
                    Taxe
                  </legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block font-semibold text-blue-900">
                        %TVA
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                        value={articleInfos.tauxtva}
                        onChange={(e) =>
                          hundlesubmitTousLesChamp(e.target.value, "tauxtva")
                        }
                        disabled={!activerChampsForm}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block font-semibold text-blue-900">
                        Fodec
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
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

              {/* Section Options (droite) */}
              <div className="flex-1 space-y-4">
                <fieldset className="border border-gray-300 p-4 rounded-lg h-full">
                  <legend className="px-2 text-lg font-semibold text-blue-900">
                    Options
                  </legend>

                  {/* Unité, Brut, Net */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="space-y-1">
                      <label className="block font-semibold text-blue-900">
                        Unité
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                        value={articleInfos.unite}
                        onChange={(e) =>
                          hundlesubmitTousLesChamp(e.target.value, "unite")
                        }
                        disabled={!activerChampsForm}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block font-semibold text-blue-900">
                        Brut
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                        value={articleInfos.prixbrut}
                        onChange={(e) =>
                          hundlesubmitTousLesChamp(e.target.value, "prixbrut")
                        }
                        disabled={!activerChampsForm}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block font-semibold text-blue-900">
                        Net
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                        value={articleInfos.prixnet}
                        onChange={(e) =>
                          hundlesubmitTousLesChamp(e.target.value, "prixnet")
                        }
                        disabled={!activerChampsForm}
                      />
                    </div>
                  </div>

                  {/* Nb/Unité et Compte Comptable */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1">
                      <label className="block font-semibold text-blue-900">
                        Nb/Unité
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                        value={articleInfos.nbrunite}
                        onChange={(e) =>
                          hundlesubmitTousLesChamp(e.target.value, "nbrunite")
                        }
                        disabled={!activerChampsForm}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block font-semibold text-blue-900">
                        Compte Comptable
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                        value={articleInfos.comptec}
                        onChange={(e) =>
                          hundlesubmitTousLesChamp(e.target.value, "comptec")
                        }
                        disabled={!activerChampsForm}
                      />
                    </div>
                  </div>

                  {/* Type Article */}
                  <div className="space-y-1 mb-4">
                    <label className="block font-semibold text-blue-900">
                      Type
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
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

                  {/* Radio Buttons */}
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                        checked={articleInfos.typeart == "PF"}
                        name="typeart"
                        onChange={() => handleChangeRadio("PF", "typeart")}
                        disabled={!activerChampsForm}
                      />
                      <label className="ml-2 text-blue-900">PF</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                        checked={articleInfos.typeart == "X"}
                        name="typeart"
                        onChange={() => handleChangeRadio("X", "typeart")}
                        disabled={!activerChampsForm}
                      />
                      <label className="ml-2 text-blue-900">X</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                        checked={articleInfos.typeart == "MP"}
                        name="typeart"
                        onChange={() => handleChangeRadio("MP", "typeart")}
                        disabled={!activerChampsForm}
                      />
                      <label className="ml-2 text-blue-900">MP</label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div className="details ">
          <Tab />
        </div>
      </div>

      <script src="%PUBLIC_URL%/assets/js/main.js"></script>
    </div>
  );
}

export default ArticleForm;
