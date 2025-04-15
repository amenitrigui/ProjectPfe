import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getArticleFamiles,
  getArticleParCode,
  getListeCodesArticles,
  setArticleInfos,
  viderChampsArticleInfo,
} from "../../app/article_slices/articleSlice";
import { setDevisArticles } from "../../app/devis_slices/devisSlice";
import { setAfficherRecherchePopup, setToolbarTable } from "../../app/interface_slices/uiSlice";

function ArticlesDevis() {
  //?==================================================================================================================
  //?====================================================Variables=====================================================
  //?==================================================================================================================
  const dispatch = useDispatch();
  const [netHt, setNetHt] = useState(0);
  const [puttc, setPuttc] = useState(0);
  const articleInfos = useSelector((state) => state.ArticlesDevis.articleInfos)
  const devisInfo = useSelector((state) => state.DevisCrud.devisInfo);

  //?==================================================================================================================
  //?=================================================appels useEffect=================================================
  //?==================================================================================================================
  useEffect(() => {
    dispatch(getArticleFamiles());
  }, []);
  useEffect(() => {
    setNetHt((articleInfos.quantite * articleInfos.prix1 * (1 - articleInfos.DREMISE / 100)).toFixed(3) || 0);
  }, [articleInfos.quantite, articleInfos.prix1, articleInfos.DREMISE])

  useEffect(() => {
    setPuttc((articleInfos.prix1 * (1 + articleInfos.tauxtva / 100)).toFixed(3) || 0)
  }, [articleInfos.prix1, articleInfos.tauxtva])
  //?==================================================================================================================
  //?=====================================================fonctions====================================================
  //?==================================================================================================================
  const handlecodeFamilleChange = (codeFamille) => {
    dispatch(setArticleInfos({ colonne: "famille", valeur: codeFamille }))
    dispatch(getListeCodesArticles(codeFamille));
  };
  const handleCodeArticleChange = (codeArticle) => {
    dispatch(setArticleInfos({ colonne: "code", valeur: codeArticle }))
    dispatch(getArticleParCode(codeArticle));
  };
  const handleChangementChamp = (colonne, e) => {
    dispatch(setArticleInfos({ colonne: colonne, valeur: e.target.value }))
  }
  const handleValiderLDFPBtnClick = () => {
    if(!articleInfos.quantite) {
      alert("la quantité est necessaire");
      return false;
    }

    if(!articleInfos.DREMISE) {
      alert("le champ remise est necessaire");
      return false;
    }

    dispatch(setDevisArticles(articleInfos));
    dispatch(viderChampsArticleInfo());
  }

  const afficherRecherchePopup = (nomTable) => {
    dispatch(setToolbarTable(nomTable));
    dispatch(setAfficherRecherchePopup(true));
  }
  return (
    <div className="space-y-4 p-4 border rounded-md mt-4">
      <div className="space-y-4 p-4 border rounded-md mt-4">
        <h3 className="text-lg font-bold">Articles</h3>

        <div className="grid grid-cols-6 gap-4 items-center">
          <div>
            <label className="block font-medium">FAMILLE</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2"
              value={articleInfos.famille}
              placeholder="Sélectionner ou taper une famille"
              onChange={(e) => {
                handlecodeFamilleChange(e.target.value);
              }}

              onClick={() => {afficherRecherchePopup("famille")}}
            />
          </div>

          <div>
            <label className="block font-medium">CODE ARTICLE</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2"
              value={articleInfos.code || ""}
              list="listecodeArticle"
              placeholder="Sélectionner ou taper un code d'article"
              onChange={(e) => {
                handleCodeArticleChange(e.target.value);
              }}
              onClick={() => afficherRecherchePopup("article")}
            />
          </div>
          <div>
            <label className="block font-medium">LIBELLE</label>
            <input
              type="text"
              placeholder="Sélectionner un code article"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={articleInfos.libelle || ""}
              onChange={(e) => handleChangementChamp("libelle", e)}
              readOnly
            />
          </div>

          <div>
            <label className="block font-medium">UNITE</label>
            <input
              type="text"
              placeholder="Sélectionner un code article"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={articleInfos.unite || ""}
              readOnly
              onChange={(e) => handleChangementChamp("unite", e)}
            />
          </div>

          <div>
            <label className="block font-medium">QUANTITE</label>
            <input
              type="text"
              placeholder="Sélectionner un code article"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => handleChangementChamp("quantite", e)}
            />
          </div>

          <div>
            <label className="block font-medium">CONFIG</label>
            <textarea
              placeholder="Sélectionner un code article"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={articleInfos.CONFIG}
              onChange={(e) => handleChangementChamp("CONFIG", e)}
            />
          </div>
        </div>
      
      <div className="grid grid-cols-6 gap-4 items-center">
        <div>
          <label className="block font-medium">REMISE</label>
          <input
            type="text"
            step="0.001"
            placeholder="Remise"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => handleChangementChamp("DREMISE", e)}
          />
        </div>

        <div>
          <label className="block font-medium">T.V.A</label>
          <input
            type="text"
            placeholder="tauxtva"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={articleInfos.tauxtva || ""}
            onChange={(e) => handleChangementChamp("tauxtva", e)}
          />
        </div>

        <div>
          <label className="block font-medium">P.U.T.T.C</label>
          <input
            type="text"
            step="0.001"
            placeholder="puttc"
            value={puttc}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block font-medium">MT NET H.T</label>
          <input
            type="text"
            placeholder="netHt"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={netHt}
            readOnly
          />
        </div>
        <div className="flex-1">
          <label className="block font-medium">Nbr/Uté </label>

          <input
            type="text"
            placeholder="nbrunite"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={articleInfos.nbrunite || ""}
            readOnly
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block font-medium">P.U.H.T</label>
            <input
              type="text"
              step="0.001"
              placeholder="prix1"
              value={articleInfos.prix1 || ""}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex space-x-2 justify-end">
          <button
            className="text-green-500 p-2 border rounded-lg hover:bg-green-100"
            title="Valider"
            onClick={handleValiderLDFPBtnClick}
          >
            <CheckIcon className="h-6 w-6" />
          </button>

          <button
            className="text-blue-500 p-2 border rounded-lg hover:bg-blue-100"
            title="Modifier"
          >
            <PencilIcon className="h-6 w-6" />
          </button>

          <button
            className="text-red-500 p-2 border rounded-lg hover:bg-red-100"
            title="Supprimer"
          >
            <TrashIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default ArticlesDevis;
