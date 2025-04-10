import Select from "react-select";
import {
  CheckIcon,
  PencilIcon,
  PrinterIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getArticleFamiles,
  getListeCodesArticles,
  getTousArticleparcode,
  setArticleInfos,
} from "../../app/article_slices/articleSlice";
import { useState } from "react";
import { setDevisArticles } from "../../app/devis_slices/devisSlice";

function ArticlesDevis() {
  const dispatch = useDispatch();
  const [Quantite, setQauntite] = useState(0);
  const [remise, setRemise] = useState(0);
  const ListeArticle = useSelector((state) => state.ArticlesDevis.ListeArticle);
  const devisInfo = useSelector((state) => state.DevisCrud.devisInfo);
  const ListeCodeArticle = useSelector(
    (state) => state.ArticlesDevis.ListeCodeArticles
  );
  const codeTousArticleParCode = useSelector(
    (state) => state.ArticlesDevis.ListeCodeArticlesparLib
  );

  const articleInfos = useSelector((state) => state.ArticlesDevis.articleInfos)

  const handlecodeFamilleChange = (codeFamille) => {
    dispatch(setArticleInfos({ colonne: "famille", valeur: codeFamille }))
    dispatch(getListeCodesArticles(codeFamille));
  };
  const handleSubmiparcode = (codeArticle) => {
    dispatch(setArticleInfos({ colonne: "code", valeur: codeArticle }))
    dispatch(getTousArticleparcode(codeArticle));
  };
  const hadlesubmitquantiteparcode = () => { };
  useEffect(() => {
    dispatch(getArticleFamiles());
  }, []);

  const netHt =
    articleInfos.quantite * codeTousArticleParCode.prix1 * (1 - remise / 100).toFixed(3) || 0;

  const puttc =
    codeTousArticleParCode.prix1 * (1 + codeTousArticleParCode.tauxtva / 100).toFixed(3) ||
    0;

  const handleChangementChamp = (colonne, e) => {
    dispatch(setArticleInfos({ colonne: colonne, valeur: e.target.value }))
  }
  const handleValiderLDFPBtnClick = () => {
    console.log(articleInfos);
    dispatch(setDevisArticles(articleInfos))
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
              value={ListeArticle.famille}

              //  disabled={!activerChampsForm}
              list="listeCodesFamilles"
              placeholder="Sélectionner ou taper une famille"
              onChange={(e) => {
                handlecodeFamilleChange(e.target.value);
              }}
            />
            <datalist id="listeCodesFamilles">
              {ListeArticle.length > 0 ? (
                ListeArticle.map((famille, indice) => (
                  <option key={indice} value={famille.code}>
                    {famille.code}
                  </option>
                ))
              ) : (
                <option disabled>Aucun article trouvé</option>
              )}
            </datalist>
            {/* <select
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Sélectionner ou taper une famille"
              onChange={(e) => {
                handlecodeFamilleChange(e.target.value);
              }}
            >
              {ListeArticle.map((famille) => (
                <option key={famille.code}>{famille.code}</option>
              ))}
            </select> */}
          </div>

          <div>
            <label className="block font-medium">CODE ARTICLE</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2"
              value={ListeCodeArticle.code}

              //  disabled={!activerChampsForm}
              list="listecodeArticle"
              placeholder="Sélectionner ou taper un code d'article"
              onChange={(e) => {
                handleSubmiparcode(e.target.value);
              }}
            />
            <datalist id="listecodeArticle">
              {ListeCodeArticle.length > 0 ? (
                ListeCodeArticle.map((article, indice) => (
                  <option key={indice} value={article.code}>
                    {article.code}
                  </option>
                ))
              ) : (
                <option disabled>Aucun article trouvé</option>
              )}
            </datalist>

            {/* <select
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Sélectionner ou taper une famille"
              onChange={(e) => {
                handleSubmiparcode(e.target.value);
              }}
            >
              {ListeCodeArticle.map((article) => (
                <option key={article.code}>{article.code}</option>
              ))}
            </select> */}
          </div>
          <div>
            <label className="block font-medium">LIBELLE</label>
            <input
              type="text"
              placeholder="Sélectionner un code article"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={codeTousArticleParCode.libelle || ""}
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
              value={codeTousArticleParCode.unite || ""}
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
              value={codeTousArticleParCode.CONFIG}
              onChange={(e) => handleChangementChamp("CONFIG", e)}
            />
          </div>
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
            value={codeTousArticleParCode.tauxtva || ""}
            onChange={(e) => handleChangementChamp("tauxtva", e)}
          />
        </div>

        <div>
          <label className="block font-medium">P.U.T.T.C</label>
          <input
            type="text"
            step="0.001"
            placeholder="puttc"
            value={puttc.toFixed(3)}
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
            value={codeTousArticleParCode.nbrunite || ""}
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
              value={codeTousArticleParCode.prix1 || ""}
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
  );
}

export default ArticlesDevis;
