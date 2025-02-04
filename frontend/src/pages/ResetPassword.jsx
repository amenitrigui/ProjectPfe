import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
    const [email, setEmail] = useState("");
    const [trimmedEmail, setTrimmedEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!trimmedEmail) {
            setError("le champ email est requise");
            return;
        }

        const userExists = axios.get("");

        //     try {
        //         const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/register`, {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //             body: JSON.stringify({
        //                 codeuser: "02",
        //                 nom: trimmedNom,
        //                 email: trimmedEmail,
        //                 motpasse: trimmedPassword,
        //             }),
        //         });

        //         const data = await response.json();

        //         if (response.ok) {
        //             localStorage.setItem("token", data.token);
        //             localStorage.setItem("user", JSON.stringify(data.user));
        //             navigate("/SocietiesList");
        //         } else {
        //             setError(data.message || "Erreur lors de l'inscription. Veuillez réessayer.");
        //         }
        //     } catch (error) {
        //         console.error("Erreur lors de l'inscription:", error);
        //         setError("Une erreur est survenue. Veuillez réessayer.");
        //     }
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
                    
                    <form onSubmit={handleSubmit}>

                        <div className="mb-6">
                            <p className="justify-center">
                            Saisissez votre numéro de téléphone ou votre adresse électronique et nous vous enverrons les instructions pour réinitialiser votre mot de passe.
                            </p>
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

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                        >
                            Continuer
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;