import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function StockTab() {
  const dispatch = useDispatch();
  const listePointVente = useSelector(
    (state) => state.Stock_Slice.listePointVente
  );

  const qteTotArticle = useSelector((state) => state.Stock_Slice.qteTotArticle);
  const listedepot = useSelector((state) => state.Stock_Slice.listedepot);
  return (
    <>
      <div className="tab-content bg-base-100 border-base-300 rounded-lg p-8 w-full min-h-[400px]">
        <div className="w-full h-full flex flex-col">
          {/* Partie supérieure (Tables - 49%) */}
          <div className="flex flex-nowrap w-full h-[49%] mb-6">
            {/* Added mb-4 for space */}
            {/* Première table */}
            <div className="h-[400px] overflow-y-auto w-1/2 pl-2">
              <table className="table table-pin-rows bg-base-200 w-full">
                <thead>
                  <tr>
                    <th>N°</th>
                    <th>Point de Vente</th>
                  </tr>
                </thead>
                <tbody>
                  {listePointVente.length > 0 ? (
                    listePointVente.map((PV, indice) => (
                      <tr key={indice} onClick={() => {}}>
                        {/* N'oubliez pas la prop key */}
                        <td>{PV.Code}</td>
                        <td>{PV.Libelle}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2}>Aucune liste de point de vente</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Deuxième table */}
            <div className="h-[400px] overflow-y-auto w-1/2 pl-2">
              <table className="table table-pin-rows bg-base-200 w-full">
                <thead>
                  <tr>
                    <th>N°</th>
                    <th>Dépôt de stock</th>
                    <th>QTE ART</th>
                  </tr>
                </thead>
                <tbody>
                  {listedepot.length > 0 ? (
                    listedepot.map((depot, indice) => (
                      <tr key={indice}>
                        <td>{depot.Code}</td>
                        <td>{depot.Libelle}</td>
                        <td>{depot.SAISIQTENEG}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>Aucune liste de depot</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Partie inférieure (Stats - 49%) */}
          <div className="flex flex-nowrap w-full h-[49%] mt-9">
            {" "}
            {/* Added mt-4 for space */}
            {/* Section Siege Local */}
            <div className="w-1/2 flex flex-col justify-center items-center border border-base-300 rounded-lg p-4">
              <h1 className="text-lg font-bold mb-2">Siege Local</h1>
              <div className="grid grid-cols-2 gap-x-4 w-full">
                <div>Qte en Stock</div>
                <div className="text-right">1000</div>
              </div>
            </div>
            {/* Section Stock global */}
            <div className="w-1/2 flex flex-col justify-center items-center border border-base-300 rounded-lg p-4 ml-4">
              <h1 className="text-lg font-bold mb-2">
                Stock tous points de vente
              </h1>
              <div className="grid grid-cols-2 gap-x-4 w-full">
                <div>Qte en Stock</div>
                <div className="text-right">{qteTotArticle}</div>
                <div>Qte Reserve</div>
                <div className="text-right">{qteTotArticle}</div>
                <div>Qte Disponible</div>
                <div className="text-right">{qteTotArticle}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StockTab;
