import React from "react";
import StockTab from "./StockTab";
import ValorisationTab from "./ValorisationTab";
import UtilitaireTab from "./UtilitaireTab";
function Tab() {
    
  return (
    <>
      <div className="test ]">
        <div className="w-50 min-h-screen p-1">
          {/* Conteneur principal des onglets - Taille augmentée */}
          <div
            role="tablist"
              className="tabs tabs-lifted tabs-lg w-full flex-wrap [&>.tab]:flex-1 [&>.tab]:px-4 [&>.tab]:py-4 [&>.tab]:text-base sm:[&>.tab]:text-lg"
          >
            {/* Onglet Stock */}
            <input
              type="radio"
              name="my_tabs_6"
              className="tab"
              aria-label="Stock"
            />
            <StockTab />

            {/* Onglet Valorisation (par défaut) */}
            <input
              type="radio"
              name="my_tabs_6"
              className="tab"
              aria-label="Valorisation"
              defaultChecked
            />
            <div className="tab-content  border-base-300 rounded-lg p-6 w-full min-h-[100px] space-y-6">
              <div className="w-full h-full">
                {/* Contenu Valorisation */}
                <ValorisationTab />
              </div>
            </div>

            {/* Onglet Utilitaire - Version améliorée */}
            {/* Onglet Utilitaire - Version alignée sur une ligne */}
            <input
              type="radio"
              name="my_tabs_6"
              className="tab"
              aria-label="Utilitaire"
            />
            <div className="tab-content bg-base-100 border border-gray-200 rounded-lg p-6 w-full min-h-[400px]">
              <UtilitaireTab />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tab;
