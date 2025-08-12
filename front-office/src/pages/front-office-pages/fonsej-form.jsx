import CoverPageComponent from '../../components/main/cover-page-component';
import PosterTwo from '../../assets/res/poster-two.png';
import AideForm from '../../components/main/aide-form';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../../config/API_ENDPOINT';
import { useTranslation } from 'react-i18next';

const FonsejForm = () => {
      const { t } = useTranslation('');

      const coverContent = {
            title: t('fonsej.cover.title'),
            show: true,
            label: t('fonsej.cover.label'),
            hook: t('fonsej.cover.hook'),
      };

      const [article, setArticle] = useState([]);

      useEffect(() => {
            async function fetchArticles() {
                  try {
                        const fetchArticle = await fetch(API_ENDPOINTS.getPublishedArticles);

                        if (!fetchArticle.ok) {
                              console.error(
                                    'Erreur HTTP lors du chargement des articles :',
                                    fetchArticle.status
                              );
                              return;
                        }

                        const response = await fetchArticle.json();

                        if (Array.isArray(response)) {
                              setArticle(response);
                        } else {
                              console.warn('Format inattendu reçu pour les articles :', response);
                        }
                  } catch (error) {
                        console.error('Erreur lors de la récupération des articles :', error);
                  }
            }

            fetchArticles();
      }, []);

      return (
            <section>
                  <CoverPageComponent
                        className="mb-4"
                        title={coverContent.title}
                        showSection={coverContent.show}
                        label={coverContent.label}
                        hook={coverContent.hook}
                  />

                  <section className="container">
                        <div className="row mb-4">
                              <div className="col-12 col-lg-8 relative">
                                    <div>
                                          <img src={PosterTwo} alt="poster-two" />
                                    </div>
                                    <div className="relative md:bottom-32">
                                          <AideForm />
                                    </div>
                              </div>

                              <div className="col-12 col-lg-4">
                                    <div className="p-4 bg-light rounded-2xl">
                                          <h2 className="font-nunito text-xl font-black mb-2">
                                                {t('fonsej.sidebar.latestNews')}
                                          </h2>
                                          <div className="d-flex flex-wrap flex-sm-column gap-2 px-2 px-sm-4 py-2">
                                                {article.slice(0, 5).map((article) => (
                                                      <div
                                                            key={article.id}
                                                            className="flex gap-4 mb-4"
                                                      >
                                                            <div>
                                                                  <img
                                                                        className="rounded-lg w-28 h-20"
                                                                        src={article.imagePath}
                                                                        alt={article.imageName}
                                                                  />
                                                            </div>

                                                            <div className="block">
                                                                  <div className="font-nunito mb-2 text-sm">
                                                                        <i className="fas fa-calendar-days me-2"></i>
                                                                        {new Date(
                                                                              article.createAt
                                                                        ).toLocaleDateString(
                                                                              'fr-FR',
                                                                              {
                                                                                    day: '2-digit',
                                                                                    month: 'long',
                                                                                    year: 'numeric',
                                                                              }
                                                                        )}
                                                                  </div>

                                                                  <div className="font-poppins">
                                                                        {article.title.slice(0, 35)}
                                                                        ...
                                                                  </div>
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>
            </section>
      );
};

export default FonsejForm;
