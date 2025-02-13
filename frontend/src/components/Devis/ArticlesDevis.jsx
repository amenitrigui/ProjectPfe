import React from "react";

function ArticlesDevis(props) {
  const formData = props.formData;
  const lignesValidees = props.lignesValidees;
  const lignes = props.lignes;

  const calculerTaxe = () => {
    const taxe = parseFloat(formData.MTTC) - parseFloat(formData.totalHt);
    return isNaN(taxe) ? 0 : taxe.toFixed(3);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <div className="overflow-x-auto flex-grow">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Famille</th>
              <th className="border border-gray-300 p-2">Code Article</th>
              <th className="border border-gray-300 p-2">Libelle</th>
              <th className="border border-gray-300 p-2">Unité</th>
              <th className="border border-gray-300 p-2">Quantité</th>
              <th className="border border-gray-300 p-2">Remise</th>
              <th className="border border-gray-300 p-2">TVA</th>
              <th className="border border-gray-300 p-2">PUHT</th>
              <th className="border border-gray-300 p-2">PUTTC</th>
              <th className="border border-gray-300 p-2">NET HT</th>
            </tr>
          </thead>
          <tbody>
            {lignes.length > 0 &&
              lignes
                .filter((ligne) => ligne.QteART && ligne.PUART)
                .map((ligne, index) => {
                  const quantite = parseFloat(ligne.QteART) || 0;
                  const prix1 = parseFloat(ligne.PUART) || 0;
                  const remise = parseFloat(ligne.Remise) || 0;
                  const tauxtva = parseFloat(ligne.TauxTVA) || 0;

                  const netHt =
                    quantite && prix1
                      ? quantite * prix1 * (1 - remise / 100)
                      : 0;
                  const puttc =
                    prix1 && tauxtva ? prix1 * (1 + tauxtva / 100) : 0;

                  return (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">
                        {ligne.famille || ""}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {ligne.CodeART || ""}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {ligne.DesART || ""}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {ligne.Unite || ""}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {quantite || ""}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {remise !== 0 ? `${remise}%` : ""}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {tauxtva || ""}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {prix1 || ""}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {puttc || ""}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {netHt || ""}
                      </td>
                    </tr>
                  );
                })}
            {lignesValidees.length > 0 &&
              lignesValidees
                .filter((ligne) => ligne.nbrunite && ligne.prix1)
                .map((ligne, idx) => (
                  <tr key={idx} className="border-b hover:bg-indigo-100">
                    <td className="border border-gray-300 p-2">
                      {ligne.famille || ""}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {ligne.code || ""}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {ligne.libelle || ""}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {ligne.unite || ""}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {ligne.nbrunite || ""}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {ligne.Remise || "0"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {ligne.tauxtva || ""}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {ligne.prix1 || ""}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {ligne.puttc || ""}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {ligne.netHt || ""}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-300 p-4 sticky bottom-0 w-full">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[150px]">
            <label className="block font-medium font-bold">Montant HT :</label>

            <input
              type="text"
              name="totalHt"
              value={formData.totalHt}
              className="w-full border rounded-md p-2"
              readOnly
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block font-medium">Remise Totale :</label>
            <input
              type="text"
              name="Remise"
              value={formData.Remise}
              className="w-full border rounded-md p-2"
              readOnly
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block font-medium">Net HT Global :</label>
            <input
              type="text"
              name="netHtGlobal"
              value={formData.totalHt}
              className="w-full border rounded-md p-2"
              readOnly
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block font-medium">Taxe :</label>
            <input
              type="text"
              name="taxe"
              value={calculerTaxe()}
              className="w-full border rounded-md p-2"
              readOnly
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block font-medium">Montant TTC :</label>
            <input
              type="text"
              name="MTTC"
              value={formData.MTTC}
              className="w-full border rounded-md p-2"
              readOnly
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block font-medium">Timbre :</label>
            <input
              type="text"
              name="timbre"
              value={formData.timbre}
              className="w-full border rounded-md p-2"
              readOnly
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block font-medium">À Payer :</label>
            <input
              type="text"
              name="aPayer"
              value={formData.MTTC}
              className="w-full border rounded-md p-2"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticlesDevis;
