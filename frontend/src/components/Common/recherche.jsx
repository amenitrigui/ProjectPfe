import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getDevisParNUMBL,
  getDevisParCodeClient,
  getDevisParMontant,
  getDevisParPeriode,
  setDevisInfoEntiere,
  setDevisList,
} from "../../app/devis_slices/devisSlice";
import DataTable from "react-data-table-component";
import { FaArrowLeft } from "react-icons/fa"; // Import de l'icône
import {
  getClientParCin,
  getClientParCode,
  getClientParTypecli,
  setClientInfosEntiere,
  setListeClients,
} from "../../app/client_slices/clientSlice";
import { setAfficherRecherchePopup } from "../../app/interface_slices/uiSlice";
import {
  getArticleParCode,
  getListeArticleParCodeArticle,
  getListeArticleparFamille,
  getListeArticleparLibelle,
  getListeArticleParSousFamille,
  setArticleInfos,
  setArticleInfosEntiere,
  setListeArticle,
} from "../../app/article_slices/articleSlice";
import {
  getListeFamillesParCodeFamille,
  getListeFamillesParLibelleFamille,
  setFamilleInfosEntiere,
  setListeFamilles,
} from "../../app/famille_slices/familleSlice";
import {
  getListeSousFamillesParCodeSousFamille,
  getListeSousFamillesParLibelleSousFamille,
  setListeSousfamille,
} from "../../app/sousfamille_slices/sousfamilleSlice";
import {
  getListeUtilisateurParCode,
  getListeUtilisateurParDirecteur,
  getListeUtilisateurParNom,
  getListeUtilisateurParType,
  setUtilisateurSupInfo,
} from "../../app/Utilisateur_SuperviseurSlices/Utilisateur_SuperviseurSlices";
import { setUtilisateurInfoEntire } from "../../app/utilisateur_slices/utilisateurSlice";

