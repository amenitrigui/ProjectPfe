import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("L'email est requise pour réinitialiser le mot de passe");
      return;
    }

    console.log(trimmedEmail);

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/users/passwordResetRequest`, {
        email: trimmedEmail,
      })
      .then((response) => {
        console.log(response);
        setError("");
        setEmailSent(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.message);
      });
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
          {emailSent && (
            <div className="bg-blue-100 text-black-700 p-3 rounded-lg mb-4 text-center">
              Un Email avec les instructions de réinitialisation de mot de passe
              a été envoyé à votre email
            </div>
          )}

          {!emailSent && (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <p className="justify-center">
                  Saisissez votre numéro de téléphone ou votre adresse
                  électronique et nous vous enverrons les instructions pour
                  réinitialiser votre mot de passe.
                </p>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                Continuer
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
