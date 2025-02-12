import React from 'react'
import {
    PrinterIcon,
  } from "@heroicons/react/20/solid";

function Devis(props) {
    const formData = props.formData;
    const formattedDate = props.formattedDate;
    const totalPages = Math.ceil(formData.lignes.length / 10);
    // * imprimer un devis
  const handlePrint = () => {
    const printContent = document.getElementById("devis");
    if (!printContent) {
        console.error("Aucun contenu à imprimer.");
        return;
    }

    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent.outerHTML;

    window.print();

    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  
  /**
   * Description
   * transformer un nombre comme suite: 158 -> cent cinquante huite
   * !does not work as intended past the 999 mark
   * @author Unknown
   * @date 2025-02-11
   * @param {any} number
   * @returns {any}
   */
  function numberToText(number) {
      if (number === undefined || number === null || isNaN(number)) {
        console.error("Valeur invalide pour numberToText:", number);
        return "Valeur invalide";
      }
  
      const units = [
        "",
        "un",
        "deux",
        "trois",
        "quatre",
        "cinq",
        "six",
        "sept",
        "huit",
        "neuf",
        "dix",
        "onze",
        "douze",
        "treize",
        "quatorze",
        "quinze",
        "seize",
        "dix-sept",
        "dix-huit",
        "dix-neuf",
        "vingt",
        "trente",
        "quarante",
        "cinquante",
        "soixante",
        "soixante-dix",
        "quatre-vingts",
        "quatre-vingt-dix",
      ];
      const tens = [
        "",
        "",
        "vingt",
        "trente",
        "quarante",
        "cinquante",
        "soixante",
        "septante",
        "huitante",
        "nonante",
      ];
  
      const convertPart = (num) => {
        if (num < 20) return units[num];
        else if (num < 100) {
          const ten = Math.floor(num / 10);
          const unit = num % 10;
          return `${tens[ten]}${unit ? "-" + units[unit] : ""}`;
        } else {
          return `${units[Math.floor(num / 100)]} cent${
            num % 100 !== 0 ? " " + convertPart(num % 100) : ""
          }`;
        }
      };
  
      const [intPart, decPart] = number.toString().split(".");
      const intText = convertPart(Number(intPart));
  
      if (decPart) {
        const decText = convertPart(Number(decPart));
        return `${intText} dinars et ${decText} millimes`;
      }
  
      return `${intText} dinars`;
    }
  
  return (
    <div>
          <div
            id="devis"
            className="p-6 bg-white rounded-lg shadow-lg max-w-screen-lg mx-auto"
          >
            <div className="grid grid-cols-2 border-b border-gray-300 pb-4 mb-6">
              <div>
                <h1 className="text-black font-bold italic text-3xl">
                  Ste Logicom - Progiciel de Gestion Intégrée ERP
                </h1>
                <p className="text-sm text-gray-600">
                  S.A.R.L au capital de 11.000 DT
                  <br />
                  BIAT HARZALLAH 08 700 00040 10 52971444
                  <br />
                  Tél/Fax: 74 400110 - 74 461010
                  <br />
                  RC: B141691998
                </p>
              </div>
              <div className="text-right">
                <h2 className="text-lg font-bold text-black">
                  Devis/Facture Proforma
                </h2>
                <p>
                  <strong>Numéro:</strong>
                  {formData.NUMBL}
                  <br />
                  <strong>Date:</strong> {formattedDate}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-gray-300 pt-4 mt-6">
              <div className="flex flex-col gap-2">
                <p className="border p-2 text-sm">
                  <strong>DATE:</strong> {formattedDate}
                </p>

                <p className="border p-2 text-sm">
                  <strong>CLIENT:</strong>
                  {formData.CODECLI}
                </p>
                <p className="border p-2 text-sm">
                  <strong>PAGE:</strong>
                  {formData.numPage}/{totalPages}
                </p>
                <p className="mt-4 text-sm text-gray-700">
                  Monsieur / Madame, suite à votre demande, nous avons le
                  plaisir de vous communiquer notre meilleure offre de prix pour
                  :
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="border p-2 text-sm">
                  <strong>Raison Sociale:</strong> {formData.RSCLI}
                </p>
                <p className="border p-2 text-sm">
                  <strong>Adresse:</strong> {formData.ADRCLI}
                </p>
                <p className="border p-2 text-sm">
                  <strong>Code Postal:</strong> {formData.cp}
                </p>
                <p className="border p-2 text-sm">
                  <strong>Email:</strong> {formData.email}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto mb-6">
              <table className="table-auto w-full border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    {[
                      "Famille",
                      "Code Article",
                      "Libellé",
                      "Unite",
                      "QteART",
                      "Nbr Unité",
                      "PU HT",
                      "Remise",
                      "TVA %",
                      "PU TTC",
                      "Net HT",
                    ].map((header) => (
                      <th
                        key={header}
                        className="border border-gray-300 px-2 py-1 text-left text-sm"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {formData.lignes.map((ligne, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="border border-gray-300 px-2 py-1 text-sm">
                        {ligne.famille}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-sm">
                        {ligne.CodeART}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-sm">
                        {ligne.DesART}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-sm">
                        {ligne.Unite}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-sm">
                        {ligne.QteART}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-sm">
                        {ligne.nbun}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-sm">
                        {ligne.PUART}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-sm">
                        {ligne.Remise}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-sm">
                        {ligne.TauxTVA}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-sm">
                        {ligne.puttc}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-sm">
                        {ligne.netHt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between gap-6">
              <div className="w-1/3 p-4  rounded-lg">
                <table className="table-auto w-full border-collapse">
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-2 py-1">
                        Taux TVA
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        {formData.lignes[0]?.tauxtva || 0}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-2 py-1">Base</td>
                      <td className="border border-gray-300 px-2 py-1">
                        {formData.lignes
                          .reduce(
                            (acc, ligne) => acc + parseFloat(ligne.netHt || 0),
                            0
                          )
                          .toFixed(3)}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-2 py-1">
                        Montants
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        {formData.taxe || 0}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-2 py-1 font-bold text-right">
                        Total Taxe
                      </td>
                      <td className="border border-gray-300 px-2 py-1 font-bold">
                        {formData.taxe || 0}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="mt-4 p-2 border border-gray-300 rounded-lg inline-block">
                  <p className="text-right text-sm font-medium">
                    Arrêter la présentation de devise à la somme:{" "}
                    <span className="text-black font-semibold">
                      {numberToText(formData.taxe)}
                    </span>
                  </p>
                </div>
              </div>

              <div className="w-1/3 prounded-lg">
                <table className="table-auto w-full mt-4 border-collapse">
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Délai de Livraison:
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {formData.delaiLivraison}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Transport:
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {formData.transport}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Mode de Paiement:
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {formData.modePaiement}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="mt-4 p-4 border border-gray-300 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Cachet & Signature
                  </h3>
                  <div className="h-16 border-dashed border-gray-500 flex justify-center items-center"></div>
                </div>
              </div>

              <div className="w-1/3 p-4  rounded-lg">
                <table className="table-auto w-full text-sm border-collapse">
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-2 py-1 font-medium">
                        Total HT:
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        {formData.totalHt}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-2 py-1 font-medium">
                        Net HT Global:
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        {formData.totalHt}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-2 py-1 font-medium">
                        Total TAXES:
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        {formData.taxe}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-2 py-1 font-medium">
                        MT T.T.C:
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        {formData.MTTC}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-2 py-1 font-medium">
                        Timbre:
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        {formData.timbre}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-2 py-1 font-medium">
                        Montant à Payer:
                      </td>
                      <td className="border border-gray-300 px-2 py-1 font-bold">
                        {formData.MTTC}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div>
                  <p className="fixed bottom-0 left-0 w-full text-center text-gray-600 text-xs">
                    Espérons que notre offre trouve votre entière satisfaction,
                    veuillez agréer, Monsieur/Madame, nos sentiments les plus
                    distingués.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg focus:outline-none"
                onClick={handlePrint}
              >
                <PrinterIcon className="h-6 w-6 inline-block mr-2" />
              </button>
            </div>
          </div>
        </div>
  )
}

export default Devis