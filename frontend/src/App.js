import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import DevisForm from "./components/Devis/DevisForm";
import HomePage from "./pages/ErpPages/HomePage";
import SignInPage from "./pages/authentication/SignInPage";
import DevisList from "./pages/Devis/DevisList";
import DevisDetails from "./components/Devis/DevisDetails";
import Dashboard from "./pages/ErpPages/Dashboard";
import SocietiesList from "./pages/ErpPages/SocietiesList";
import Recherche from "./pages/Devis/recherche";
import ResetPassword from "./pages/authentication/ResetPassword";

import GestionCommerciale from "./pages/ErpPages/GestionCommerciale";
import GestionDesVentes from "./pages/ErpPages/GestionDesVentes";
import RegisterPage from "./pages/authentication/RegisterPage";
import EmailEnvoye from "./pages/authentication/EmailEnvoye";
import ClientList from "./pages/Clients/ClientList";
import Parent from "./test/Parent";
import DevisFormTout from "./pages/Devis/DevisFormTout";
import DevisFormPlaceholder from "./components/Devis/DevisFormPlaceholder";

function App() {
  const notify = () => {
    toast.success("Bienvenue sur la page d'accueil !", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
    });
  };

  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
      />

      <Routes>
        <Route path="/" element={<SignInPage />} />
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
        <Route path="/Parent" element={<Parent />}></Route>
        <Route path="/DevisFormTout" element={<DevisFormTout />}></Route>
        <Route path="/DevisFormPlaceholder" element ={<DevisFormPlaceholder></DevisFormPlaceholder>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
