import CoverPageComponent from './../../components/main/cover-page-component';
import domains from '../../datas/domain.json';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DomainDetail = () => {
      const coverContent = {
            title: 'Nos domaines',
            show: true,
            label: 'Decouvrez nos domaines d’interventions',
            hook: "Rejoignez notre programme de dons mensuels afin d'apporter un soutien constant à nos initiatives. Les contributions régulières, quel que soit leur montant, nous aident à planifier et à soutenir des projets à long terme.",
      };

      const [domain, setDomain] = useState({});
      const { key } = useParams();

      useEffect(() => {
            if (key && domains.length > 0) {
                  const matchedAbout = domains.find((item) => item.key === key);
                  setDomain(matchedAbout || {}); // met un objet vide si non trouvé
            }
      }, [key]); // Ne pas inclure `aboutInformation`, il est statique

      if (domain === undefined) return null;
      return (
            <section>
                  <CoverPageComponent
                        title={coverContent.title}
                        showSection={coverContent.show}
                        label={coverContent.label}
                        hook={coverContent.hook}
                  />
                  <section className="container my-5">
                        <section className="bg-gray-50 rounded-xl shadow-sm p-6 max-w-4xl mx-auto">
                              <h2 className="text-center text-2xl font-bold uppercase mb-4">
                                    {domain.hook}
                              </h2>
                              <p className="text-center text-gray-700 font-roboto text-xl leading-relaxed">
                                    {domain.content}
                              </p>
                        </section>
                  </section>
            </section>
      );
};

export default DomainDetail;
