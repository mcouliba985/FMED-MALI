import React from 'react';
import OverlayBlocker from '../../../components/main/overlay-blocked';

const PaymentRegister = () => {
      const transactions = [
            {
                  id: 1,
                  prenom: 'Mohamed',
                  nom: 'Coulibaly',
                  tel: '+223 73 64 42 41',
                  montant: '100 000 FCFA',
                  payment: 'orange money',
                  date: '01/05/2025',
            },
            // Tu peux ajouter d'autres entrées ici
      ];

      return (
            <div>
                  <div className="bg-white p-6 rounded-xl w-full max-w-4xl">
                        <h2 className="text-xl font-semibold mb-1">Registre de payement</h2>
                        <p className="text-gray-600 mb-4">
                              Consultez ici toutes les informations relatives aux transactions du
                              mois ainsi que le bilan global des dons enregistrés.
                        </p>

                        <div className="flex gap-4 mb-6">
                              <div className="bg-gray-200 text-center rounded-lg px-6 py-4 text-lg font-semibold">
                                    JUIN : 1 500 000 FCFA
                              </div>
                              <div className="bg-gray-200 text-center rounded-lg px-6 py-4 text-lg font-semibold">
                                    25 000 000 FCFA
                              </div>
                        </div>

                        <h3 className="font-bold mb-2">Transactions precedent</h3>

                        <div className="overflow-x-auto">
                              <table className="min-w-full border border-gray-300 text-sm">
                                    <thead className="bg-gray-100">
                                          <tr>
                                                <th className="border px-4 py-2">N°</th>
                                                <th className="border px-4 py-2">prenom</th>
                                                <th className="border px-4 py-2">nom</th>
                                                <th className="border px-4 py-2">Tel</th>
                                                <th className="border px-4 py-2">montant</th>
                                                <th className="border px-4 py-2">payment</th>
                                                <th className="border px-4 py-2">date</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {transactions.map((t, i) => (
                                                <tr key={t.id} className="text-center">
                                                      <td className="border px-4 py-2">{i + 1}</td>
                                                      <td className="border px-4 py-2">
                                                            {t.prenom}
                                                      </td>
                                                      <td className="border px-4 py-2">{t.nom}</td>
                                                      <td className="border px-4 py-2">{t.tel}</td>
                                                      <td className="border px-4 py-2">
                                                            {t.montant}
                                                      </td>
                                                      <td className="border px-4 py-2">
                                                            {t.payment}
                                                      </td>
                                                      <td className="border px-4 py-2">{t.date}</td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </div>
                  </div>

                  <OverlayBlocker />
            </div>
      );
};

export default PaymentRegister;
