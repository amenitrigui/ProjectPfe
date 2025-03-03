import ToolBar from "../../components/Common/ToolBar";
import SideBar from "../../components/Common/SideBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setActiverChampsForm,
  setToolbarTable,
} from "../../app/interface_slices/uiSlice";

import DevisForm from "../../components/Devis/DevisForm";
import ArticlesDevis from "../../components/Devis/ArticlesDevis";

function DevisFormTout() {
  // * useEffect #1 : désactiver tous les champs
  // * et indiquer qu'on va utiliser la table de devis
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setToolbarTable("devis"));
    dispatch(setActiverChampsForm(false));
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Toolbar et Sidebar */}

      <div className="drawer">
        <input type="checkbox" id="my-drawer" className="drawer-toggle" />

        <div className="drawer-content">
          {/* Contenu principal ici */}
          <div className="flex justify-end">
            <label
              htmlFor="my-drawer"
              className="btn btn-primary drawer-button m-4 w-40 flex items-center justify-center"
            >
              <img src="enter.png" alt="enter Icon" className="w-6 h-6 mr-2" />
              Entrer
            </label>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <SideBar />
        </div>
        <ToolBar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DevisForm />
      </div>

      {/* Table des articles */}
      <div className="mt-6">
        <div className="p-4 sticky bottom-0 w-full">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
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
            <tbody className="text-sm">
              <tr className="hover:bg-indigo-100 transition-all duration-150 ease-in-out">
                <td className="p-3 border border-gray-300">A001</td>
                <td className="p-3 border border-gray-300">Unité</td>
                <td className="p-3 border border-gray-300">Article Exemple</td>
                <td className="p-3 border border-gray-300">100.00</td>
                <td className="p-3 border border-gray-300">19%</td>
                <td className="p-3 border border-gray-300">10%</td>
                <td className="p-3 border border-gray-300">20%</td>
                <td className="p-3 border border-gray-300">200.00</td>
                <td className="p-3 border border-gray-300">240.00</td>
                <td className="p-3 border border-gray-300">180.00</td>
              </tr>
            </tbody>
          </table>
          <ArticlesDevis />
        </div>
      </div>
    </div>
  );
}

export default DevisFormTout;
