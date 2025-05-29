import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ToolBar from "../Common/ToolBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getArticleParCode,
  getDerniereCodeArticle,
  getDesignationFamilleParCodeFamille,
  getdesignationSousFamillebycodeSousFamille,
  getListeCodesArticles,
  getListecodesousFamille,
  getListeFamillesArticle,
  setArticleInfos,
  viderChampsArticleInfo,
} from "../../app/article_slices/articleSlice";
import {
  isAlphabetique,
  isAlphaNumerique,
  isNumerique,
} from "../../utils/validations";
import {
  setAfficherFamillePopub,
  setAfficherRecherchePopup,
  setToolbarTable,
} from "../../app/interface_slices/interfaceSlice";
import SideBar from "../Common/SideBar";
import { getPrixVente } from "../../app/Stock_valorisation_utilitaires/valorisation_Slice";
import {
  getListedepotdeStockparpcodepointvente,
  getlistepointvente,
  getQteTotalArticle,
} from "../../app/Stock_valorisation_utilitaires/Stock_Slice";
import Tab from "./Tab";
import OptionsArticle from "./OptionsArticle";
import { ResponsiveContainer } from "recharts";
import DateCreateMAJ from "../Common/DateCreateMAJ";
import { setToken } from "../../app/utilisateurSystemSlices/utilisateurSystemSlice";
function ArticleForm() {
  //?==================================================================================================================
  //?=====================================================variables====================================================
  //?==================================================================================================================
  const dispatch = useDispatch();
  // * pour afficher le sidebar
  const ouvrireMenuDrawer = useSelector(
    (state) => state.interfaceSlice.ouvrireMenuDrawer
  );
  const toolbarTable = useSelector(
    (state) => state.interfaceSlice.toolbarTable
  );
  const articleInfos = useSelector((state) => state.articleSlice.articleInfos);
  const toolbarMode = useSelector((state) => state.interfaceSlice.toolbarMode);
  const ListeCodeArticles = useSelector(
    (state) => state.articleSlice.ListeCodeArticles
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
    if (
      !articleInfos.code &&
      ListeCodeArticles.length > 0 &&
      toolbarMode != "ajout"
    ) {
      dispatch(
        setArticleInfos({
          colonne: "code",
          valeur: ListeCodeArticles[ListeCodeArticles.length - 1].code,
        })
      );
    }
    if (articleInfos.code && articleInfos.code != "") {
      if (toolbarMode != "ajout") {
        dispatch(getArticleParCode(articleInfos.code));
      }
      dispatch(getPrixVente(articleInfos.code));
    }
  }, [articleInfos.code, ListeCodeArticles, toolbarMode]);

  useEffect(() => {
    if (articleInfos.codesousfam && articleInfos.codesousfam != "") {
      dispatch(
        getdesignationSousFamillebycodeSousFamille(articleInfos.codesousfam)
      );
    }
  }, [articleInfos.codesousfam]);
  useEffect(() => {
    if (articleInfos.code && articleInfos.code != "") {
      // ? récuperer initialement les informations de premier depot
      dispatch(
        getListedepotdeStockparpcodepointvente({
          codepv: "01",
          codeArticle: articleInfos.code,
        })
      );
      dispatch(getQteTotalArticle(articleInfos.code));
      dispatch(getlistepointvente());
    }
  }, [articleInfos.code, articleInfos.codepv]);
  useEffect(() => {
    if (!articleInfos.famille) {
      dispatch(setArticleInfos({ colonne: "libelleFamille", valeur: "" }));
    }
    if (!articleInfos.codesousfam) {
      dispatch(setArticleInfos({ colonne: "Libellesousfamille", valeur: "" }));
    }
  }, [articleInfos.famille, articleInfos.codesousfam]);
  useEffect(() => {
    if (articleInfos.famille && articleInfos.famille != "") {
      dispatch(getDesignationFamilleParCodeFamille(articleInfos.famille));
    }
  }, [articleInfos.famille]);

  const activerChampsForm = useSelector(
    (state) => state.interfaceSlice.activerChampsForm
  );
  //?==================================================================================================================
  //?=====================================================fonctions====================================================
  //?==================================================================================================================
  const hundlesubmitTousLesChamp = (valeur, colonne) => {
    const colNum = ["tauxtva", "fodec", "code", "libelle"];
    const Alphapheti = ["libelle"];
    if (colNum.includes(colonne) && isNumerique(valeur)) {
      dispatch(setArticleInfos({ valeur, colonne }));
    }
    if (Alphapheti.includes(colonne) && isAlphaNumerique(valeur)) {
      dispatch(setArticleInfos({ valeur, colonne }));
    }

    if (colonne == "code") {
      if (valeur == "") {
        {
          dispatch(viderChampsArticleInfo());
        }
      } else {
        dispatch(setArticleInfos({ colonne, valeur }));
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

  const afficherRecherchePopup = () => {
    dispatch(setAfficherRecherchePopup(true));
  };

  const togglePopup = (NomTable) => {
    dispatch(setToolbarTable(NomTable));

    dispatch(setAfficherFamillePopub(true));
  };
  return (
    <div className="container">
      <SideBar />
      <div className={`main ${ouvrireMenuDrawer ? "active" : ""} bg-base-100`}>
        <ToolBar />
        <div className="details p-6">
          <div className="ameni bg-base-100">
            {/* Titre */}
            <div className="cardHeader ">
              <h2 className="text-3xl font-bold text-blue-900 italic">
                Fiche Article
              </h2>
            </div>
            {/* Conteneur principal avec disposition horizontale */}
            <div className="flex flex-col-2 gap-2">
              {/* Section Article (gauche) */}
              <div className="flex-1 space-y-4">
                {/* Famille/Sous-Famille */}

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  {/* Code famille */}
                  <div className="col-span-12 md:col-span-4 space-y-1">
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
                      readOnly={
                        toolbarMode === "ajout" ||
                        toolbarMode === "modification"
                      }
                      disabled={
                        toolbarMode === "consultation" ||
                        toolbarMode === "suppression"
                      }
                      onClick={() => {
                        if (
                          toolbarMode === "ajout" ||
                          toolbarMode === "modification"
                        ) {
                          dispatch(setToolbarTable("famille"));
                          afficherRecherchePopup();
                        }
                      }}
                    />
                  </div>

                  {/* Désignation Famille */}
                  <div className="col-span-12 md:col-span-8 space-y-1">
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
                  {/* Bouton Ajout d'une famille */}
                  {(toolbarMode == "ajout" ||
                    toolbarMode == "modification") && (
                    <div className="col-span-12 md:col-span-2 flex items-end">
                      <button
                        className="btn btn-outline btn-accent w-full"
                        onClick={() => togglePopup("famille")}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  {/* Code sous famille */}
                  <div className="col-span-12 md:col-span-4 space-y-1">
                    <label className="block font-semibold text-blue-900">
                      Code Sous-Fam
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                      value={articleInfos.codesousfam}
                      onChange={(e) =>
                        hundlesubmitTousLesChamp(e.target.value, "codesousfam")
                      }
                      readOnly={
                        toolbarMode === "ajout" ||
                        toolbarMode === "modification"
                      }
                      disabled={
                        toolbarMode === "consultation" ||
                        toolbarMode === "suppression"
                      }
                      onClick={() => {
                        if (
                          toolbarMode === "ajout" ||
                          toolbarMode === "modification"
                        ) {
                          dispatch(setToolbarTable("sousfamille"));
                          afficherRecherchePopup();
                        }
                      }}
                    />
                  </div>

                  {/* Désignation Sous-Famille */}
                  <div className="col-span-12 md:col-span-8 space-y-1">
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
                  {(toolbarMode == "ajout" ||
                    toolbarMode == "modification") && (
                    <div className="col-span-12 md:col-span-2 flex items-end">
                      <button
                        className="btn btn-outline btn-accent w-full"
                        onClick={() => togglePopup("sousfamille")}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </button>
                    </div>
                  )}
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
                      readOnly={toolbarMode != "ajout"}
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
              </div>

              {/* Section Options (droite) */}
              <div className="flex-1 space-y-4">
                <div className="collapse bg-base-100 border-base-300 border">
                  {/* Checkbox DC */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                      checked={articleInfos.Dtcons == 1}
                      disabled={!activerChampsForm}
                      onChange={(e) =>
                        handleChangeCheckbox(e.target.checked, "Dtcons")
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
                  <input type="checkbox" />
                  <div
                    className="collapse-title font-semibold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Options supplementaires d'article
                  </div>
                  <div className="collapse-content text-sm">
                    <ResponsiveContainer>
                      <OptionsArticle />
                    </ResponsiveContainer>
                  </div>
                  <DateCreateMAJ objet={articleInfos}></DateCreateMAJ>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="details p-6">
          <div className="collapse bg-base-100 border-base-300 border h-120 w-[100vw]">
            <input type="checkbox" />
            <div
              className="collapse-title font-semibold mb-1"
              style={{ color: "rgb(48, 60, 123)" }}
            >
              Informations supplementaires d'article
            </div>
            <div className="collapse-content text-sm w-[45vw]">
              <Tab />
            </div>
          </div>
        </div>
      </div>

      <script src="%PUBLIC_URL%/assets/js/main.js"></script>
    </div>
  );
}

export default ArticleForm;
