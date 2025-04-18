import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDesignationFamilleParCodeFamille,
  getdesignationSousFamillebycodeSousFamille,
  setArticleInfos,
  viderChampsArticleInfo,
} from "../../app/article_slices/articleSlice";
import UtilisateurCreaModif from "../Utilisateur/UtilisateurCreaModif";

function UtilitaireTab() {
  const dispatch = useDispatch();
  const toolbarMode = useSelector((state) => state.interfaceSlice.toolbarMode);
  const activerChampsForm = useSelector(
    (state) => state.interfaceSlice.activerChampsForm
  );

  const articleInfos = useSelector((state) => state.articleSlice.articleInfos);

  const infosUtilisateur = useSelector(
    (state) => state.utilisateurSlice.infosUtilisateur
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
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section Options */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Options</h3>
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
            onChange={(e) => hundlesubmitTousLesChamp(e.target.value, "CONFIG")}
          />
        </div>

        {/* Section Historique */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">
            Historique
          </h3>
          <UtilisateurCreaModif />
        </div>
      </div>
    </>
  );
}

export default UtilitaireTab;
