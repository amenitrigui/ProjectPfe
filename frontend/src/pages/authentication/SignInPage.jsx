import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer, Bounce } from "react-toastify";
import {
  setToken,
  setutilisateurSliceEntire,
  setutilisateurConnecteEntiere,
} from "../../app/utilisateurSystemSlices/utilisateurSystemSlice";
import { loginUtilisateur } from "../../app/utilisateur_slices/utilisateurSlice";

function SignInPage() {
  const dispatch = useDispatch();
  const responseLogin = useSelector(
    (state) => state.utilisateurSlice.responseLogin
  );
  const navigate = useNavigate();

  // useEffect(()=>{
  //   dispatch(loginUtilisateur({nom:"hanen",motpasse:"hanen123ps"}))
  // },[])
  const [nom, setNom] = useState("");
  const [motpasse, setMotpasse] = useState("");
  const hundleLogin = (e) => {
    e.preventDefault();

    dispatch(loginUtilisateur({ nom, motpasse }));
    if (responseLogin && Object.values(responseLogin).length != 0) {
      dispatch(setutilisateurConnecteEntiere(responseLogin.user));
      dispatch(setToken(responseLogin.token));
      localStorage.setItem(
        "societies",
        JSON.stringify(responseLogin.societies)
      );
      // localStorage.setItem("codeuser", JSON.stringify(data.codeuser));
      navigate("/SocietiesList");
    }
  };

  useEffect(() => {
    toast("Date mise à jour 28/04/2025 16:65", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600"
      style={{
        backgroundImage: "url('/feuille.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="flex bg-white md:h-[600px] h-[55vh] bg-opacity-90 rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden">
        {" "}
        <div className="flex items-center justify-center w-1/2 bg-gradient-to-r from-blue-600 to-purple-700 p-6">
          <img
            src="/logo.png"
            alt="Logo"
            className="max-w-full h-[100vh] object-contain transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          {/* <img className="md:hidden" src="/logo.png" /> */}

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Connexion
          </h2>
          {/* {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">
               {error} 
            </div>
          )} */}
          <form onSubmit={(e) => hundleLogin(e)}>
            <div className="mb-6">
              <label
                htmlFor="nom"
                className="block text-gray-700 font-semibold mb-2"
              >
                Nom d'utilisateur
              </label>
              <input
                type="text"
                id="nom"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Entrez votre nom d'utilisateur"
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Entrez votre mot de passe"
                onChange={(e) => setMotpasse(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Se connecter
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              <Link
                to="/ResetPassword"
                className="text-blue-600 hover:text-blue-700 font-semibold underline"
              >
                Mot de passe oublié?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
