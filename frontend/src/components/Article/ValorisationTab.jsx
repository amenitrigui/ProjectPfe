import React from "react";
import { useSelector } from "react-redux";

function ValorisationTab() {
  const listePrixVente = useSelector(
    (state) => state.valorisation_Slice.listePrixVente
  );
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Prix Ht</th>
              <th>Prix TTC</th>
              <th>Rem.Max</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>Prix 1</th>
              <td>
                <input
                  type="text"
                  placeholder="Extra Small"
                  className="input input-xs"
                  value={
                    listePrixVente.length > 0 ? listePrixVente[0].prix1 : ""
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Extra Small"
                  className="input input-xs"
                  value={
                    listePrixVente.length > 0 ? listePrixVente[0].prix1ttc : ""
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Extra Small"
                  className="input input-xs"
                  value={
                    listePrixVente.length > 0 ? listePrixVente[0].remmax : ""
                  }
                />
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>prix2</th>
              <td>
                <input
                  type="text"
                  placeholder="Extra Small"
                  className="input input-xs"
                  value={
                    listePrixVente.length > 0 ? listePrixVente[0].prix2 : ""
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Extra Small"
                  className="input input-xs"
                  value={
                    listePrixVente.length > 0 ? listePrixVente[0].prix2ttc : ""
                  }
                />
              </td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>prix 3</th>
              <td>
                <input
                  type="text"
                  placeholder="Extra Small"
                  className="input input-xs"
                  value={
                    listePrixVente.length > 0 ? listePrixVente[0].prix3 : ""
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Extra Small"
                  className="input input-xs"
                  value={
                    listePrixVente.length > 0 ? listePrixVente[0].prix3ttc : ""
                  }
                />
              </td>
            </tr>
            {/* row 4 */}
            <tr>
              <th>prix 4</th>
              <td>
                <input
                  type="text"
                  placeholder="Extra Small"
                  className="input input-xs"
                  value={
                    listePrixVente.length > 0 ? listePrixVente[0].prix4 : ""
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Extra Small"
                  className="input input-xs"
                  value={
                    listePrixVente.length > 0 ? listePrixVente[0].prix4ttc : ""
                  }
                />
              </td>
            </tr>
            {/* row 5 */}
            <tr>
              <th>prix 1 publique</th>
              <td>
                <input
                  type="text"
                  placeholder="Extra Small"
                  className="input input-xs"
                  value={
                    listePrixVente.length > 0 ? listePrixVente[0].prixpub : ""
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ValorisationTab;
