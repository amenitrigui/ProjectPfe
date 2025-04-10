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
import {
  getListedepotdeStockparpcodepointvente,
  getlistepointvente,
} from "../../app/Stock_valorisation_utilitaires/Stock_Slice";
import { getPrixVente } from "../../app/Stock_valorisation_utilitaires/valorisation_Slice";
function ArticleForm() {
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
  const listePointVente = useSelector(
    (state) => state.Stock_Slice.listePointVente
  );
  const listedepot = useSelector((state) => state.Stock_Slice.listedepot);

  const listePrixVente = useSelector((state) => state.valorisation_Slice);
  console.log(listePrixVente);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListeFamillesArticle()); //* la colonne code Famille
    dispatch(getListecodesousFamille()); //** la collone de code sous famille */
    dispatch(getListeCodesArticles()); // * la colonne de code article
    dispatch(getlistepointvente());
    dispatch(getListedepotdeStockparpcodepointvente("01"));
  }, []);
  useEffect(() => {
    if (articleInfos.code) dispatch(getPrixVente(articleInfos.code));
  }, [articleInfos.code]);

  const infosUtilisateur = useSelector(
    (state) => state.UtilisateurInfo.infosUtilisateur
  );
  const ListeCodeArticles = useSelector(
    (state) => state.ArticlesDevis.ListeCodeArticles
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
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
                  <div className="space-y-1">
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block font-semibold text-blue-900">
                      Code Sous-Famille
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
                  <div className="space-y-1">
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
                </div>

                {/* Code Article et Désignation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
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
                  <datalist id="listeCodesArticle">
                    {ListeCodeArticles.map((article, indice) => (
                      <option key={indice} value={article.code}>
                        {article.code}
                      </option>
                    ))}
                  </datalist>
                  <div className="space-y-1">
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
          <div className="mahdi">
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
                            {listePointVente.length > 0 ? (
                              listePointVente.map((PV, indice) => (
                                <tr key={indice}>
                                  {" "}
                                  {/* N'oubliez pas la prop key */}
                                  <td>{PV.Code}</td>
                                  <td>{PV.Libelle}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={2}>
                                  Aucune liste de point de vente
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      {/* Deuxième table */}
                      <div className="h-[400px] overflow-y-auto w-1/2 pl-2">
                        <table className="table table-pin-rows bg-base-200 w-full">
                          <thead>
                            <tr>
                              <th>N°</th>
                              <th>Dépôt de stock</th>
                              <th>QTE ART</th>
                            </tr>
                          </thead>
                          <tbody>
                            {listedepot.length > 0 ? (
                              listedepot.map((depot, indice) => (
                                <tr key={indice}>
                                  <td>{depot.Code}</td>
                                  <td>{depot.Libelle}</td>
                                  <td>{depot.SAISIQTENEG}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={3}>Aucune liste de depot</td>
                              </tr>
                            )}
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
                                //     value={Object.values(listePrixVente).length >0? listePrixVente.listePrixVente[0].prix1 : ""}
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
                              handleChangeCheckbox(
                                e.target.checked,
                                "gestionstock"
                              )
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
                              handleChangeCheckbox(
                                e.target.checked,
                                "avecconfig"
                              )
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
                            value={
                              articleInfos.usera || infosUtilisateur.codeuser
                            }
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
                                  articleInfos.userm ||
                                  infosUtilisateur.codeuser
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
        </div>
      </div>

      <script src="%PUBLIC_URL%/assets/js/main.js"></script>
    </div>
  );
}

export default ArticleForm;
