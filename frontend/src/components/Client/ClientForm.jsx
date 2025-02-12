import React, { useState } from "react";
import axios from "axios";

function ClientForm(props) {
  const [code, setCode] = useState("");
  const [rsoc, setRsoc] = useState("");
  const [adresse, setAdresse] = useState("");
  const [cp, setCp] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [desRep, setDesRep] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dbName = localStorage.getItem("selectedDatabase");

    try {
      await fetch(
        `${process.env.REACT_APP_API_URL}/api/client/${dbName}/AjouterClient`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            rsoc,
            adresse,
            cp,
            email,
            telephone,
            desrep: desRep,
          }),
        }
      );

      // Récupérer la liste des clients après l'ajout
      const res = await axios.get(
        `http://localhost:5000/api/client/${dbName}/ListeClient`
      );
      props.ClientAjoute(res.data.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout du client :", error);
    }
  };

  return (
    <div className="p-6 border border-gray-300 rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
        <span className="text-black">&#x1F464;</span>
        <span>Information Client</span>
      </h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 items-center">
        {/* Première colonne */}
        <div>
          <label className="block font-medium mb-1">Code Client :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Raison Sociale :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => setRsoc(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Adresse :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => setAdresse(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Code Postal :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => setCp(e.target.value)}
          />
        </div>

        {/* Deuxième colonne */}
        <div>
          <label className="block font-medium mb-1">Email :</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Téléphone :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Représentant :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => setDesRep(e.target.value)}
          />
        </div>

        {/* Bouton à droite */}
        <div className="col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  );
}

export default ClientForm;
