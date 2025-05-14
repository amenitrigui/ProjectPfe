import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDevisParCodeClient,
  getDevisParMontant,
  getDevisParPeriode,
  setDevisInfoEntiere,
  setDevisList,
  getListeNumbl,
  getListeDevisParNUMBL,
  viderChampsDevisInfo,
  setDevisInfo,
  setDevisClientInfos,
} from "../../app/devis_slices/devisSlice";
import DataTable from "react-data-table-component";
import {
  getClientParCin,
  getClientParCode,
  getClientParRaisonSociale,
  getToutCodesClient,
  setClientInfosEntiere,
  setListeClients,
  viderChampsClientInfo,
} from "../../app/client_slices/clientSlice";
import {
  setAfficherRecherchePopup,
  setToolbarTable,
} from "../../app/interface_slices/interfaceSlice";
import {
  getListeArticleParCodeArticle,
  getListeArticleparFamille,
  getListeArticleparLibelle,
  getListeArticleParSousFamille,
  getListeCodesArticles,
  setArticleInfos,
  setArticleInfosEntiere,
  setLigneDevisInfos,
  setLigneDevisInfosEntiere,
  setListeArticle,
  viderChampsArticleInfo,
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
import { useLocation } from "react-router-dom";
import { setUtilisateurSupInfo } from "../../app/utilisateurSystemSlices/utilisateurSystemSlice";
import {
  getListeUtilisateurParCode,
  getListeUtilisateurParDirecteur,
  getListeUtilisateurParNom,
  getListeUtilisateurParType,
  setInfosUtilisateurEntiere,
  setListeUtilisateur_Superviseur,
  viderChampsInfosUtilisateur,
} from "../../app/utilisateur_slices/utilisateurSlice";

const Recherche = () => {
  //?==================================================================================================================
  //?=====================================================variables====================================================
  //?==================================================================================================================
  const toolbarTable = useSelector(
    (state) => state.interfaceSlice.toolbarTable
  );
  const listeToutCodesClients = useSelector(
    (state) => state.clientSlice.listeToutCodesClients
  );
  const [estFiltreChoisit, setEstFiltreChoisit] = useState(false);
  // * tableau contenant la liste des codes des devis
  const listeNUMBL = useSelector((state) => state.devisSlice.listeNUMBL);
  // * récuperer la liste de codes sélon table choisit
  const dispatch = useDispatch();
  // * valeur de champs de recherche
  const [valeurRecherche, setValeurRecherche] = useState("");
  // * critère de filtre (par client, par montant ...)
  const [filtrerPar, setFiltrerPar] = useState("");
  // * liste de devis récuperer de store
  const devisList = useSelector((state) => state.devisSlice.devisList);
  const listeClients = useSelector((state) => state.clientSlice.listeClients);
  const ListeArticle = useSelector((state) => state.articleSlice.ListeArticle);
  const FamilleInfos = useSelector((state) => state.familleSlice.FamilleInfos);
  const listeFamilles = useSelector(
    (state) => state.familleSlice.listeFamilles
  );
  const ListeCodeArticles = useSelector(
    (state) => state.articleSlice.ListeCodeArticles
  );
  const listeSousfamille = useSelector(
    (state) => state.sousfamilleSlice.listeSousfamille
  );
  const listeUtilisateur_Superviseur = useSelector(
    (state) => state.utilisateurSlice.listeUtilisateur_Superviseur
  );
  // * state qui contient l'information d'élèment selectionné
  const [datatableElementSelection, setDatatableElementSelection] = useState(
    {}
  );
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
  // * devis
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
  // * client
  const collonesClient = [
    { name: "Code", selector: (row) => row.code, sortable: true },
    { name: "Raison Sociale", selector: (row) => row.rsoc, sortable: true },
    { name: "cin", selector: (row) => row.cin, sortable: true },
    { name: "raison sociale", selector: (row) => row.rsoc, sortable: true },
  ];
  // * article
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
  // * famille
  const colonnesFamille = [
    { name: "code", selector: (row) => row.code, sortable: true },
    { name: "Libelle", selector: (row) => row.libelle, sortable: true },
  ];
  // *sousfamille
  const colonnesSousFamille = [
    { name: "code", selector: (row) => row.code, sortable: true },
    { name: "Libelle", selector: (row) => row.libelle, sortable: true },
  ];
  // * utillisateur
  const colonnesUtilisateur = [
    { name: "code", selector: (row) => row.codeuser, sortable: true },
    { name: "nom", selector: (row) => row.nom, sortable: true },
    { name: "directeur", selector: (row) => row.directeur, sortable: true },
    { name: "type", selector: (row) => row.type, sortable: true}
  ];

  const location = useLocation();

  //?==================================================================================================================
  //?=================================================appels UseEffect=================================================
  //?==================================================================================================================
  useEffect(() => {
    if (toolbarTable == "client") {
      dispatch(getToutCodesClient());
    }
    dispatch(getListeCodesArticles());
    if (toolbarTable == "devis") {
      dispatch(getListeNumbl());
    }
  }, [toolbarTable]);

  useEffect(() => {
    if (FamilleInfos.code) {
      dispatch(getListeCodesArticles(FamilleInfos.code));
    }
  }, [FamilleInfos.code]);
  //?==================================================================================================================
  //?=====================================================fonctions====================================================
  //?==================================================================================================================
  // * pour obtenir les informations de dévis séléctionné
  const handleDatatableSelection = ({ selectedRows }) => {
    if (selectedRows.length != 0) {
      setDatatableElementSelection(selectedRows[0]);
    } else {
      // ! pour éviter l'erreur lorsqu'on déselectionne le dernier élement
      setDatatableElementSelection({});
    }
  };
  // * pour filtrer la liste des devis
  const handleChampRechercheChange = (valeur) => {
    if (!filtrerPar) {
      alert("Veuillez sélectionner un filtre de recherche.");
      return;
    }

    if (toolbarTable == "devis") {
      switch (filtrerPar) {
        case "numbl":
          dispatch(getListeDevisParNUMBL(valeur));
          break;
        case "client":
          dispatch(getDevisParCodeClient(valeur));
          break;
        case "montant":
          dispatch(getDevisParMontant(valeur));
          break;
        case "periode":
          dispatch(getDevisParPeriode(valeur));
          break;

        default:
          alert("Valeur de filtre non définie");
      }
    }
    if (toolbarTable == "utilisateur") {
      switch (filtrerPar) {
        case "code":
          dispatch(getListeUtilisateurParCode(valeur));

          break;
        case "nom":
          dispatch(getListeUtilisateurParNom(valeur));
          break;
        case "directeur":
          dispatch(getListeUtilisateurParDirecteur(valeur));
          break;
        case "type":
          dispatch(getListeUtilisateurParType(valeur));
          break;
        default:
          alert("Valeur de filtre non définie");
      }
    }
    if (toolbarTable == "client") {
      switch (filtrerPar) {
        case "code":
          dispatch(getClientParCode(valeur));
          break;
        case "raison sociale":
          dispatch(getClientParRaisonSociale(valeur));
          break;
        case "cin":
          dispatch(getClientParCin(valeur));
          break;
        default:
          alert("Valeur de filtre non définie");
      }
    }

    if (toolbarTable == "article") {
      switch (filtrerPar) {
        case "code":
          if (FamilleInfos.code) {
            console.log("ok");
            dispatch(
              getListeArticleParCodeArticle({
                codeArticle: valeur,
                codeFamille: FamilleInfos.code,
              })
            );
          }
          if (!FamilleInfos.code) {
            dispatch(getListeArticleParCodeArticle({ codeArticle: valeur }));
          }
          break;
        case "libelle":
          dispatch(getListeArticleparLibelle(valeur));
          break;
        case "famille":
          dispatch(getListeArticleparFamille(valeur));
          break;
        case "SousFamille":
          dispatch(getListeArticleParSousFamille(valeur));
          break;
        default:
          alert("Valeur de filtre non définie");
      }
    }

    if (toolbarTable == "famille") {
      switch (filtrerPar) {
        case "code":
          dispatch(getListeFamillesParCodeFamille(valeur));
          break;
        case "libelle":
          dispatch(getListeFamillesParLibelleFamille(valeur));
          break;
        default:
          alert("Valeur de filtre non définie");
      }
    }

    if (toolbarTable == "sousfamille") {
      switch (filtrerPar) {
        case "code":
          dispatch(getListeSousFamillesParCodeSousFamille(valeur));
          break;
        case "libelle":
          dispatch(getListeSousFamillesParLibelleSousFamille(valeur));
          break;
        default:
          alert("Valeur de filtre non définie");
      }
    }
  };

  // ??????????????
  const viderListes = () => {
    dispatch(setListeUtilisateur_Superviseur([]));
    dispatch(setDevisList([]));
    dispatch(setListeArticle([]));
    dispatch(setListeClients([]));
    dispatch(setListeFamilles([]));
    dispatch(setListeSousfamille([]));
  }
  // * ceci est utilisé pour remplir les informations d'un ligne de devis par la 
  // * résultat d'un recherche d'article dans l'interface de gestion de devis
  const remplirChampsLigneDevis = () => {
    if (datatableElementSelection) {
      dispatch(
        setLigneDevisInfos({
          colonne: "CodeART",
          valeur: datatableElementSelection.code,
        })
      );
      dispatch(
        setLigneDevisInfos({
          colonne: "DesART",
          valeur: datatableElementSelection.libelle,
        })
      );
      dispatch(
        setLigneDevisInfos({
          colonne: "PUART",
          valeur: datatableElementSelection.prixnet,
        })
      );
      dispatch(
        setLigneDevisInfos({
          colonne: "Remise",
          valeur: datatableElementSelection.DREMISE,
        })
      );
      dispatch(
        setLigneDevisInfos({
          colonne: "TypeART",
          valeur: datatableElementSelection.type,
        })
      );
      dispatch(
        setLigneDevisInfos({
          colonne: "TauxTVA",
          valeur: datatableElementSelection.tauxtva,
        })
      );
      dispatch(
        setLigneDevisInfos({
          colonne: "famille",
          valeur: datatableElementSelection.famille,
        })
      );
      dispatch(
        setLigneDevisInfos({
          colonne: "nbun",
          valeur: datatableElementSelection.nbrunite,
        })
      );
      dispatch(
        setLigneDevisInfos({
          colonne: "Unite",
          valeur: datatableElementSelection.unite,
        })
      );
      dispatch(
        setLigneDevisInfos({
          colonne: "Conf",
          valeur: datatableElementSelection.CONFIG,
        })
      );
    }
  };

  const handleBtnValiderClick = () => {
    if (toolbarTable == "devis") {
      dispatch(setDevisInfoEntiere(datatableElementSelection));
      dispatch(setAfficherRecherchePopup(false));
    }
    if (toolbarTable == "client") {
      dispatch(setClientInfosEntiere(datatableElementSelection));
      dispatch(
        setDevisClientInfos({
          CODECLI: datatableElementSelection.code,
          RSCLI: datatableElementSelection.rsoc,
          ADRCLI: datatableElementSelection.adresse,
        })
      );
      dispatch(setAfficherRecherchePopup(false));
    }
    if (toolbarTable == "article") {
      dispatch(setArticleInfosEntiere(datatableElementSelection));
      remplirChampsLigneDevis();
      dispatch(setAfficherRecherchePopup(false));
    }
    if (toolbarTable == "famille") {
      // * ceci est pour l'interface d'ajout d'une ligne devis
      dispatch(
        setLigneDevisInfos({
          colonne: "famille",
          valeur: datatableElementSelection.code,
        })
      );
      dispatch(setFamilleInfosEntiere(datatableElementSelection));
      // * ============================================================
      // * ceci est pour l'interface d'articles
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
      // * ============================================================
      dispatch(setAfficherRecherchePopup(false));
    }
    if (toolbarTable == "utilisateur") {
      dispatch(setInfosUtilisateurEntiere(datatableElementSelection));
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

      dispatch(setAfficherRecherchePopup(false));
    }
    viderListes();
    // ! ??????
    // viderChamps();
    revenirToolbarTablePrecedent();
  };

  const viderChamps = () => {
    switch (toolbarTable) {
      case "article":
        dispatch(viderChampsArticleInfo());
        break;
      case "client":
        dispatch(viderChampsClientInfo());
        break;
      case "devis":
        dispatch(viderChampsDevisInfo());
        break;
      case "utilisateur":
        dispatch(viderChampsInfosUtilisateur());
        break;
    }
  };

  const fermerPopupRecherche = () => {
    // viderChamps();
    revenirToolbarTablePrecedent();
    dispatch(setAfficherRecherchePopup(false));
  };

  const revenirToolbarTablePrecedent = () => {
    switch (location.pathname) {
      case "/DevisFormTout":
        dispatch(setToolbarTable("devis"));
        break;
      case "/UtilisateurFormTout":
        dispatch(setToolbarTable("utilisateur"));
        break;
      case "/ArticleFormTout":
        dispatch(setToolbarTable("article"));
        break;
      case "/clientFormTout":
        dispatch(setToolbarTable("client"));
        break;
    }
  };
  const changerFiltre = (filtre) => {
    viderListes();
    setEstFiltreChoisit(true);
    setFiltrerPar(filtre)
  }
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl p-6 relative max-h-screen overflow-y-auto">
        {/* Bouton fermer (X) */}
        <button
          onClick={() => fermerPopupRecherche()}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg"
        >
          ✕
        </button>

        <h2
          className="text-2xl font-semibold mb-6 text-center"
          style={{ color: "#2a2185" }}
        >
          Rechercher
          {toolbarTable === "devis" && " par devis"}
          {toolbarTable === "client" && " par client"}
          {toolbarTable === "article" && " par article"}
          {toolbarTable === "sousfamille" && " par sous famille"}
          {toolbarTable === "famille" && " par famille"}
          {toolbarTable === "utilisateur" && " par utilisateur"}
        </h2>

        <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
          {/* Filtres */}
          <div className="md:w-1/3 w-full bg-gray-50 p-4 rounded-xl shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Rechercher {toolbarTable === "devis" && "Devis"}
              {toolbarTable === "client" && "Client"}
              {toolbarTable === "article" && "Article"}
              {toolbarTable === "sousfamille" && "Sousfamille"}
              {toolbarTable === "famille" && "Famille"} par :
            </h3>

            <div className="space-y-2">
              {toolbarTable === "devis" &&
                ["numbl", "client", "montant", "periode"].map(
                  (filtre) => (
                    <label key={filtre} className="flex items-center">
                      <input
                        type="radio"
                        name="filtres"
                        value={filtre}
                        className="mr-2"
                        onChange={() => {changerFiltre(filtre)}}
                      />
                      {filtre.charAt(0).toUpperCase() + filtre.slice(1)}
                    </label>
                  )
                )}

              {toolbarTable === "client" &&
                ["code", "raison sociale", "cin"].map((filtre) => (
                  <label key={filtre} className="flex items-center">
                    <input
                      type="radio"
                      name="filtres"
                      value={filtre}
                      className="mr-2"
                      onChange={() => {changerFiltre(filtre)}}
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
                      onChange={() => {changerFiltre(filtre)}}
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
                      onChange={() => {changerFiltre(filtre)}}
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
                      onChange={() => {changerFiltre(filtre)}}
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
                      onChange={() => {changerFiltre(filtre)}}
git pu                    />
                    {filtre.charAt(0).toUpperCase() + filtre.slice(1)}
                  </label>
                ))}
            </div>
          </div>

          {/* Champ de recherche + résultat */}
          <div className="md:w-2/3 w-full bg-gray-50 p-4 rounded-xl shadow">
            <div className="flex flex-col space-y-2 mb-4">
              <input
                id="searchInput"
                type="text"
                onChange={(e) => handleChampRechercheChange(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg w-full"
                placeholder="Entrez votre recherche..."
                disabled={!estFiltreChoisit}
                list={
                  toolbarTable === "client" && filtrerPar === "code"
                    ? "listeCodesClients"
                    : toolbarTable === "article" && filtrerPar === "code"
                    ? "listeCodesArticle"
                    : toolbarTable === "devis" && filtrerPar === "numbl"
                    ? "listeCodesNumbl"
                    : toolbarTable === "famille" && filtrerPar === "code"
                    ? "listeCodesFamilles"
                    : ""
                }
              />
              <datalist id="listeCodesClients">
                {listeToutCodesClients.length > 0 ? (
                  listeToutCodesClients.map((client, indice) => (
                    <option key={indice} value={client.code}>
                      {client.code}
                    </option>
                  ))
                ) : (
                  <option disabled>Aucun client trouvé</option>
                )}
              </datalist>

              <datalist id="listeCodesArticle">
                {ListeCodeArticles.map((article, indice) => (
                  <option key={indice} value={article.code}>
                    {article.code}
                  </option>
                ))}
              </datalist>

              <datalist id="listeCodesNumbl">
                {listeNUMBL.map((codeDevis) => (
                  <option key={codeDevis.NUMBL} value={codeDevis.NUMBL}>
                    {codeDevis.NUMBL}
                  </option>
                ))}
              </datalist>

              <datalist id="listeCodesFamilles">
                {ListeArticle.length > 0 ? (
                  ListeArticle.map((famille, indice) => (
                    <option key={indice} value={famille.code}>
                      {famille.code}
                    </option>
                  ))
                ) : (
                  <option disabled>Aucun article trouvé</option>
                )}
              </datalist>
            </div>

            {/* Table des résultats */}
            <div className="h-[200px] overflow-y-auto">
              {toolbarTable === "client" && (
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
              )}
              {toolbarTable === "devis" && (
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
              )}
              {toolbarTable === "article" && (
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
              )}
              {toolbarTable === "famille" && (
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
              )}
              {toolbarTable === "sousfamille" && (
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
              )}
              {toolbarTable === "utilisateur" && (
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
              )}
            </div>

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
