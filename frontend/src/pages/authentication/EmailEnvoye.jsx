import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmailEnvoye() {
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const [Nvpassword, setNvpassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (!token) {
      setError("l'utilisateur n'est pas authentifié");
      return;
    }
    const trimedpassword = password.trim();
    const trimedNVpassword = password.trim();
    if (trimedpassword == trimedNVpassword) {
      axios
        .put(
          `${process.env.REACT_APP_API_URL.replace(/\/$/, '')}/api/utilisateurs/reinitialiserMotPasse`,
          { email: user.email, password: trimedpassword, token: token },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    navigate("/");
  };

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
      <div className="flex bg-white bg-opacity-90 rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden">
        <div className="hidden md:flex items-center justify-center w-1/2 bg-gradient-to-r from-blue-600 to-purple-700 p-6">
          <img
            src="/logo.png"
            alt="Logo"
            className="max-w-full h-auto object-contain transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Réinitialiser votre mot de passe
          </h2>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <p className="text-center">
                Saisissez un nouveau mot de passe ci-dessous pour modifier votre
                mot de passe.
              </p>

              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              ></label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="nouveau mot passe "
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
              <div className="mt-4"></div>

              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Saisir a nouveau le nouveau mot passe "
                value={Nvpassword}
                onChange={(e) => setNvpassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Réinisialiser le mot passe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmailEnvoye;
