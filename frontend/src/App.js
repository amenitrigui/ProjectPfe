import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
import { setDevisInfo } from "./app/devis_slices/devisSlice";
import UtilisateurFormTout from "./pages/Utilisateurs/UtilisateurFormTout";
import ArticleFormTout from "./pages/Article/ArticleFormTout"
import ArticleList from "./pages/Article/ArticleList"

function App() {
  const dispatch = useDispatch();
  const usera = useSelector((state) => state.UtilisateurInfo.codeuser);
  dispatch(setDevisInfo("usera",usera))
  // ! thou art a man of feeble spirit
  // const persistor = persistStore(store);
  // // ! whomst has awakened the ancient one
  // useEffect(() => {
  //   persistor.purge();
  // }, [dispatch]);
  return (
    <Router>
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
        <Route path="/ArticleFormTout" element={<ArticleFormTout/>}></Route>
        <Route path="/ArticleList" element={<ArticleList/>}></Route>
        <Route
          path="/DevisFormPlaceholder"
          element={<DevisFormPlaceholder></DevisFormPlaceholder>}
        ></Route>
        <Route path="/UtilisateurFormTout" element={<UtilisateurFormTout />} />
      </Routes>
    </Router>
  );
}

export default App;
