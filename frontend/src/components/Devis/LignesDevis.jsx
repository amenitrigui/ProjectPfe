import React from "react";
import { useSelector } from "react-redux";

function LignesDevis() {
  //?==================================================================================================================
  //?=====================================================Variables====================================================
  //?==================================================================================================================
  const devisInfo = useSelector((state) => state.devisSlice.devisInfo);
  const toolbarMode = useSelector((state) => state.interfaceSlice.toolbarMode);

  //?==================================================================================================================
  //?===================================================appels UseEffect===============================================
  //?==================================================================================================================

  //?==================================================================================================================
  //?=====================================================fonctions====================================================
  //?==================================================================================================================
  return (
    <>
      <table className="min-w-[600px] sm:min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-300">
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
                className="transition-all duration-150 ease-in-out hover:bg-[#2A2185]" 
              >
                <td className="p-3 border border-gray-300">
                  {article.famille}
                </td>
                <td className="p-3 border border-gray-300">{toolbarMode === "consultation" ? article.CodeART : article.code}</td>
                <td className="p-3 border border-gray-300">{toolbarMode === "consultation" ? article.Unite : article.unite}</td>
                <td className="p-3 border border-gray-300">
                  {toolbarMode === "consultation" ? (article.QteART).toFixed(3) : article.quantite}
                </td>
                <td className="p-3 border border-gray-300">
                  {toolbarMode === "consultation" ? article.Remise : article.DREMISE}%
                </td>
                <td className="p-3 border border-gray-300">
                  {toolbarMode === "consultation" ? article.DesART : article.libelle}
                </td>
                <td className="p-3 border border-gray-300">
                  {toolbarMode === "consultation" ? article.TauxTVA : article.tauxtva}%
                </td>
                <td className="p-3 border border-gray-300">{toolbarMode === "consultation" ? article.PUART : article.PUHTV}</td>
                <td className="p-3 border border-gray-300">
                  {toolbarMode === "consultation" ? (article.PUART * (1 + article.TauxTVA / 100)).toFixed(3) : article.prixbrut}
                </td>
                <td className="p-3 border border-gray-300">
                  {toolbarMode === "consultation" ? (article.QteART * article.PUART * (1 - article.Remise / 100)).toFixed(3) : article.prixnet}
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
