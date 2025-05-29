import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setArticleInfos } from "../../app/article_slices/articleSlice";
import { isNumerique } from "../../utils/validations";

function ValorisationTab() {
  const listePrixVente = useSelector(
    (state) => state.valorisation_Slice.listePrixVente
  );
  const articleInfos = useSelector((state) => state.articleSlice.articleInfos);
  const dispatch = useDispatch();
  const colNum = [
    "prix1",
    "prix2",
    "prix3",
    "prix4",
    "prix1TTC",
    "prix2TTC",
    "prix3TTC",
    "prix4TTC",
    "PrixPub",
    "remmax",
  ];
  const handleChange = (colonne, valeur) => {
    if (colNum.includes(colonne) && isNumerique(valeur)) {
      dispatch(setArticleInfos({ colonne, valeur }));
    }
  };

  const handleChangePrixUnitaireArticle = (colonne, valeur) => {
    if (
      colonne === "prix1" &&
      colNum.includes(colonne) &&
      isNumerique(valeur)
    ) {
      dispatch(setArticleInfos({ colonne: "prix1", valeur }));
      dispatch(setArticleInfos({ colonne: "prix2", valeur: 0 }));
      dispatch(setArticleInfos({ colonne: "prix3", valeur: 0 }));
      dispatch(setArticleInfos({ colonne: "prix4", valeur: 0 }));
    }

    if (
      colonne === "prix2" &&
      colNum.includes(colonne) &&
      isNumerique(valeur)
    ) {
      dispatch(setArticleInfos({ colonne: "prix2", valeur }));
      dispatch(setArticleInfos({ colonne: "prix1", valeur: 0 }));
      dispatch(setArticleInfos({ colonne: "prix3", valeur: 0 }));
      dispatch(setArticleInfos({ colonne: "prix4", valeur: 0 }));
    }

    if (
      colonne === "prix3" &&
      colNum.includes(colonne) &&
      isNumerique(valeur)
    ) {
      dispatch(setArticleInfos({ colonne: "prix3", valeur }));
      dispatch(setArticleInfos({ colonne: "prix1", valeur: 0 }));
      dispatch(setArticleInfos({ colonne: "prix2", valeur: 0 }));
      dispatch(setArticleInfos({ colonne: "prix4", valeur: 0 }));
    }

    if (
      colonne === "prix4" &&
      colNum.includes(colonne) &&
      isNumerique(valeur)
    ) {
      dispatch(setArticleInfos({ colonne: "prix4", valeur }));
      dispatch(setArticleInfos({ colonne: "prix1", valeur: 0 }));
      dispatch(setArticleInfos({ colonne: "prix2", valeur: 0 }));
      dispatch(setArticleInfos({ colonne: "prix3", valeur: 0 }));
    }
  };

  const handleChangePrixUnitaireTTCArticle = (colonne, valeur) => {
    if (
      colonne === "prix1TTC" &&
      colNum.includes(colonne) &&
      isNumerique(valeur)
    ) {
      dispatch(setArticleInfos({ colonne: "prix1TTC", valeur }));
      dispatch(setArticleInfos({ colonne: "prix2TTC", valeur: 0 }));
      dispatch(setArticleInfos({ colonne: "prix3TTC", valeur: 0 }));
      dispatch(setArticleInfos({ colonne: "prix4TTC", valeur: 0 }));
    }

    if (
      colonne === "prix2TTC" &&
      colNum.includes(colonne) &&
      isNumerique(valeur)
    ) {
      dispatch(setArticleInfos({ colonne: "prix2TTC", valeur }));
      dispatch(setArticleInfos({ colonne: "prix1TTC", valeur: 0 }));
      dispatch(setArticleInfos({ colonne: "prix3TTC", valeur: 0 }));
      dispatch(setArticleInfos({ colonne: "prix4TTC", valeur: 0 }));
    }

    if (
      colonne === "prix3TTC" &&
      colNum.includes(colonne) &&
      isNumerique(valeur)
    ) {
      dispatch(setArticleInfos({ colonne: "prix3TTC", valeur }));
      dispatch(setArticleInfos({ colonne: "prix1TTC", valeur: 0 }));
      dispatch(setArticleInfos({ colonne: "prix2TTC", valeur: 0 }));
      dispatch(setArticleInfos({ colonne: "prix4TTC", valeur: 0 }));
    }

    if (
      colonne === "prix4TTC" &&
      colNum.includes(colonne) &&
      isNumerique(valeur)
    ) {
      dispatch(setArticleInfos({ colonne: "prix4TTC", valeur }));
      dispatch(setArticleInfos({ colonne: "prix1TTC", valeur: 0 }));
      dispatch(setArticleInfos({ colonne: "prix2TTC", valeur: 0 }));
      dispatch(setArticleInfos({ colonne: "prix3TTC", valeur: 0 }));
    }
  };
  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="table w-full min-w-[600px]">
          {/* head */}
          <thead className="bg-base-200 text-xs sm:text-sm">
            <tr>
              <th></th>
              <th>Prix HT</th>
              <th>Prix TTC</th>
              <th>Rem.Max</th>
            </tr>
          </thead>
          <tbody className="text-xs sm:text-sm">
            {/* row 1 */}
            <tr>
              <th>Prix 1</th>
              <td>
                <input
                  type="text"
                  placeholder="HT"
                  className="input input-xs w-full"
                  value={articleInfos.prix1 || "0"}
                  onChange={(e) =>
                    handleChangePrixUnitaireArticle("prix1", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="TTC"
                  className="input input-xs w-full"
                  readOnly
                  value={articleInfos.prix1TTC || "0"}
                  onChange={(e) =>
                    handleChangePrixUnitaireTTCArticle(
                      "prix1TTC",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Remise"
                  className="input input-xs w-full"
                  value={articleInfos.remmax || "0"}
                  onChange={(e) => handleChange("remmax", e.target.value)}
                />
              </td>
            </tr>

            {/* row 2 */}
            <tr>
              <th>Prix 2</th>
              <td>
                <input
                  type="text"
                  className="input input-xs w-full"
                  value={articleInfos.prix2 || "0"}
                  onChange={(e) =>
                    handleChangePrixUnitaireArticle("prix2", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="input input-xs w-full"
                  value={articleInfos.prix2TTC || "0"}
                  readOnly
                  onChange={(e) =>
                    handleChangePrixUnitaireTTCArticle(
                      "prix2TTC",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            {/* row 3 */}
            <tr>
              <th>Prix 3</th>
              <td>
                <input
                  type="text"
                  className="input input-xs w-full"
                  value={articleInfos.prix3 || "0"}
                  onChange={(e) =>
                    handleChangePrixUnitaireArticle("prix3", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="input input-xs w-full"
                  readOnly
                  value={articleInfos.prix3TTC || "0"}
                  onChange={(e) =>
                    handleChangePrixUnitaireTTCArticle(
                      "prix3TTC",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            {/* row 4 */}
            <tr>
              <th>Prix 4</th>
              <td>
                <input
                  type="text"
                  className="input input-xs w-full"
                  value={articleInfos.prix4 || "0"}
                  onChange={(e) =>
                    handleChangePrixUnitaireArticle("prix4", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="input input-xs w-full"
                  value={articleInfos.prix4TTC || "0"}
                  readOnly
                  onChange={(e) =>
                    handleChangePrixUnitaireTTCArticle(
                      "prix4TTC",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            {/* row 5 */}
            <tr>
              <th>Prix 1 publique</th>
              <td>
                <input
                  type="text"
                  className="input input-xs w-full"
                  value={articleInfos.PrixPub || "0"}
                  onChange={(e) => handleChange("PrixPub", e.target.value)}
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
