import { CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
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
import {
  setAfficherRecherchePopup,
  setToolbarTable,
} from "../../app/interface_slices/interfaceSlice";

function ArticlesDevis() {
  //?==================================================================================================================
  //?====================================================Variables=====================================================
  //?==================================================================================================================
  const dispatch = useDispatch();
  const [netHt, setNetHt] = useState(0);
  const [puttc, setPuttc] = useState(0);
  const articleInfos = useSelector((state) => state.articleSlice.articleInfos);
  const devisInfo = useSelector((state) => state.devisSlice.devisInfo);
  const lignedevisSelectionne = useSelector(
    (state) => state.interfaceSlice.lignedevisSelectionne
  );
  console.log(lignedevisSelectionne);
  //?==================================================================================================================
  //?=================================================appels useEffect=================================================
  //?==================================================================================================================
  useEffect(() => {
    dispatch(getArticleFamiles());
  }, []);
  useEffect(() => {
    setNetHt(
      (
        articleInfos.quantite *
        articleInfos.prix1 *
        (1 - articleInfos.DREMISE / 100)
      ).toFixed(3) || 0
    );
  }, [articleInfos.quantite, articleInfos.prix1, articleInfos.DREMISE]);

  useEffect(() => {
    setPuttc(
      (articleInfos.prix1 * (1 + articleInfos.tauxtva / 100)).toFixed(3) || 0
    );
  }, [articleInfos.prix1, articleInfos.tauxtva]);
  //?==================================================================================================================
  //?=====================================================fonctions====================================================
  //?==================================================================================================================
  const handlecodeFamilleChange = (codeFamille) => {
    dispatch(setArticleInfos({ colonne: "famille", valeur: codeFamille }));
    dispatch(getListeCodesArticles(codeFamille));
  };
  const handleCodeArticleChange = (codeArticle) => {
    dispatch(setArticleInfos({ colonne: "code", valeur: codeArticle }));
    dispatch(getArticleParCode(codeArticle));
  };
  const handleChangementChamp = (colonne, e) => {
    dispatch(setArticleInfos({ colonne: colonne, valeur: e.target.value }));
  };
  const handleValiderLDFPBtnClick = () => {
    if (!articleInfos.quantite) {
      alert("la quantité est necessaire");
      return false;
    }

    if (!articleInfos.DREMISE) {
      alert("le champ remise est necessaire");
      return false;
    }

    dispatch(setDevisArticles(articleInfos));
    dispatch(viderChampsArticleInfo());
  };

  const afficherRecherchePopup = (nomTable) => {
    dispatch(setToolbarTable(nomTable));
    dispatch(setAfficherRecherchePopup(true));
  };
  return (
    <div className="details">
      <div className="banquedetails">
        <div className="collapse bg-base-100 border-base-300 border">
          <input type="checkbox" />
          <div
            className="collapse-title font-semibold mb-1"
            style={{ color: "rgb(48, 60, 123)" }}
          >
            Les Articles
          </div>
          <div className="collapse-content text-sm">
            <div className="space-y-4 p-4 sm:p-6 border rounded-md mt-4">
              <div className="space-y-4">
                

                {/* Première grille d’inputs */}
                <div className="overflow-x-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                    {/* FAMILLE */}
                    <div>
                      <label className="block font-medium">FAMILLE</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={
                          articleInfos.famille
                            ? articleInfos.famille
                            : lignedevisSelectionne[0]
                            ? lignedevisSelectionne[0]
                            : ""
                        }
                        placeholder="Sélectionner ou taper une famille"
                        onChange={(e) =>
                          handlecodeFamilleChange(e.target.value)
                        }
                        onClick={() => afficherRecherchePopup("famille")}
                      />
                    </div>

                    {/* CODE ARTICLE */}
                    <div>
                      <label className="block font-medium">CODE ARTICLE</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={
                          articleInfos.code
                            ? articleInfos.code
                            : lignedevisSelectionne[1]
                            ? lignedevisSelectionne[1]
                            : ""
                        }
                        list="listecodeArticle"
                        placeholder="Sélectionner ou taper un code d'article"
                        onChange={(e) =>
                          handleCodeArticleChange(e.target.value)
                        }
                        onClick={() => afficherRecherchePopup("article")}
                      />
                    </div>

                    {/* LIBELLE */}
                    <div>
                      <label className="block font-medium">LIBELLE</label>
                      <input
                        type="text"
                        placeholder="Sélectionner un code article"
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={
                          articleInfos.libelle
                            ? articleInfos.libelle
                            : lignedevisSelectionne[2]
                            ? lignedevisSelectionne[2]
                            : ""
                        }
                        onChange={(e) => handleChangementChamp("libelle", e)}
                        readOnly
                      />
                    </div>

                    {/* UNITE */}
                    <div>
                      <label className="block font-medium">UNITE</label>
                      <input
                        type="text"
                        placeholder="Sélectionner un code article"
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={
                          articleInfos.unite
                            ? articleInfos.unite
                            : lignedevisSelectionne[3]
                            ? lignedevisSelectionne[3]
                            : ""
                        }
                        readOnly
                        onChange={(e) => handleChangementChamp("unite", e)}
                      />
                    </div>

                    {/* QUANTITE */}
                    <div>
                      <label className="block font-medium">QUANTITE</label>
                      <input
                        type="text"
                        placeholder="Sélectionner un code article"
                        className="w-full border border-gray-300 rounded-md p-2"
                        onChange={(e) => handleChangementChamp("quantite", e)}
                        value={
                          lignedevisSelectionne[4]
                            ? lignedevisSelectionne[4]
                            : ""
                        }
                      />
                    </div>

                    {/* CONFIG */}
                    <div>
                      <label className="block font-medium">CONFIG</label>
                      <textarea
                        placeholder="Sélectionner un code article"
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={
                          articleInfos.CONFIG
                            ? articleInfos.CONFIG
                            : lignedevisSelectionne[5]
                            ? lignedevisSelectionne[5]
                            : ""
                        }
                        onChange={(e) => handleChangementChamp("CONFIG", e)}
                      />
                    </div>
                  </div>
                </div>

                {/* Deuxième grille d’inputs */}
                <div className="overflow-x-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                    <div>
                      <label className="block font-medium">REMISE</label>
                      <input
                        type="text"
                        step="0.001"
                        placeholder="Remise"
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={
                          lignedevisSelectionne[6]
                            ? lignedevisSelectionne[6]
                            : ""
                        }
                        onChange={(e) => handleChangementChamp("DREMISE", e)}
                      />
                    </div>

                    <div>
                      <label className="block font-medium">T.V.A</label>
                      <input
                        type="text"
                        placeholder="tauxtva"
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={
                          articleInfos.tauxtva
                            ? articleInfos.tauxtva
                            : lignedevisSelectionne[7]
                            ? lignedevisSelectionne[7]
                            : ""
                        }
                        onChange={(e) => handleChangementChamp("tauxtva", e)}
                      />
                    </div>

                    <div>
                      <label className="block font-medium">P.U.T.T.C</label>
                      <input
                        type="text"
                        step="0.001"
                        placeholder="puttc"
                        value={
                          puttc
                            ? puttc
                            : lignedevisSelectionne[8]
                            ? lignedevisSelectionne[8]
                            : ""
                        }
                        readOnly
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>

                    <div>
                      <label className="block font-medium">MT NET H.T</label>
                      <input
                        type="text"
                        placeholder="netHt"
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={
                          netHt
                            ? netHt
                            : lignedevisSelectionne[9]
                            ? lignedevisSelectionne[9]
                            : ""
                        }
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block font-medium">Nbr/Uté</label>
                      <input
                        type="text"
                        placeholder="nbrunite"
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={
                          articleInfos.nbrunite
                            ? articleInfos.nbrunite
                            : lignedevisSelectionne[10]
                            ? lignedevisSelectionne[10]
                            : ""
                        }
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block font-medium">P.U.H.T</label>
                      <input
                        type="text"
                        step="0.001"
                        placeholder="prix1"
                        value={
                          articleInfos.prix1
                            ? articleInfos.prix1
                            : lignedevisSelectionne[11]
                            ? lignedevisSelectionne[11]
                            : ""
                        }
                        readOnly
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
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
        </div>
      </div>
    </div>
  );
}

export default ArticlesDevis;
