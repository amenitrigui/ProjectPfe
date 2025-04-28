import { CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  getArticleFamiles,
  getArticleParCode,
  getListeCodesArticles,
  setArticleInfos,
  setLigneDevisInfos,
  setLigneDevisInfosEntiere,
  viderChampsArticleInfo,
} from "../../app/article_slices/articleSlice";
import {
  setDevisArticles,
  setDevisInfo,
} from "../../app/devis_slices/devisSlice";
import {
  setAfficherRecherchePopup,
  setLignedevisSelectionne,
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
  const ligneDevisInfos = useSelector(
    (state) => state.articleSlice.ligneDevisInfos
  );
  const devisInfo = useSelector((state) => state.devisSlice.devisInfo);
  const lignedevisSelectionne = useSelector(
    (state) => state.interfaceSlice.lignedevisSelectionne
  );
  //?==================================================================================================================
  //?=================================================appels useEffect=================================================
  //?==================================================================================================================
  useEffect(() => {
    dispatch(getArticleFamiles());
  }, []);
  useEffect(() => {
    setNetHt(
      (
        ligneDevisInfos.QteART *
        ligneDevisInfos.PUART *
        (1 - ligneDevisInfos.Remise / 100)
      ).toFixed(3) || 0
    );
  }, [ligneDevisInfos.QteART, ligneDevisInfos.PUART, ligneDevisInfos.Remise]);

  useEffect(() => {
    setPuttc(
      (ligneDevisInfos.PUART * (1 + ligneDevisInfos.TauxTVA / 100)).toFixed(3) || 0
    );
  }, [ligneDevisInfos.PUART, ligneDevisInfos.TauxTva]);
  //?==================================================================================================================
  //?=====================================================fonctions====================================================
  //?==================================================================================================================
  const handlecodeFamilleChange = (codeFamille) => {
    dispatch(setLigneDevisInfos({ colonne: "famille", valeur: codeFamille}))
    dispatch(getListeCodesArticles(codeFamille));
  };
  const handleCodeArticleChange = (codeArticle) => {
    dispatch(setLigneDevisInfos({ colonne: "Code", valeur: codeArticle }));
    dispatch(getArticleParCode(codeArticle));
  };
  const handleChangementChamp = (colonne, e) => {
    dispatch(setLigneDevisInfos({ colonne: colonne, valeur: e.target.value }));
  };
  const handleValiderLDFPBtnClick = () => {
    if (!ligneDevisInfos.QteART) {
      alert("la quantité est necessaire");
      return false;
    }
    // console.log(devisInfo.MREMISE);
    // console.log(articleInfos.DREMISE);
    // console.log(parseInt(devisInfo.MHT) + parseInt(netHt));
    dispatch(setDevisArticles(ligneDevisInfos));
    dispatch(
      setDevisInfo({
        collone: "MHT",
        valeur: parseInt(devisInfo.MHT) + parseInt(netHt),
      })
    );
    dispatch(setDevisInfo({ collone: "MREMISE" }));
    dispatch(viderChampsArticleInfo());
    dispatch(setLigneDevisInfosEntiere({}))
    dispatch(setLignedevisSelectionne([]));
  };

  const afficherRecherchePopup = (nomTable) => {
    dispatch(setToolbarTable(nomTable));
    dispatch(setAfficherRecherchePopup(true));
  };

  const getPrixArticle = () => {
    if (ligneDevisInfos.PUART) {
      return ligneDevisInfos.PUART;
    }
    if (lignedevisSelectionne[11]) {
      return lignedevisSelectionne[11];
    }
    
    return "";
  };

  const getValeurChampFamille = () => {
    if(ligneDevisInfos?.famille) {
      return ligneDevisInfos.famille;
    }
    if(lignedevisSelectionne && lignedevisSelectionne[0]) {
      return lignedevisSelectionne[0];
    };

    return "";
  }

  const getValeurChampRemise = () => {
    if(articleInfos.DREMISE) {
      return articleInfos.DREMISE;
    }
    if(ligneDevisInfos.Remise) {
      return ligneDevisInfos.Remise;
    }
    if(lignedevisSelectionne && lignedevisSelectionne[6]){
      return lignedevisSelectionne[6]
    }

    return "";
  }

  const handleRemiseChange = (valeur) => {
    dispatch(setArticleInfos({colonne: "DREMISE", valeur}))
    dispatch(setLigneDevisInfos({colonne: "Remise", valeur}))
    dispatch(setLignedevisSelectionne([]))
  }
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
                {/* Première grille d'inputs */}
                <div className="overflow-x-auto">
                  <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                    {/* FAMILLE */}
                    <div className="min-w-[150px]">
                      <label className="block font-medium text-sm mb-1">
                        FAMILLE
                      </label>
                      <input
                        type="text"
                        className="w-full input input-bordered input-sm"
                        value={getValeurChampFamille()}
                        placeholder="Sélectionner ou taper une famille"
                        onChange={(e) =>
                          handlecodeFamilleChange(e.target.value)
                        }
                        onClick={() => afficherRecherchePopup("famille")}
                      />
                    </div>

                    {/* CODE ARTICLE */}
                    <div className="min-w-[150px]">
                      <label className="block font-medium text-sm mb-1">
                        CODE ARTICLE
                      </label>
                      <input
                        type="text"
                        className="w-full input input-bordered input-sm"
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
                    <div className="min-w-[150px]">
                      <label className="block font-medium text-sm mb-1">
                        LIBELLE
                      </label>
                      <input
                        type="text"
                        placeholder="Sélectionner un code article"
                        className="w-full input input-bordered input-sm"
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
                    <div className="min-w-[120px]">
                      <label className="block font-medium text-sm mb-1">
                        UNITE
                      </label>
                      <input
                        type="text"
                        placeholder="Sélectionner un code article"
                        className="w-full input input-bordered input-sm"
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
                    <div className="min-w-[100px]">
                      <label className="block font-medium text-sm mb-1">
                        QUANTITE
                      </label>
                      <input
                        type="text"
                        placeholder="Sélectionner un code article"
                        className="w-full input input-bordered input-sm"
                        onChange={(e) => handleChangementChamp("quantite", e)}
                        value={articleInfos.quantite}
                      />
                    </div>

                    {/* CONFIG */}
                    <div className="min-w-[150px] xs:col-span-2 md:col-span-1">
                      <label className="block font-medium text-sm mb-1">
                        CONFIG
                      </label>
                      <textarea
                        placeholder="Sélectionner un code article"
                        className="w-full textarea textarea-bordered textarea-sm"
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

                {/* Deuxième grille d'inputs */}
                <div className="overflow-x-auto">
                  <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                    {/* REMISE */}
                    <div className="min-w-[120px]">
                      <label className="block font-medium text-sm mb-1">
                        REMISE
                      </label>
                      <input
                        type="text"
                        step="0.001"
                        placeholder="Remise"
                        className="w-full input input-bordered input-sm"
                        value={getValeurChampRemise()}
                        onChange={(e) => handleRemiseChange(e.target.value)}
                      />
                    </div>

                    {/* T.V.A */}
                    <div className="min-w-[100px]">
                      <label className="block font-medium text-sm mb-1">
                        T.V.A
                      </label>
                      <input
                        type="text"
                        placeholder="tauxtva"
                        className="w-full input input-bordered input-sm"
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

                    {/* P.U.T.T.C */}
                    <div className="min-w-[120px]">
                      <label className="block font-medium text-sm mb-1">
                        P.U.T.T.C
                      </label>
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
                        className="w-full input input-bordered input-sm"
                      />
                    </div>

                    {/* MT NET H.T */}
                    <div className="min-w-[120px]">
                      <label className="block font-medium text-sm mb-1">
                        MT NET H.T
                      </label>
                      <input
                        type="text"
                        placeholder="netHt"
                        className="w-full input input-bordered input-sm"
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

                    {/* Nbr/Uté */}
                    <div className="min-w-[100px]">
                      <label className="block font-medium text-sm mb-1">
                        Nbr/Uté
                      </label>
                      <input
                        type="text"
                        placeholder="nbrunite"
                        className="w-full input input-bordered input-sm"
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

                    {/* P.U.H.T */}
                    <div className="min-w-[120px]">
                      <label className="block font-medium text-sm mb-1">
                        P.U.H.T
                      </label>
                      <input
                        type="text"
                        step="0.001"
                        placeholder="prix1"
                        value={getPrixArticle()}
                        // onChange={(e) => {handleChangementChampPrix(e.target.value)}}
                        className="w-full input input-bordered input-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex flex-wrap gap-2 justify-end mt-4">
                  <button
                    className="btn btn-sm btn-ghost text-green-500"
                    title="Valider"
                    onClick={handleValiderLDFPBtnClick}
                  >
                    <CheckIcon className="h-5 w-5" />
                    <span className="sr-only">Valider</span>
                  </button>

                  <button
                    className="btn btn-sm btn-ghost text-blue-500"
                    title="Modifier"
                  >
                    <PencilIcon className="h-5 w-5" />
                    <span className="sr-only">Modifier</span>
                  </button>

                  <button
                    className="btn btn-sm btn-ghost text-red-500"
                    title="Supprimer"
                  >
                    <TrashIcon className="h-5 w-5" />
                    <span className="sr-only">Supprimer</span>
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
