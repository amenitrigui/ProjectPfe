import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";

import DevisForm from "./components/Devis/DevisForm";
import HomePage from "./pages/ErpPages/HomePage";
import SignInPage from "./pages/authentication/SignInPage";
import DevisList from "./pages/Devis/DevisList";
import DevisDetails from "./components/Devis/DevisDetails";
import Dashboard from "./pages/ErpPages/Dashboard";
import SocietiesList from "./pages/ErpPages/SocietiesList";
import Recherche from "./components/Common/recherche";
import ResetPassword from "./pages/authentication/ResetPassword";

import GestionCommerciale from "./pages/ErpPages/GestionCommerciale";
import GestionDesVentes from "./pages/ErpPages/GestionDesVentes";
import RegisterPage from "./pages/authentication/RegisterPage";
import EmailEnvoye from "./pages/authentication/EmailEnvoye";
import ClientList from "./pages/Clients/ClientList";
import DevisFormTout from "./pages/Devis/DevisFormTout";
import DevisFormPlaceholder from "./components/Devis/DevisFormPlaceholder";
import Deconnexion from "./pages/authentication/Deconnexion";
import ClientFormTout from "./pages/Clients/ClientFormTout";
import { useDispatch, useSelector } from "react-redux";
import UtilisateurFormTout from "./pages/Utilisateurs/UtilisateurFormTout";
import ArticleFormTout from "./pages/Article/ArticleFormTout"
import ArticleList from "./pages/Article/ArticleList"
import FamilleFormTout from "./pages/Famille/FamilleFormTout"
import Settings from "./pages/ErpPages/Settings"
import UtilisateurList from "./pages/Utilisateurs/UtilisateurList"
import { setActiverBoutonsValiderAnnuler, setAfficherRecherchePopup, setIsDashBoardRoute, setOuvrireDrawerMenu, setToolbarMode } from "./app/interface_slices/interfaceSlice";
import ImprimerDevis from "./pages/Devis/Imprimer";
import SecteurForm from "./pages/Clients/SecteurForm";
import Test1 from "./test/Test1";
import Secteur_Region_CpostalForm  from "./pages/Clients/Secteur_Region_CpostalForm";
import { viderChampsArticleInfo } from "./app/article_slices/articleSlice";
import { viderChampsCPostalInfo } from "./app/cpostal_slices/cpostalSlice";
import { viderChampsClientInfo } from "./app/client_slices/clientSlice";
import { viderChampsDevisInfo } from "./app/devis_slices/devisSlice";
import { viderChampsRegionInfo } from "./app/region_slices/regionSlice";

function App() {
  //?==================================================================================================================
  //?=====================================================variables====================================================
  //?==================================================================================================================
  const dispatch = useDispatch();
  const usera = useSelector((state) => state.utilisateurSlice.codeuser);
  const location = useLocation();
  const toolbarTable = useSelector((state) => state.interfaceSlice.toolbarTable);
  const utilisateurConnecte = useSelector(
    (state) => state.utilisateurSystemSlice.utilisateurConnecte
  );
  const infosUtilisateur = useSelector((state) => state.utilisateurSlice.infosUtilisateur);
  const afficherRecherchePopup = useSelector((state) => state.interfaceSlice.afficherRecherchePopup);
  //?==================================================================================================================
  //?==================================================appels UseEffect================================================
  //?==================================================================================================================
  useEffect(() => {
    dispatch(setToolbarMode("consultation"))
    dispatch(setActiverBoutonsValiderAnnuler(false))
    // dispatch(viderChampsArticleInfo());
    // dispatch(viderChampsCPostalInfo());
    // dispatch(viderChampsClientInfo());
    // dispatch(viderChampsDevisInfo());
    // dispatch(viderChampsRegionInfo());
    if(location.pathname.toLowerCase() == "/dashboard") {
      dispatch(setIsDashBoardRoute(true));
    }if(location.pathname.toLowerCase() != "/dashboard") {
      dispatch(setIsDashBoardRoute(false));
    }
    if(afficherRecherchePopup == true) {
      dispatch(setAfficherRecherchePopup(false));
    }
    dispatch(setOuvrireDrawerMenu(false))
  }, [location.pathname])
  //?==================================================================================================================
  //?=====================================================fonctions====================================================
  //?==================================================================================================================
  // dispatch(setDevisInfo("usera", usera));
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/deconnexion" element={<Deconnexion />} />
      <Route path="/Devis-Form" element={<DevisForm />} />
      <Route path="/Home-Page" element={<HomePage />} />
      <Route path="/DevisList" element={<DevisList />} />
      <Route path="/dvis-details/e:numbl" element={<DevisDetails />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/SocietiesList" element={<SocietiesList />} />
      <Route path="/recherche" element={<Recherche />} />
      <Route path="/GestionCommerciale" element={<GestionCommerciale />} />
      <Route path="/GestionDesVentes" element={<GestionDesVentes />} />
      <Route path="/RegisterPage" element={<RegisterPage />} />
      <Route path="/ResetPassword" element={<ResetPassword />}></Route>
      <Route path="/EmailEnvoye" element={<EmailEnvoye />}></Route>
      <Route path="/ClientList" element={<ClientList />}></Route>
      <Route path="/ClientFormTout" element={<ClientFormTout />} />
      <Route path="/DevisFormTout" element={<DevisFormTout />}></Route>
      <Route path="/ArticleFormTout" element={<ArticleFormTout />}></Route>
      <Route path="/ArticleList" element={<ArticleList />}></Route>
      <Route path="/FamilleFormTout" element={<FamilleFormTout />}></Route>
      <Route path="/Settings" element={<Settings />}></Route>
      <Route path="/ImprimerDevis" element={<ImprimerDevis />}></Route>
      <Route path="/SecteurForm" element={<SecteurForm />}></Route>
      <Route path="/test" element={<Test1 />}></Route>
      <Route path="/Secteur_Region_CpostalForm" element={<Secteur_Region_CpostalForm />}></Route>

      <Route
        path="/DevisFormPlaceholder"
        element={<DevisFormPlaceholder></DevisFormPlaceholder>}
      ></Route>
      <Route path="/UtilisateurFormTout" element={<UtilisateurFormTout />} />
      <Route path="/UtilisateurList" element={<UtilisateurList/>}></Route>
    </Routes>
  );
}

export default App;
