import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignInPage() {
  const [nom, setNom] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedNom = nom.trim();
    const trimmedPassword = password.trim();

    if (!trimmedNom || !trimmedPassword) {
      setError("Tous les champs doivent être remplis");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

          nom: trimmedNom,
          motpasse: trimmedPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("societies", JSON.stringify(data.societies));
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/SocietiesList");
      } else {
        setError(data.message || "Erreur de connexion. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
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
            Connexion
          </h2>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
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
                value={nom}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              Vous n'avez pas de compte ?{" "}
              <Link
                to="/RegisterPage"
                className="text-blue-600 hover:text-blue-700 font-semibold underline"
              >
                Inscrivez-vous
              </Link>
            </p>
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