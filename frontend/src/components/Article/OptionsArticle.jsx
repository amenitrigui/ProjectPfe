import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setArticleInfos } from "../../app/article_slices/articleSlice";
import { isNumerique } from "../../utils/validations";

function OptionsArticle() {
  const dispatch = useDispatch();
  const articleInfos = useSelector((state) => state.articleSlice.articleInfos);
  const toolbarMode = useSelector((state) => state.interfaceSlice.toolbarMode);
  const activerChampsForm = useSelector(
    (state) => state.interfaceSlice.activerChampsForm
  );

  const hundlesubmitTousLesChamp = (valeur, colonne) => {
    const colNum = ["comptec", "nbrunite","unite","prixbrut","prixnet"];
    
        if ((colNum.includes(colonne) && isNumerique(valeur))) {
          dispatch(setArticleInfos({ valeur, colonne }));
        }
  };
  const hundlesubmittypeChamp=(valeur,colonne)=>{
    dispatch(setArticleInfos({ valeur, colonne }));

  }

  const handleChangeRadio = (valeur, colonne) => {
    if (toolbarMode == "ajout" || toolbarMode == "modification") {
      dispatch(setArticleInfos({ colonne: colonne, valeur: valeur }));
    }
  };
  return (
    <>
      {/* Unité, Brut, Net */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="space-y-1">
          <label className="block font-semibold text-blue-900">Unité</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            value={articleInfos.unite}
            onChange={(e) => hundlesubmitTousLesChamp(e.target.value, "unite")}
            disabled={!activerChampsForm}
          />
        </div>
        <div className="space-y-1">
          <label className="block font-semibold text-blue-900">Brut</label>
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
          <label className="block font-semibold text-blue-900">Net</label>
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
          <label className="block font-semibold text-blue-900">Nb/Unité</label>
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
        <label className="block font-semibold text-blue-900">Type</label>
        <select
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          value={articleInfos.type}
          onChange={(e) => hundlesubmittypeChamp(e.target.value, "type")}
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
    </>
  );
}

export default OptionsArticle;
