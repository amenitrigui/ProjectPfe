import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedNom = nom.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (
      !trimmedNom ||
      !trimmedEmail ||
      !trimmedPassword ||
      !trimmedConfirmPassword
    ) {
      console.log("d");
      setError("Tg");
      return;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/utilisateurs/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // codeuser: "02",
            nom: trimmedNom,
            email: trimmedEmail,
            motpasse: trimmedPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        setError(
          data.message || "Erreur lors de l'inscription. Veuillez réessayer."
        );
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
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
            Inscription
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
                Nom
              </label>
              <input
                type="text"
                id="nom"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Entrez votre nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-semibold mb-2"
              >
                Confirmez le mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Confirmez votre mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              S'inscrire
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Vous avez déjà un compte ?{" "}
              <Link
                to="/"
                className="text-blue-600 hover:text-blue-700 font-semibold underline"
              >
                Connectez-vous
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