const Recherche = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // * valeur de champs de recherche
  const [valeurRecherche, setValeurRecherche] = useState("");
  // * critère de filtre (par client, par montant ...)
  const [filtrerPar, setFiltrerPar] = useState("");
  // * liste de devis récuperer de store
  const devisList = useSelector((state) => state.DevisCrud.devisList);
  const listeClients = useSelector((state) => state.ClientCrud.listeClients);
  const ListeArticle = useSelector((state) => state.ArticlesDevis.ListeArticle);
  const listeFamilles = useSelector(
    (state) => state.familleSlice.listeFamilles
  );
  const listeSousfamille = useSelector(
    (state) => state.sousfamilleSlice.listeSousfamille
  );
  const listeUtilisateur_Superviseur = useSelector(
    (state) => state.Utilisateur_SuperviseurSlices.listeUtilisateur_Superviseur
  );
  // * state qui contient l'information d'élèment selectionné
  const [datatableElementSelection, setDatatableElementSelection] = useState(
    {}
  );
  // * pour obtenir les informations de dévis séléctionné

  const handleDatatableSelection = ({ selectedRows }) => {
    if (selectedRows.length != 0) {
      setDatatableElementSelection(selectedRows[0]);
    } else {
      // ! pour éviter l'erreur lorsqu'on déselectionne le dernier élement
      setDatatableElementSelection({});
    }
  };
  const toolbarTable = useSelector((state) => state.uiStates.toolbarTable);

  // * pour filtrer la liste des devis
  const handleBtnRechercheClick = () => {
    if (!valeurRecherche) {
      alert("Veuillez entrer une valeur pour la recherche.");
      return;
    }
    if (!filtrerPar) {
      alert("Veuillez sélectionner un filtre de recherche.");
      return;
    }

    if (toolbarTable == "devis") {
      switch (filtrerPar) {
        case "client":
          dispatch(getDevisParCodeClient(valeurRecherche));
          break;
        case "numbl":
          dispatch(getDevisParNUMBL(valeurRecherche));
          break;
        case "montant":
          dispatch(getDevisParMontant(valeurRecherche));
          break;
        case "periode":
          dispatch(getDevisParPeriode(valeurRecherche));
          break;

        default:
          console.log("Valeur de filtre non définie");
      }
    }
    if (toolbarTable == "utilisateur") {
      switch (filtrerPar) {
        case "code":
          dispatch(getListeUtilisateurParCode(valeurRecherche));
          break;
        case "nom":
          dispatch(getListeUtilisateurParNom(valeurRecherche));
          break;
        case "directeur":
          dispatch(getListeUtilisateurParDirecteur(valeurRecherche));
          case "type":
            dispatch(getListeUtilisateurParType(valeurRecherche))

        default:
          console.log("Valeur de filtre non définie");
      }
    }
    if (toolbarTable == "client") {
      switch (filtrerPar) {
        case "code":
          dispatch(getClientParCode(valeurRecherche));
          break;
        case "typecli":
          dispatch(getClientParTypecli(valeurRecherche));
          break;
        case "cin":
          dispatch(getClientParCin(valeurRecherche));
          break;
        default:
          console.log("Valeur de filtre non définie");
      }
    }

    if (toolbarTable == "article") {
      switch (filtrerPar) {
        case "code":
          dispatch(getListeArticleParCodeArticle(valeurRecherche));
          break;
        case "libelle":
          dispatch(getListeArticleparLibelle(valeurRecherche));
          break;
        case "famille":
          dispatch(getListeArticleparFamille(valeurRecherche));
          break;
        case "SousFamille":
          dispatch(getListeArticleParSousFamille(valeurRecherche));
          break;
        default:
          console.log("Valeur de filtre non définie");
      }
    }

    if (toolbarTable == "famille") {
      switch (filtrerPar) {
        case "code":
          dispatch(getListeFamillesParCodeFamille(valeurRecherche));
          break;
        case "libelle":
          dispatch(getListeFamillesParLibelleFamille(valeurRecherche));
          console.log("filtere table famille par libelle");
          break;
        default:
          console.log("Valeur de filtre non définie");
      }
    }

    if (toolbarTable == "sousfamille") {
      switch (filtrerPar) {
        case "code":
          dispatch(getListeSousFamillesParCodeSousFamille(valeurRecherche));
          console.log("filtere table sous famille par code");
          break;
        case "libelle":
          dispatch(getListeSousFamillesParLibelleSousFamille(valeurRecherche));
          console.log("filtere table sous famille par libelle");
          break;
        default:
          console.log("Valeur de filtre non définie");
      }
    }
  };

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "18px",
        backgroundColor: "#e0f2fe",
        color: "#2a2185",
        padding: "12px",
      },
    },
    rows: {
      style: {
        fontSize: "16px",
        backgroundColor: "#f8fafc",
        "&:hover": {
          backgroundColor: "#dbeafe",
        },
      },
    },
    pagination: {
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        backgroundColor: "#e0f2fe",
      },
    },
  };

  const handleBtnValiderClick = () => {
    if (toolbarTable == "devis") {
      dispatch(setDevisInfoEntiere(datatableElementSelection));
      dispatch(setDevisList([]));
      //  navigate("/DevisFormTout");
      dispatch(setAfficherRecherchePopup(false));
    }
    if (toolbarTable == "client") {
      dispatch(setClientInfosEntiere(datatableElementSelection));

      dispatch(setListeClients([]));
      // navigate("/ClientFormTout");
      dispatch(setAfficherRecherchePopup(false));
    }
    if (toolbarTable == "article") {
      dispatch(setArticleInfosEntiere(datatableElementSelection));
      dispatch(setListeArticle([]));
      dispatch(setAfficherRecherchePopup(false));
    }
    if (toolbarTable == "famille") {
      dispatch(
        setArticleInfos({
          colonne: "famille",
          valeur: datatableElementSelection.code,
        })
      );
      dispatch(
        setArticleInfos({
          colonne: "libelleFamille",
          valeur: datatableElementSelection.libelle,
        })
      );
      dispatch(setListeFamilles([]));
      dispatch(setAfficherRecherchePopup(false));
    }
    if (toolbarTable == "utilisateur") {
      dispatch(setUtilisateurSupInfo(datatableElementSelection));
      dispatch(setAfficherRecherchePopup(false));
    }
    if (toolbarTable == "sousfamille") {
      dispatch(
        setArticleInfos({
          colonne: "codesousfam",
          valeur: datatableElementSelection.code,
        })
      );
      dispatch(
        setArticleInfos({
          colonne: "Libellesousfamille",
          valeur: datatableElementSelection.libelle,
        })
      );

      dispatch(setListeSousfamille([]));
      dispatch(setAfficherRecherchePopup(false));
    }
  };

  //devis
  const collonesDevis = [
    { name: "Numéro de devis", selector: (row) => row.NUMBL, sortable: true },
    { name: "Code client", selector: (row) => row.CODECLI, sortable: true },
    { name: "Raison Sociale", selector: (row) => row.RSCLI },
    { name: "Point de vente", selector: (row) => row.cp },

    { name: "Montant", selector: (row) => row.MTTC },
    { name: "Date", selector: (row) => row.DATEBL },
    { name: "Vendeur", selector: (row) => row.usera },

    { name: "RS Représentant", selector: (row) => row.RSREP },
    { name: "Code secteur", selector: (row) => row.codesecteur },
  ];
  //client
  const collonesClient = [
    { name: "Code", selector: (row) => row.code, sortable: true },
    { name: "Raison Sociale", selector: (row) => row.rsoc, sortable: true },
    { name: "cin", selector: (row) => row.cin, sortable: true },
    { name: "typecli", selector: (row) => row.typecli, sortable: true },
  ];
  //article
  const colonnesArticle = [
    { name: "Code", selector: (row) => row.code, sortable: true },
    { name: "Libelle", selector: (row) => row.libelle, sortable: true },
    { name: "Famille", selector: (row) => row.famille, sortable: true },
    {
      name: "Sous Famille",
      selector: (row) => row.codesousfam,
      sortable: true,
    },
  ];
  //famille
  const colonnesFamille = [
    { name: "code", selector: (row) => row.code, sortable: true },
    { name: "Libelle", selector: (row) => row.libelle, sortable: true },
  ];
  //sousfamille
  const colonnesSousFamille = [
    { name: "code", selector: (row) => row.code, sortable: true },
    { name: "Libelle", selector: (row) => row.libelle, sortable: true },
  ];
  //* utillisateur
  const colonnesUtilisateur = [
    { name: "code", selector: (row) => row.codeuser, sortable: true },
    { name: "nom", selector: (row) => row.nom, sortable: true },
    { name: "directeur", selector: (row) => row.directeur, sortable: true },
    { name: "type", selector: (row) => row.type, sortable: true },
  ];

  // const handleRetourBtnClick = () => {
  //   console.log("ok");
  //   if (toolbarTable == "devis") {
  //     dispatch(setDevisList([]));
  //   }
  //   if (toolbarTable == "client") {
  //     dispatch(setListeClients([]));
  //   }

  //   navigate(-1);
  // };

  const fermerPopupRecherche = () => {
    dispatch(setAfficherRecherchePopup(false));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 relative">
        {/* Bouton fermer (X) */}
        <button
          onClick={() => fermerPopupRecherche()}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg"
        >
          ✕
        </button>

        {/* Bouton retour
        <button
          onClick={() => {
            handleRetourBtnClick();
          }}
          className="flex items-center text-blue-600 hover:text-blue-800 transition duration-200 mb-4"
        >
          <FaArrowLeft className="mr-2" /> Retour
        </button> */}

        <h2
          className="text-2xl font-semibold mb-6 text-center"
          style={{ color: "#2a2185" }}
        >
          Rechercher
          {toolbarTable === "devis" && "  par devis"}{" "}
          {toolbarTable === "client" && "  par client"}{" "}
          {toolbarTable === "article" && "  par article"}{" "}
          {toolbarTable === "sousfamille" && "  par sous famille"}{" "}
          {toolbarTable === "famille" && "  par famille"}{" "}
          {toolbarTable === "utilisateur" && "  par utilisateur"}{" "}
        </h2>

        <div className="flex space-x-6">
          {/* Filtres */}
          <div className="w-1/3 bg-gray-50 p-4 rounded-xl shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Rechercher {toolbarTable === "devis" && "Devis"}{" "}
              {toolbarTable === "client" && "Client"}{" "}
              {toolbarTable === "article" && "article"}{" "}
              {toolbarTable === "sousfamille" && "sousfamille"}{" "}
              {toolbarTable === "famille" && "famille"} par :
            </h3>

            <div className="space-y-2">
              {toolbarTable === "devis" &&
                ["numbl", "client", "montant", "periode", "article"].map(
                  (filtre) => (
                    <label key={filtre} className="flex items-center">
                      <input
                        type="radio"
                        name="filtres"
                        value={filtre}
                        className="mr-2"
                        onChange={() => setFiltrerPar(filtre)}
                      />
                      {filtre.charAt(0).toUpperCase() + filtre.slice(1)}
                    </label>
                  )
                )}

              {toolbarTable === "client" &&
                ["code", "typecli", "cin"].map((filtre) => (
                  <label key={filtre} className="flex items-center">
                    <input
                      type="radio"
                      name="filtres"
                      value={filtre}
                      className="mr-2"
                      onChange={() => setFiltrerPar(filtre)}
                    />
                    {filtre.charAt(0).toUpperCase() + filtre.slice(1)}
                  </label>
                ))}

              {toolbarTable === "article" &&
                ["code", "libelle", "famille", "SousFamille"].map((filtre) => (
                  <label key={filtre} className="flex items-center">
                    <input
                      type="radio"
                      name="filtres"
                      value={filtre}
                      className="mr-2"
                      onChange={() => setFiltrerPar(filtre)}
                    />
                    {filtre.charAt(0).toUpperCase() + filtre.slice(1)}
                  </label>
                ))}

              {toolbarTable === "famille" &&
                ["code", "libelle"].map((filtre) => (
                  <label key={filtre} className="flex items-center">
                    <input
                      type="radio"
                      name="filtres"
                      value={filtre}
                      className="mr-2"
                      onChange={() => setFiltrerPar(filtre)}
                    />
                    {filtre.charAt(0).toUpperCase() + filtre.slice(1)}
                  </label>
                ))}

              {toolbarTable === "sousfamille" &&
                ["code", "libelle"].map((filtre) => (
                  <label key={filtre} className="flex items-center">
                    <input
                      type="radio"
                      name="filtres"
                      value={filtre}
                      className="mr-2"
                      onChange={() => setFiltrerPar(filtre)}
                    />
                    {filtre.charAt(0).toUpperCase() + filtre.slice(1)}
                  </label>
                ))}

              {toolbarTable === "utilisateur" &&
                ["code", "nom", "directeur", "type"].map((filtre) => (
                  <label key={filtre} className="flex items-center">
                    <input
                      type="radio"
                      name="filtres"
                      value={filtre}
                      className="mr-2"
                      onChange={() => setFiltrerPar(filtre)}
                    />
                    {filtre.charAt(0).toUpperCase() + filtre.slice(1)}
                  </label>
                ))}
            </div>
          </div>

          {/* Champ de recherche */}
          <div className="w-2/3 bg-gray-50 p-4 rounded-xl shadow">
            <div className="flex items-center space-x-2 mb-4">
              <input
                id="searchInput"
                type="text"
                onChange={(e) => setValeurRecherche(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg w-full"
                placeholder="Entrez votre recherche..."
              />
              <button
                onClick={handleBtnRechercheClick}
                style={{ backgroundColor: "#2a2185" }}
                className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
              >
                Rechercher
              </button>
            </div>

            {/* Table des résultats */}
            {toolbarTable === "client" && (
              <div className="max-h-[400px] overflow-y-auto">
                <DataTable
                  data={listeClients}
                  columns={collonesClient}
                  pagination
                  fixedHeader
                  customStyles={customStyles}
                  striped
                  selectableRows
                  onSelectedRowsChange={handleDatatableSelection}
                />
              </div>
            )}
            {toolbarTable === "devis" && (
              <div className="max-h-[400px] overflow-y-auto">
                <DataTable
                  data={devisList}
                  columns={collonesDevis}
                  pagination
                  fixedHeader
                  customStyles={customStyles}
                  striped
                  selectableRows
                  onSelectedRowsChange={handleDatatableSelection}
                />
              </div>
            )}

            {toolbarTable === "article" && (
              <div className="max-h-[400px] overflow-y-auto">
                <DataTable
                  data={ListeArticle}
                  columns={colonnesArticle}
                  pagination
                  fixedHeader
                  customStyles={customStyles}
                  striped
                  selectableRows
                  onSelectedRowsChange={handleDatatableSelection}
                />
              </div>
            )}

            {toolbarTable === "famille" && (
              <div className="max-h-[400px] overflow-y-auto">
                <DataTable
                  data={listeFamilles}
                  columns={colonnesFamille}
                  pagination
                  fixedHeader
                  customStyles={customStyles}
                  striped
                  selectableRows
                  onSelectedRowsChange={handleDatatableSelection}
                />
              </div>
            )}

            {toolbarTable === "sousfamille" && (
              <div className="max-h-[400px] overflow-y-auto">
                <DataTable
                  data={listeSousfamille}
                  columns={colonnesSousFamille}
                  pagination
                  fixedHeader
                  customStyles={customStyles}
                  striped
                  selectableRows
                  onSelectedRowsChange={handleDatatableSelection}
                />
              </div>
            )}
            {toolbarTable === "utilisateur" && (
              <div className="max-h-[400px] overflow-y-auto">
                <DataTable
                  data={listeUtilisateur_Superviseur}
                  columns={colonnesUtilisateur}
                  pagination
                  fixedHeader
                  customStyles={customStyles}
                  striped
                  selectableRows
                  onSelectedRowsChange={handleDatatableSelection}
                />
              </div>
            )}

            <button
              onClick={handleBtnValiderClick}
              className={`${
                Object.keys(datatableElementSelection).length == 0
                  ? "bg-gray-300 hover:bg-gray-700"
                  : "bg-green-600 hover:bg-green-700"
              } text-white mt-4 px-4 py-2 rounded-lg transition`}
              disabled={Object.keys(datatableElementSelection).length == 0}
            >
              Valider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Recherche;
