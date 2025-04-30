import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLignedevisSelectionne } from "../../app/interface_slices/interfaceSlice";

function LignesDevis() {
  //?==================================================================================================================
  //?=====================================================Variables====================================================
  //?==================================================================================================================
  const devisInfo = useSelector((state) => state.devisSlice.devisInfo);
  const toolbarMode = useSelector((state) => state.interfaceSlice.toolbarMode);
const dispatch = useDispatch()
  //?==================================================================================================================
  //?===================================================appels UseEffect===============================================
  //?==================================================================================================================

  //?==================================================================================================================
  //?=====================================================fonctions====================================================
  //?==================================================================================================================
  const handleClick = (e) => {
    if(toolbarMode === "ajout") {
      const tr = e.currentTarget;
      const tds = tr.querySelectorAll('td');
      const values = [];
      tds.forEach(td => {
        values.push(td.textContent.trim());
      });
    
      console.log(values);
      dispatch(setLignedevisSelectionne(values))
    }
  };
  
  return (
    <>
      <table className="min-w-[600px] sm:min-w-full table-auto border-collapse border bg-gray-100 p-3">
        <thead className="bg-gray-100 p-3">
          {/* Ajout du fond gris pour l'en-tête */}
          <tr>
            <th className="p-3 text-left text-sm font-medium text-gray-600 border">
              Famille
            </th>
            <th className="p-3 text-left text-sm font-medium text-gray-600 border">
              Code Article
            </th>
            <th className="p-3 text-left text-sm font-medium text-gray-600 border">
              Unité
            </th>
            <th className="p-3 text-left text-sm font-medium text-gray-600 border">
              Quantite
            </th>
            <th className="p-3 text-left text-sm font-medium text-gray-600 border">
              Remise
            </th>
            <th className="p-3 text-left text-sm font-medium text-gray-600 border">
              Libelle
            </th>
            <th className="p-3 text-left text-sm font-medium text-gray-600 border">
              TVA
            </th>
            <th className="p-3 text-left text-sm font-medium text-gray-600 border">
              PUHT
            </th>
            <th className="p-3 text-left text-sm font-medium text-gray-600 border">
              PUTTC
            </th>
            <th className="p-3 text-left text-sm font-medium text-gray-600 border">
              NET HT
            </th>
          </tr>
        </thead>
        <tbody>
          {(devisInfo.articles && (devisInfo.articles).length) > 0 ? (
            devisInfo.articles.map((article) => (
              <tr
                key={`${article.famille}-${article.CodeART}`}
                className="transition-all duration-150 ease-in-out hover:bg-[#2A2185] "  onDoubleClick={(e) => handleClick(e)}
              >
                <td className="p-3 border border-gray-300" id="codefamille">
                  {article.famille}
                </td>
                <td className="p-3 border border-gray-300" id="codeart">
                  {/* {toolbarMode === "consultation" ? article.CodeART : article.code} */}
                  { article.CodeART}
                </td>
                <td className="p-3 border border-gray-300">
                  {/* {toolbarMode === "consultation" ? article.Unite : article.unite} */}
                  {article.Unite}
                  </td>
                <td className="p-3 border border-gray-300">
                  {/* {toolbarMode === "consultation" ? (article.QteART).toFixed(3) : article.quantite} */}
                  {article.QteART}
                </td>
                <td className="p-3 border border-gray-300">
                  {/* {toolbarMode === "consultation" ? article.Remise : article.DREMISE}% */}
                  {article.Remise}
                </td>
                <td className="p-3 border border-gray-300">
                  {/* {toolbarMode === "consultation" ? article.DesART : article.libelle} */}
                  {article.DesART}
                </td>
                <td className="p-3 border border-gray-300">
                  {/* {toolbarMode === "consultation" ? article.TauxTVA : article.tauxtva}% */}
                  {article.TauxTVA}%
                </td>
                <td className="p-3 border border-gray-300">
                  {/* {toolbarMode === "consultation" ? article.PUART : article.PUHTV} */}
                  {article.PUART}
                  </td>
                <td className="p-3 border border-gray-300">
                  {/* {toolbarMode === "consultation" ? (article.PUART * (1 + article.TauxTVA / 100)).toFixed(3) : article.prixbrut} */}
                  {(article.PUART * (1 + article.TauxTVA / 100)).toFixed(3)}
                </td>
                <td className="p-3 border border-gray-300">
                  {/* {toolbarMode === "consultation" ? (article.QteART * article.PUART * (1 - article.Remise / 100)).toFixed(3) : article.prixnet} */}
                  {(article.QteART * article.PUART * (1-article.Remise / 100)).toFixed(3)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center">
                Aucun article.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default LignesDevis;
