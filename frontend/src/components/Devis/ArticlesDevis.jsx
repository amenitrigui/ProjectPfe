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
  getCodeArticle,
  getTousArticleparcode,
} from "../../app/article_slices/articleSlice";
import { useState } from "react";

function ArticlesDevis() {
  const dispatch = useDispatch();
  const [Quantite,setQauntite]=useState("")
  const [remise,setRemise]=useState("")
  const ListeArticle = useSelector((state) => state.ArticlesDevis.ListeArticle);
  const ListeCodeArticle = useSelector((state) => state.ArticlesDevis.ListeCodeArticles);
  const codeTousArticleParCode = useSelector((state) => state.ArticlesDevis.ListeCodeArticlesparLib);
  console.log(codeTousArticleParCode);
  const handlecodeFamilleChange = (codeFamille) => {
    dispatch(getCodeArticle(codeFamille));
  };
  const handleSubmiparcode = (CodeArticle) => {
    dispatch(getTousArticleparcode(CodeArticle));
  };
  const hadlesubmitquantiteparcode = () => {};
  useEffect(() => {
    dispatch(getArticleFamiles());
  }, []);

  console.log(Quantite)
  console.log(remise)



  return (
    <div className="space-y-4 p-4 border rounded-md mt-4">
      <div className="space-y-4 p-4 border rounded-md mt-4">
        <h3 className="text-lg font-bold">Articles</h3>

        <div className="grid grid-cols-6 gap-4 items-center">
          <div>
            <label className="block font-medium">FAMILLE</label>
            <select
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Sélectionner ou taper une famille"
              onChange={(e) => {
                handlecodeFamilleChange(e.target.value);
              }}
            >
              {ListeArticle.map((famille) => (
                <option key={famille}>{famille}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium">CODE ARTICLE</label>
            <select
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Sélectionner ou taper une famille"
              onChange={(e) => {
                handleSubmiparcode(e.target.value);
              }}
            >
              {ListeCodeArticle.map((article) => (
                <option key={article.code}>{article.code}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium">LIBELLE</label>
            <input
              type="text"
              placeholder="Sélectionner un code article"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue={codeTousArticleParCode.libelle}
            />
          </div>

          <div>
            <label className="block font-medium">UNITE</label>
            <input
              type="text"
              placeholder="Sélectionner un code article"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue={codeTousArticleParCode.unite}
            />
          </div>

          <div>
            <label className="block font-medium">QUANTITE</label>
            <input
              type="text"
              placeholder="Sélectionner un code article"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onKeyUp={(e)=>setQauntite(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium">CONFIG</label>
            <textarea
              placeholder="Sélectionner un code article"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue={codeTousArticleParCode.CONFIG}
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
            onKeyUp={(e)=>setRemise(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">T.V.A</label>
          <input
            type="text"
            placeholder="tauxtva"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            defaultValue={codeTousArticleParCode.tauxtva}
          />
        </div>

        <div>
          <label className="block font-medium">P.U.T.T.C</label>
          <input
            type="text"
            step="0.001"
            placeholder="puttc"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block font-medium">MT NET H.T</label>
          <input
            type="text"
            placeholder="netHt"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex-1">
          <label className="block font-medium">Nbr/Uté </label>

          <input
            type="text"
            placeholder="nbrunite"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            defaultValue={codeTousArticleParCode.nbrunite}
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block font-medium">P.U.H.T</label>
            <input
              type="text"
              step="0.001"
              placeholder="prix1"
              defaultValue={codeTousArticleParCode.prix1}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex space-x-2 justify-end">
          <button
            className="text-green-500 p-2 border rounded-lg hover:bg-green-100"
            title="Valider"
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
