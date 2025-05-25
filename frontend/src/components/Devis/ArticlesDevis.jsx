import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  ArrowPathIcon,
} from "@heroicons/react/20/solid";
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
  viderChampsLigneDevisInfos,
} from "../../app/article_slices/articleSlice";
import {
  getLignesDevis,
  setDevisArticles,
  setDevisInfo,
  setDevisInfoArticleParIndice,
  setDevisInfoEntiere,
} from "../../app/devis_slices/devisSlice";
import {
  setAfficherConfigPopup,
  setAfficherRecherchePopup,
  setLignedevisSelectionne,
  setToolbarTable,
} from "../../app/interface_slices/interfaceSlice";
import ConfigPopUp from "./ConfigPopUp";

function ArticlesDevis() {
  //?==================================================================================================================
  //?====================================================Variables=====================================================
  //?==================================================================================================================
  const dispatch = useDispatch();
  const [netHt, setNetHt] = useState(0);
  const [puttc, setPuttc] = useState(0);
  const [ligneDevisExiste, setLigneDevisExiste] = useState(false);
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
    if (
      ligneDevisInfos.QteART &&
      ligneDevisInfos.PUART &&
      ligneDevisInfos.Remise &&
      parseInt(ligneDevisInfos.QteART) > 0 &&
      parseFloat(ligneDevisInfos.PUART) > 0 &&
      parseFloat(ligneDevisInfos.Remise) >= 0
    ) {
      setNetHt(
        (
          ligneDevisInfos.QteART *
          ligneDevisInfos.PUART *
          (1 - ligneDevisInfos.Remise / 100)
        ).toFixed(3)
      );
    } else {
      setNetHt(0);
    }
  }, [ligneDevisInfos.QteART, ligneDevisInfos.PUART, ligneDevisInfos.Remise]);

  useEffect(() => {
    if (
      ligneDevisInfos.PUART &&
      ligneDevisInfos.TauxTVA &&
      parseFloat(ligneDevisInfos.PUART) > 0 &&
      parseFloat(ligneDevisInfos.TauxTVA) >= 0
    ) {
      setPuttc(
        (ligneDevisInfos.PUART * (1 + ligneDevisInfos.TauxTVA / 100)).toFixed(3)
      );
    } else {
      setPuttc(0);
    }
  }, [ligneDevisInfos.PUART, ligneDevisInfos.TauxTVA]);

  // * useEffect pour activer/désactiver les boutons de mise à jour et suppression
  // * pour les lignes de devis
  useEffect(() => {
    let existe = false;
    if (devisInfo.articles && devisInfo.articles.length > 0) {
      if (ligneDevisInfos && Object.values(ligneDevisInfos).length > 0) {
        devisInfo.articles.map((article, indice) => {
          if (article.CodeART === ligneDevisInfos.CodeART) {
            existe = true;
          }
        });
      }

      setLigneDevisExiste(existe);
    }
  }, [devisInfo.articles, ligneDevisInfos.CodeART]);
  //?==================================================================================================================
  //?=====================================================fonctions====================================================
  //?==================================================================================================================
  const handlecodeFamilleChange = (codeFamille) => {
    dispatch(setLigneDevisInfos({ colonne: "famille", valeur: codeFamille }));
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
    if(ligneDevisInfos.CodeART == "") {
      alert("un article doit etre selectionné");
      return false;
    }
    if (!ligneDevisInfos.QteART) {
      alert("la quantité est necessaire");
      return false;
    }
    dispatch(setAfficherConfigPopup(true));
  };

  const afficherRecherchePopup = (nomTable) => {
    dispatch(setToolbarTable(nomTable));
    dispatch(setAfficherRecherchePopup(true));
  };

  const getPrixArticle = () => {
    if (ligneDevisInfos.PUART) {
      return ligneDevisInfos.PUART;
    }
    return "";
  };

  const getValeurChampFamille = () => {
    if (ligneDevisInfos?.famille) {
      return ligneDevisInfos.famille;
    }
    return "";
  };

  const getValeurChampRemise = () => {
    if (ligneDevisInfos.Remise) {
      return ligneDevisInfos.Remise;
    }
    return "";
  };

  const handleRemiseChange = (valeur) => {
    dispatch(setLigneDevisInfos({ colonne: "Remise", valeur }));
    dispatch(setLignedevisSelectionne([]));
  };

  const getValeurChampCodeArticle = () => {
    if (ligneDevisInfos.CodeART) {
      return ligneDevisInfos.CodeART;
    }
    return "";
  };

  const getValeurChampLibelle = () => {
    if (ligneDevisInfos.DesART) {
      return ligneDevisInfos.DesART;
    }
    return "";
  };

  const getValeurChampUnite = () => {
    if (ligneDevisInfos.Unite) {
      return ligneDevisInfos.Unite;
    }
    return "";
  };

  const getValeurChampQuantite = () => {
    if (ligneDevisInfos.QteART) {
      return ligneDevisInfos.QteART;
    }
    return "";
  };

  const getValeurChampConfig = () => {
    if (ligneDevisInfos.Conf) {
      return ligneDevisInfos.Conf;
    }

    return "";
  };

  const getValeurChampPuttc = () => {
    if (puttc) {
      return puttc;
    }

    return "";
  };

  const getValeurChampTVA = () => {
    if (ligneDevisInfos.TauxTVA) {
      return ligneDevisInfos.TauxTVA;
    }

    return "";
  };

  const getValeurChampNetHt = () => {
    if (netHt) {
      return netHt;
    }

    return "";
  };

  const getValeurChampNbrUnite = () => {
    if (ligneDevisInfos.nbun) {
      return ligneDevisInfos.nbun;
    }

    return "";
  };

  const handleSupprimerLDFPBtnClick = () => {
    const devisInfosFiltres = devisInfo.articles.filter((article) => {
      return !(
        article.CodeART == ligneDevisInfos.CodeART &&
        article.DesART == ligneDevisInfos.DesART
      );
    });
    dispatch(setDevisInfo({ collone: "articles", valeur: devisInfosFiltres }));
    dispatch(viderChampsLigneDevisInfos());
  };

  const handleModifierLDFPBtnClick = () => {
    // * pour modifier l'article à l'indice correcte
    devisInfo.articles.map((article, indice) => {
      if (article.CodeART == ligneDevisInfos.CodeART) {
        dispatch(
          setDevisInfoArticleParIndice({
            indice: indice,
            ligneDevis: ligneDevisInfos,
          })
        );
      }
    });
    dispatch(viderChampsLigneDevisInfos());
  };
  const afficherConfigPopup = useSelector(
    (state) => state.interfaceSlice.afficherConfigPopup
  );
  return (
    <div className="details">
      {afficherConfigPopup && <ConfigPopUp netHt={netHt} puttc={puttc} />}
      <div className="banquedetails bg-base-100">
        <div className="collapse bg-base-100 border-base-300 border">
          <input type="checkbox" />
          <div
            className="collapse-title font-semibold mb-1"
            style={{ color: "rgb(48, 60, 123)" }}
          >
            Lignes devis
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
                        value={getValeurChampCodeArticle()}
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
                        value={getValeurChampLibelle()}
                        onChange={(e) => handleChangementChamp("DesART", e)}
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
                        value={getValeurChampUnite()}
                        readOnly
                        onChange={(e) => handleChangementChamp("Unite", e)}
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
                        onChange={(e) => handleChangementChamp("QteART", e)}
                        value={getValeurChampQuantite()}
                      />
                    </div>

                    {/* CONFIG */}
                    {/* <div className="min-w-[150px] xs:col-span-2 md:col-span-1">
                      <label className="block font-medium text-sm mb-1">
                        CONFIG
                      </label>
                      <textarea
                        placeholder="Sélectionner un code article"
                        className="w-full textarea textarea-bordered textarea-sm"
                        value={getValeurChampConfig()}
                        onChange={(e) => handleChangementChamp("Conf", e)}
                      />
                    </div> */}
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
                        className="w-full input input-bordered input-sm"
                        placeholder="TVA"
                        readOnly
                        value={getValeurChampTVA()}
                        onChange={(e) => handleChangementChamp("TauxTVA", e)}
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
                        value={getValeurChampPuttc()}
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
                        value={getValeurChampNetHt()}
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
                        value={getValeurChampNbrUnite()}
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
                        onChange={(e) => {
                          handleChangementChamp("PUART", e);
                        }}
                        className="w-full input input-bordered input-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex flex-wrap gap-2 justify-end mt-4">
                  {!ligneDevisExiste && (
                    <button
                      className="btn btn-sm btn-ghost text-green-500"
                      title="Valider"
                      onClick={handleValiderLDFPBtnClick}
                    >
                      <CheckIcon className="h-5 w-5" />
                      <span className="sr-only">Valider</span>
                    </button>
                  )}
                  {devisInfo.articles && devisInfo.articles.length > 0 && (
                    <>
                      <button
                        className="btn btn-sm btn-ghost text-blue-500"
                        title="Modifier"
                        disabled={ligneDevisExiste === false}
                        onClick={handleModifierLDFPBtnClick}
                      >
                        <PencilIcon className="h-5 w-5" />
                        <span className="sr-only">Modifier</span>
                      </button>

                      <button
                        className="btn btn-sm btn-ghost text-red-500"
                        title="Supprimer"
                        disabled={ligneDevisExiste === false}
                        onClick={handleSupprimerLDFPBtnClick}
                      >
                        <TrashIcon className="h-5 w-5" />
                        <span className="sr-only">Supprimer</span>
                      </button>
                    </>
                  )}
                  <button
                    className="btn btn-sm btn-ghost text-black-500"
                    title="Vider Champs"
                    onClick={() => {
                      dispatch(viderChampsLigneDevisInfos());
                    }}
                  >
                    <ArrowPathIcon className="h-5 w-5" />
                    <span className="sr-only">Vider champs</span>
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
