import Select from 'react-select';
import {
    CheckIcon,
    PencilIcon,
    PrinterIcon,
    TrashIcon,
  } from "@heroicons/react/20/solid";

function ArticlesDevis() {
    return (
        <div className="space-y-4 p-4 border rounded-md mt-4">

            <div className="space-y-4 p-4 border rounded-md mt-4">
                <h3 className="text-lg font-bold">Articles</h3>

                <div className="grid grid-cols-6 gap-4 items-center">
                    <div>
                        <label className="block font-medium">FAMILLE</label>
                        <Select
                            isClearable



                            placeholder="Sélectionner ou taper une famille"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">CODE ARTICLE</label>
                        <input
                            type="text"
                            placeholder="Sélectionner un code article"


                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"

                        />
                    </div>
                    <div>
                        <label className="block font-medium">LIBELLE</label>
                        <input
                            type="text"
                            placeholder="Sélectionner un code article"


                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"

                        />
                    </div>

                    <div>
                        <label className="block font-medium">UNITE</label>
                        <input
                            type="text"
                            placeholder="Sélectionner un code article"


                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"

                        />
                    </div>

                    <div>
                        <label className="block font-medium">QUANTITE</label>
                        <input
                            type="text"
                            placeholder="Sélectionner un code article"


                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"

                        />
                    </div>

                    <div>
                        <label className="block font-medium">CONFIG</label>
                        <input
                            type="text"
                            placeholder="Sélectionner un code article"


                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"

                        />
                    </div>




                </div>

            </div>
            <div className="grid grid-cols-6 gap-4 items-center">
                    <div>
                      <label className="block font-medium">REMISE</label>
                      <input
                        type="text"
                        step="0.001"
                        placeholder="Remise"
                       
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block font-medium">T.V.A</label>
                      <input
                        type="text"
                        placeholder="tauxtva"
                        
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block font-medium">P.U.T.T.C</label>
                      <input
                        type="text"
                        step="0.001"
                        placeholder="puttc"
                        
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block font-medium">MT NET H.T</label>
                      <input
                        type="text"
                        placeholder="netHt"
                       
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block font-medium">Nbr/Uté </label>

                      <input
                        type="text"
                        placeholder="nbrunite"
                        
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label className="block font-medium">P.U.H.T</label>
                        <input
                          type="text"
                          step="0.001"
                          placeholder="prix1"
                          
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div className="flex-1">
                        <label className="block font-medium">Collisage</label>
                        <input
                          type="text"
                          placeholder=""
                         
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-2 justify-end">
                    <button
                     
                      className="text-green-500 p-2 border rounded-lg hover:bg-green-100"
                      title="Valider"
                    >
                      <CheckIcon className="h-6 w-6" />
                    </button>

                    <button
                     
                      className="text-blue-500 p-2 border rounded-lg hover:bg-blue-100"
                      title="Modifier"
                    >
                      <PencilIcon className="h-6 w-6" />
                    </button>


                    <button
                    
                      className="text-red-500 p-2 border rounded-lg hover:bg-red-100"
                      title="Supprimer"
                    >
                      <TrashIcon className="h-6 w-6" />
                    </button>
                  </div>

            
            </div>
           
           
            <div className="bg-gray-300 p-4 sticky bottom-0 w-full">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[150px]">
                  <label className="block  font-bold">
                    Montant HT :
                  </label>

                  <input
                    type="text"
                    name="totalHt"
                  
                    className="w-full border rounded-md p-2"
                    readOnly
                  />
                </div>
                <div className="flex-1 min-w-[150px]">
                  <label className="block font-medium">Remise Totale :</label>
                  <input
                    type="text"
                    name="Remise"
                  
                    className="w-full border rounded-md p-2"
                    readOnly
                  />
                </div>
                <div className="flex-1 min-w-[150px]">
                  <label className="block font-medium">Net HT Global :</label>
                  <input
                    type="text"
                    name="netHtGlobal"
                   
                    className="w-full border rounded-md p-2"
                    readOnly
                  />
                </div>
                <div className="flex-1 min-w-[150px]">
                  <label className="block font-medium">Taxe :</label>
                  <input
                    type="text"
                    name="taxe"
                   
                    className="w-full border rounded-md p-2"
                    readOnly
                  />
                </div>
                <div className="flex-1 min-w-[150px]">
                  <label className="block font-medium">Montant TTC :</label>
                  <input
                    type="text"
                    name="MTTC"
                  
                    className="w-full border rounded-md p-2"
                    readOnly
                  />
                </div>
                <div className="flex-1 min-w-[150px]">
                  <label className="block font-medium">Timbre :</label>
                  <input
                    type="text"
                    name="timbre"
                   
                    className="w-full border rounded-md p-2"
                    readOnly
                  />
                </div>
                <div className="flex-1 min-w-[150px]">
                  <label className="block font-medium">À Payer :</label>
                  <input
                    type="text"
                    name="aPayer"
                   
                    className="w-full border rounded-md p-2"
                    readOnly
                  />
                </div>
              </div>
            </div>

        </div>


    )
}

export default ArticlesDevis;
