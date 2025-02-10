import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import DevisForm from './components/DevisForm';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import DevisList from './pages/DevisList';
import DevisDetails from './components/DevisDetails';
import Dashboard from './pages/Dashboard';
import SocietiesList from './pages/SocietiesList';
import Recherche from './pages/recherche';
import ResetPassword from './pages/ResetPassword';

import GestionCommerciale from './pages/GestionCommerciale';
import GestionDesVentes from './pages/GestionDesVentes';
import RegisterPage from './pages/RegisterPage';
import EmailEnvoye from './pages/EmailEnvoye';

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
        <Route path="/devis-details/:numbl" element={<DevisDetails />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/SocietiesList" element={<SocietiesList />} />
        <Route path="/recherche" element={<Recherche />} /> 
        <Route path="/GestionCommerciale" element={<GestionCommerciale />} /> 
        <Route path="/GestionDesVentes" element={<GestionDesVentes />} /> 
        <Route path="/RegisterPage" element={<RegisterPage />} /> 
        <Route path="/ResetPassword" element={<ResetPassword />}></Route>
        <Route path="/EmailEnvoye" element = {<EmailEnvoye />}></Route>
       
      </Routes>
    </Router>
  );
}    

export default App;
