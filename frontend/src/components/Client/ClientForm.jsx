import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fillClientInfos } from "../../app/client/clientSlice";

function ClientForm(props) {
  const clientInfos = useSelector((state)=>state.client.clientInfos);
  const clientList = useSelector((state) => state.client.clientList);
  const dispatch = useDispatch();
  // * mettre à jour les valeurs
  // * des champs du formulaire client / devis
  const handleChange = (e, field) => {
    dispatch(fillClientInfos({field, value: e.target.value}))
  }
  
  // * useEffect #1 : Si une opération est effectué (insert, update, delete)
  // * indiqué par la mutation de operationEffectue
  // * vider les champs text

  useEffect(() => {
    
  }, [])

  return (
    
    <div className="p-6 border border-gray-300 rounded-lg shadow-md bg-white">
      
      <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
        <span className="text-black">&#x1F464;</span>
        <span>Information Client</span>
      </h3>

      <form className="grid grid-cols-2 gap-4 items-center">
        <div>
          <label className="block font-medium mb-1">Code Client :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => handleChange(e,"code")}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Raison Sociale :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => handleChange(e,"rsoc")}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Adresse :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => handleChange(e,"adresse")}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Code Postal :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => handleChange(e,"cp")}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email :</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => handleChange(e,"email")}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Téléphone :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => handleChange(e,"telephone")}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Représentant :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => handleChange(e,"desrep")}
          />
        </div>
      </form>
    </div>
  );
}

export default ClientForm;
