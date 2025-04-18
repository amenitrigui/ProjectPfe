import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Imprimer() {
  const devisInfo = useSelector((state) => state.devisSlice.devisInfo);
  console.log(devisInfo);
  const totalPages = Math.ceil(devisInfo.articles.length / 10);
  console.log(totalPages);
  return (
    <div>
      <Link
        to="/DevisFormTout"
        className="text-[#2a2185] hover:text-[#1f1a66] px-6 py-2 rounded-lg focus:outline-none flex items-center"
      >
        ← Retour
      </Link>
      <div
        id="devis"
        className="p-6 bg-white rounded-lg shadow-lg max-w-screen-lg mx-auto"
      >
        {/* Header */}
        <div className="grid grid-cols-2 border-b border-[#2a2185] pb-4 mb-6">
          <div>
            <h1 className="text-[#2a2185] font-bold italic text-3xl">
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
            <h2 className="text-lg font-bold text-[#2a2185]">
              Devis/Facture Proforma
            </h2>
            <p>
              <strong>Numéro:</strong>
              {devisInfo.NUMBL}
              <br />
              <strong>Date:</strong> {devisInfo.DATEBL}
            </p>
          </div>
        </div>

        {/* Infos client */}
        <div className="grid grid-cols-2 gap-4 border-t border-[#2a2185] pt-4 mt-6">
          <div className="flex flex-col gap-2">
            <p className="border border-[#2a2185] p-2 text-sm">
              <strong>DATE:</strong> {devisInfo.DATEBL}
            </p>
            <p className="border border-[#2a2185] p-2 text-sm">
              <strong>CLIENT:</strong> {devisInfo.CODECLI}
            </p>
            <p className="border border-[#2a2185] p-2 text-sm">
              <strong>PAGE:</strong> {devisInfo.numPage / totalPages}
            </p>
            <p className="mt-4 text-sm text-gray-700">
              Monsieur / Madame, suite à votre demande, nous avons le plaisir de
              vous communiquer notre meilleure offre de prix pour :
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="border border-[#2a2185] p-2 text-sm">
              <strong>Raison Sociale:</strong> {devisInfo.RSCLI}
            </p>
            <p className="border border-[#2a2185] p-2 text-sm">
              <strong>Adresse:</strong> {devisInfo.ADRCLI}
            </p>
            <p className="border border-[#2a2185] p-2 text-sm">
              <strong>Code Postal:</strong> {devisInfo.cp}
            </p>
            <p className="border border-[#2a2185] p-2 text-sm">
              <strong>Email:</strong> {devisInfo.email}
            </p>
          </div>
        </div>

        {/* Tableau des articles */}
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
              {devisInfo.articles.map((ligne, index) => (
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

        {/* Totaux et conditions */}
        <div className="flex justify-between gap-6">
          {/* Bloc TVA */}
          <div className="w-1/3 p-4 rounded-lg border border-[#2a2185]">
            <table className="table-auto w-full border-collapse">
              <tbody>
                <tr>
                  <td className="border px-2 py-1">Taux TVA</td>
                  <td className="border px-2 py-1">
                    {devisInfo.articles.TauxTVA}
                  </td>
                </tr>
                <tr>
                  <td className="border px-2 py-1">Base</td>
                  <td className="border px-2 py-1">
                    {" "}
                    {devisInfo.articles
                      .reduce(
                        (acc, ligne) => acc + parseFloat(ligne.netHt || 0),
                        0
                      )
                      .toFixed(3)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-2 py-1">Montants</td>
                  <td className="border px-2 py-1"> {devisInfo.taxe || 0}</td>
                </tr>
                <tr>
                  <td className="border px-2 py-1 font-bold text-right">
                    Total Taxe
                  </td>
                  <td className="border px-2 py-1 font-bold">
                    {" "}
                    {devisInfo.taxe || 0}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-4 p-2 border border-[#2a2185] rounded-lg inline-block">
              <p className="text-right text-sm font-medium">
                Arrêter la présentation de devise à la somme :{" "}
                <span className="text-[#2a2185] font-semibold">Zéro dinar</span>
              </p>
            </div>
          </div>

          {/* Bloc Conditions */}
          <div className="w-1/3">
            <table className="table-auto w-full mt-4 border-collapse border border-[#2a2185]">
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    Délai de Livraison:
                  </td>
                  <td className="border px-4 py-2">{devisInfo.delailivr}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Transport:</td>
                  <td className="border px-4 py-2">{devisInfo.transport}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    Mode de Paiement:
                  </td>
                  <td className="border px-4 py-2">{devisInfo.modepaie}</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-4 p-4 border border-[#2a2185] rounded-lg">
              <h3 className="text-lg font-semibold text-[#2a2185]">
                Cachet & Signature
              </h3>
              <div className="h-16 border-dashed border-[#2a2185] flex justify-center items-center"></div>
            </div>
          </div>

          {/* Bloc Totaux */}
          <div className="w-1/3 p-4 rounded-lg border border-[#2a2185]">
            <table className="table-auto w-full text-sm border-collapse">
              <tbody>
                <tr>
                  <td className="border px-2 py-1 font-medium">Total HT:</td>
                  <td className="border px-2 py-1">{devisInfo.MHT}</td>
                </tr>
                <tr>
                  <td className="border px-2 py-1 font-medium">
                    Net HT Global:
                  </td>
                  <td className="border px-2 py-1">{devisInfo.MHT}</td>
                </tr>
                <tr>
                  <td className="border px-2 py-1 font-medium">Total TAXES:</td>
                  <td className="border px-2 py-1">{devisInfo.MTVA}</td>
                </tr>
                <tr>
                  <td className="border px-2 py-1 font-medium">MT T.T.C:</td>
                  <td className="border px-2 py-1">{devisInfo.MTTC}</td>
                </tr>
                <tr>
                  <td className="border px-2 py-1 font-medium">Timbre:</td>
                  <td className="border px-2 py-1">{devisInfo.TIMBRE}</td>
                </tr>
                <tr>
                  <td className="border px-2 py-1 font-medium">
                    Montant à Payer:
                  </td>
                  <td className="border px-2 py-1 font-bold">
                    {devisInfo.MTTC}
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <p className="mt-4 text-xs text-center text-gray-600">
                Espérons que notre offre trouve votre entière satisfaction,
                veuillez agréer, Monsieur/Madame, nos sentiments les plus
                distingués.
              </p>
            </div>
          </div>
        </div>

        {/* Bouton d'impression */}
        <div className="flex justify-center mt-6">
          <button
            type="button"
            className="text-white bg-[#2a2185] hover:bg-[#1f1a66] px-6 py-2 rounded-lg focus:outline-none"
            onClick={() => window.print()}
          >
            <span className="h-6 w-6 inline-block mr-2">🖨️</span>
            Imprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default Imprimer;
