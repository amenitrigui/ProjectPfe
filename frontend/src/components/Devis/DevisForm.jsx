import React from "react";
import {
  FaFileInvoice,
  FaUser,
  FaClipboardList,
  FaUsers,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getClientParCode,
  getToutCodesClient,
  setInsertionDepuisDevisForm,
} from "../../app/client_slices/clientSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  getDevisParNUMBL,
  getListeNumbl,
  setDevisInfo,
  setDevisInfoEntiere,
  getListePointsVente,
  getLignesDevis,
} from "../../app/devis_slices/devisSlice";
function DevisForm() {
  const dispatch = useDispatch();
  const navi = useNavigate();
  // * tableau contenant la liste des codes des devis
  const listeNUMBL = useSelector((state) => state.DevisCrud.listeNUMBL);
  // * informations d'un devis provenant des champs de cette formulaire
  const devisInfos = useSelector((state) => state.DevisCrud.devisInfo);
  const listePointsVente = useSelector(
    (state) => state.DevisCrud.listePointsVente
  );
  // * UseEffect #1 : récupérer la liste des codes de devis et liste de points de vente
  useEffect(() => {
    dispatch(getListeNumbl());
    dispatch(getListePointsVente());
  }, []);

  const clientInfos = useSelector((state) => state.ClientCrud.clientInfos);
  console.log(clientInfos);
  const listeToutCodesClients = useSelector(
    (state) => state.ClientCrud.listeToutCodesClients
  );
  console.log(listeToutCodesClients);
  const toolbarMode = useSelector((state) => state.uiStates.toolbarMode);
  useEffect(() => {
    if (toolbarMode == "ajout") dispatch(getToutCodesClient());
  }, [toolbarMode]);

  // * WIP : sélectionne un dévis de la liste des devis
  // * pour afficher ses informations dans les champs
  // * du formulaire

  const handleSelectDevis = (e) => {
    if (e.target.value != "vide") {
      console.log(devisInfos);
      dispatch(getDevisParNUMBL(e.target.value));
      dispatch(getLignesDevis(devisInfos.NUMBL));
    }
    // * vider les champs du formulaire
    else
      dispatch(
        setDevisInfoEntiere({
          NUMBL: "",
          libpv: "",
          ADRCLI: "",
          CODECLI: "",
          cp: "",
          DATEBL: "",
          MREMISE: "",
          MTTC: "",
          comm: "",
          RSREP: "",
          CODEREP: "",
          usera: "",
          RSCLI: "",
          codesecteur: "",
          MHT: "",
          articles: [],
        })
      );
  };

  const handleChange = (e, col) => {
    dispatch(
      setDevisInfo({
        collone: col,
        valeur: e.target.value,
      })
    );
    if (
      col == "CODECLI" &&
      e.target.value != "" &&
      e.target.value.length == 8 &&
      !isNaN(e.target.value)
    ) {
      dispatch(getClientParCode(e.target.value));
    }
  };
  // * boolean pour activer/désactiver champs du formulaire
  // * initialement false (champs désactivé en mode de consultation)
  const activerChampsForm = useSelector(
    (state) => state.uiStates.activerChampsForm
  );
  const insertionDepuisDevisForm = useSelector(
    (state) => state.ClientCrud.insertionDepuisDevisForm
  );
  // * méthode pour indiquer qu'on veut ajouter un nouveau client
  // * à partir de cette formulaire, ceci est nécessaire pour qu'on puisse
  // * consérver tous données de devis saisies avant l'ajout du client
  const handleAjoutClientRedirect = () => {
    dispatch(setInsertionDepuisDevisForm(true));

    navi("/ClientFormTout");
  };

  return (
    <>
      <form
        className="grid grid-cols-1 space-y-2 items-center bg-base-300"
        style={{ backgroundColor: "rgb(209, 213, 219)" }}
      >
        <div className="flex w-full">
          <div
            className="card bg-base-300 rounded-box p-6 w-1/3 space-y-2"
            style={{ backgroundColor: "rgb(209, 213, 219)" }}
          >
            {/* Conteneur pour Code Client, Type Client et CIN */}
            <fieldset className="fieldset bg-base-300 border border-base-100 p-2 rounded-box">
              <h3 className="text-lg font-bold flex items-center space-x-2">
                <FaFileInvoice className="text-blue-500" />
                <span>Identifiants Devis</span>
              </h3>
              <div className="flex flex-wrap">
                <div className="flex flex-col w-1/2">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    N° Devis :
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    list="browsers"
                    value={devisInfos.NUMBL || ""}
                    disabled={activerChampsForm}
                    onChange={(e) => handleSelectDevis(e)}
                  />
                  <datalist id="browsers">
                    {listeNUMBL.length > 0 ? (
                      listeNUMBL.map((codeDevis) => (
                        <option key={codeDevis.NUMBL} value={codeDevis.NUMBL}>
                          {codeDevis.NUMBL}
                        </option>
                      ))
                    ) : (
                      <option disabled>Aucun client trouvé</option>
                    )}
                  </datalist>
                </div>
                <div className="flex flex-col w-1/2">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Point de vente :
                  </label>
                  <select
                    className="select select-bordered w-full max-w-xs"
                    disabled={!activerChampsForm}
                  >
                    {listePointsVente.map((pointVente) => (
                      <option key={pointVente.libpv} value={pointVente.libpv}>
                        {pointVente.libpv}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </fieldset>
          </div>
          {/* <div className="divider lg:divider-horizontal" /> */}
          {/* 2eme */}
          <div className="card bg-base-300 rounded-box p-6 w-1/3 space-y-2">
            <fieldset className="fieldset bg-base-300 border border-base-100 p-2 rounded-box">
              <h3 className="text-lg font-bold flex items-center space-x-2">
                <FaUser className="text-green-500" />
                <span>Information Client</span>
                <button
                  className="btn btn-outline btn-accent"
                  onClick={() => handleAjoutClientRedirect()}
                >
                  {" "}
                  <i className="fas fa-plus-circle"></i>
                </button>
              </h3>
              <div className="w-full min-w-md">
                <div className="flex flex-nowrap">
                  <div className="flex flex-col w-1/2">
                    <label
                      className="font-bold"
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      Code Client : :
                    </label>

                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2"
                      list="client"
                      disabled={!activerChampsForm}
                      value={
                        toolbarMode == "ajout"
                          ? clientInfos.code
                          : devisInfos.CODECLI
                      } // Assurez-vous d'avoir cet état dans votre composant
                      onChange={(e) => {
                        handleChange(e,"CODECLI");
                      }}
                      // Mettez à jour l'état
                    />
                    <datalist id="client">
                      {listeToutCodesClients.length > 0 ? (
                        listeToutCodesClients.map((codeClinet) => (
                          <option key={codeClinet.code} value={codeClinet.code}>
                            {codeClinet.code}
                          </option>
                        ))
                      ) : (
                        <option disabled>Aucun client trouvé</option>
                      )}
                    </datalist>
                  </div>

                  <div className="flex flex-col w-1/2">
                    <label
                      className="font-bold"
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      Raison Sociale :.
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2"
                      disabled={!activerChampsForm}
                      value={
                        toolbarMode == "ajout"
                          ? clientInfos.rsoc
                          : devisInfos.RSCLI
                      } // Assurez-vous d'avoir cet état dans votre composant
                      onChange={(e) =>
                        setDevisInfo({
                          collone: "RSCLI",
                          valeur: e.target.value,
                        })
                      } // Mettez à jour l'état
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label
                    className="font-bold"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Adresse : :
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    disabled={!activerChampsForm}
                    value={
                      toolbarMode == "ajout"
                        ? clientInfos.adresse
                        : devisInfos.ADRCLI
                    } // Assurez-vous d'avoir cet état dans votre composant
                    onChange={(e) =>
                      setDevisInfo({
                        collone: "ADRCLI",
                        valeur: e.target.value,
                      })
                    } // Mettez à jour l'état
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="font-bold"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Code Postal :
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    disabled={!activerChampsForm}
                    value={
                      toolbarMode == "ajout" ? clientInfos.cp : devisInfos.cp
                    }
                    onChange={(e) =>
                      setDevisInfo({ collone: "cp", valeur: e.target.value })
                    } // Mettez à jour l'état
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="font-bold"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Email :
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-md p-2"
                    disabled={!activerChampsForm}
                    value={toolbarMode == "ajout" ? clientInfos.email : ""}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="font-bold"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Téléphone :
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    disabled={!activerChampsForm}
                    value={toolbarMode == "ajout" ? clientInfos.telephone : ""}
                  />
                </div>
              </div>
            </fieldset>
          </div>

          {/* <div className="divider lg:divider-horizontal" /> */}

          <div className="card bg-base-300 rounded-box p-6 w-1/3 space-y-2">
            <fieldset className="fieldset bg-base-300 border border-base-100 p-2 rounded-box">
              <h3 className="text-lg font-bold flex items-center space-x-2">
                <FaClipboardList className="text-purple-500" />
                <span>Détails Devis</span>
              </h3>

              <div className="w-full min-w-md">
                <div className="flex flex-nowrap">
                  <div className="flex flex-col w-1/2">
                    <label
                      className="font-bold"
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      Date :
                    </label>

                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-md p-2"
                      disabled={!activerChampsForm}
                      value={devisInfos.DATEBL} // Assurez-vous d'avoir cet état dans votre composant
                      onChange={(e) =>
                        setDevisInfo({
                          collone: "DATEBL",
                          valeur: e.target.value,
                        })
                      } // Mettez à jour l'état
                    />
                  </div>

                  <div className="flex flex-col w-1/2">
                    <label
                      className="font-bold"
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      Transport.
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2"
                      disabled={!activerChampsForm}
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label
                    className="font-bold"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    À l'attention de :
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    disabled={!activerChampsForm}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="font-bold"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Délai de livraison :
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    disabled={!activerChampsForm}
                  />
                </div>
              </div>
            </fieldset>
          </div>

          {/* 4eme  */}
          <div className="card bg-base-300 rounded-box p-6 w-1/3 space-y-2">
            <fieldset className="fieldset bg-base-300 border border-base-100 p-2 rounded-box">
              <h3 className="text-lg font-bold flex items-center space-x-2">
                <FaUsers className="text-red-500" />
                <span>Informations de l'Utilisateur</span>
              </h3>

              {/* Conteneur pour Code Client, Type Client et CIN */}
              <div className="flex flex-wrap">
                <div className="flex flex-col w-1/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Vendeur :
                  </label>

                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    disabled={!activerChampsForm}
                    defaultValue={devisInfos.usera} // Assurez-vous d'avoir cet état dans votre composant
                    onChange={(e) =>
                      setDevisInfo({ collone: "usera", valeur: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col w-2/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    RSREP :
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    disabled={!activerChampsForm}
                    defaultValue={devisInfos.RSREP} // Assurez-vous d'avoir cet état dans votre composant
                    onChange={(e) =>
                      setDevisInfo({ collone: "RSREP", valeur: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="flex flex-col w-1/4">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    CodeSec :
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    disabled={!activerChampsForm}
                    defaultValue={devisInfos.codesecteur} // Assurez-vous d'avoir cet état dans votre composant
                    onChange={(e) =>
                      setDevisInfo({
                        collone: "codesecteur",
                        valeur: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col w-3/4">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Désignation Secteur :
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    disabled={!activerChampsForm}
                  />
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="flex flex-col w-full">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Commentaire :
                  </label>
                  <textarea
                    rows={4}
                    cols={50}
                    className="w-full border border-gray-300 rounded-md p-2"
                    defaultValue={devisInfos.comm}
                    disabled={!activerChampsForm}
                  ></textarea>
                </div>
              </div>
              <div className="flex flex-nowrap">
                <div className="flex flex-col w-full">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Affaire :
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    disabled={!activerChampsForm}
                  />
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </form>
    </>
  );
}

export default DevisForm;
