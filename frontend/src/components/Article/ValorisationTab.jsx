import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setArticleInfos } from "../../app/article_slices/articleSlice";

function ValorisationTab() {
  const listePrixVente = useSelector(
    (state) => state.valorisation_Slice.listePrixVente
  );
  const dispatch = useDispatch();
  const handleChange = (colonne, valeur) => {
    dispatch(setArticleInfos({colonne, valeur}));
  }

  const handleChangePrixUnitaireArticle = (colonne, valeur) => {
    if(colonne === "prix1") {
      dispatch(setArticleInfos({colonne: "prix1", valeur}));
      dispatch(setArticleInfos({colonne: "prix2", valeur: 0}))
      dispatch(setArticleInfos({colonne: "prix3", valeur: 0}))
      dispatch(setArticleInfos({colonne: "prix4", valeur: 0}))
    }

    if(colonne === "prix2") {
      dispatch(setArticleInfos({colonne: "prix2", valeur}));
      dispatch(setArticleInfos({colonne: "prix1", valeur: 0}))
      dispatch(setArticleInfos({colonne: "prix3", valeur: 0}))
      dispatch(setArticleInfos({colonne: "prix4", valeur: 0}))
    }

    if(colonne === "prix3") {
      dispatch(setArticleInfos({colonne: "prix3", valeur}));
      dispatch(setArticleInfos({colonne: "prix1", valeur: 0}))
      dispatch(setArticleInfos({colonne: "prix2", valeur: 0}))
      dispatch(setArticleInfos({colonne: "prix4", valeur: 0}))
    }

    if(colonne === "prix4") {
      dispatch(setArticleInfos({colonne: "prix4", valeur}));
      dispatch(setArticleInfos({colonne: "prix1", valeur: 0}))
      dispatch(setArticleInfos({colonne: "prix2", valeur: 0}))
      dispatch(setArticleInfos({colonne: "prix3", valeur: 0}))
    }
  }

  const handleChangePrixUnitaireTTCArticle = (colonne, valeur) => {
    if(colonne === "prix1ttc") {
      dispatch(setArticleInfos({colonne: "prix1ttc", valeur}));
      dispatch(setArticleInfos({colonne: "prix2ttc", valeur: 0}))
      dispatch(setArticleInfos({colonne: "prix3ttc", valeur: 0}))
      dispatch(setArticleInfos({colonne: "prix4ttc", valeur: 0}))
    }

    if(colonne === "prix2ttc") {
      dispatch(setArticleInfos({colonne: "prix2ttc", valeur}));
      dispatch(setArticleInfos({colonne: "prix1ttc", valeur: 0}))
      dispatch(setArticleInfos({colonne: "prix3ttc", valeur: 0}))
      dispatch(setArticleInfos({colonne: "prix4ttc", valeur: 0}))
    }

    if(colonne === "prix3ttc") {
      dispatch(setArticleInfos({colonne: "prix3ttc", valeur}));
      dispatch(setArticleInfos({colonne: "prix1ttc", valeur: 0}))
      dispatch(setArticleInfos({colonne: "prix2ttc", valeur: 0}))
      dispatch(setArticleInfos({colonne: "prix4ttc", valeur: 0}))
    }

    if(colonne === "prix4ttc") {
      dispatch(setArticleInfos({colonne: "prix4ttc", valeur}));
      dispatch(setArticleInfos({colonne: "prix1ttc", valeur: 0}))
      dispatch(setArticleInfos({colonne: "prix2ttc", valeur: 0}))
      dispatch(setArticleInfos({colonne: "prix3ttc", valeur: 0}))
    }
  }
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
                  onChange={(e) => {handleChangePrixUnitaireArticle("prix1",e.target.value)}}
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
                  onChange={(e) => {handleChangePrixUnitaireTTCArticle("prix1ttc",e.target.value)}}
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
                  onChange={(e) => {handleChange("remmax",e.target.value)}}
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
                  onChange={(e) => {handleChangePrixUnitaireArticle("prix2",e.target.value)}}

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
                  onChange={(e) => {handleChangePrixUnitaireTTCArticle("prix2ttc",e.target.value)}}

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
                  onChange={(e) => {handleChangePrixUnitaireArticle("prix3",e.target.value)}}

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
                  onChange={(e) => {handleChangePrixUnitaireTTCArticle("prix3ttc",e.target.value)}}

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
                  onChange={(e) => {handleChangePrixUnitaireArticle("prix4",e.target.value)}}
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
                  onChange={(e) => {handleChangePrixUnitaireTTCArticle("prix4ttc",e.target.value)}}
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
                  onChange={(e) => {handleChange("prixpub",e.target.value)}}
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
