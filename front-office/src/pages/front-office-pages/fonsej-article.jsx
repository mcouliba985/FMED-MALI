import { useEffect, useState } from 'react';
import CoverPageComponent from '../../components/main/cover-page-component';
import { useTranslation } from 'react-i18next';
import { API_ENDPOINTS } from '../../config/API_ENDPOINT';

const FonsejArticle = () => {
      const [articleData, setArticleData] = useState([]);
      const { t, i18n } = useTranslation();

      useEffect(() => {
            async function fetchArticles() {
                  try {
                        const res = await fetch(API_ENDPOINTS.getArticlesfonsej);
                        if (!res.ok) {
                              console.error(
                                    'Erreur HTTP lors du chargement des articles :',
                                    res.status
                              );
                              return;
                        }
                        const data = await res.json();
                        if (Array.isArray(data)) {
                              setArticleData(data);
                        } else {
                              console.warn('Format inattendu reçu pour les articles :', data);
                        }
                  } catch (error) {
                        console.error('Erreur lors de la récupération des articles :', error);
                  }
            }
            fetchArticles();
      }, []);

      if (!articleData || articleData.length === 0) return null;

      const coverContent = {
            title: t('fonsejB'),
            show: true,
            label: t('fonsejT'),
            hook: t('fonsejH'),
      };
      return (
            <section>
                  <section>
                        <CoverPageComponent
                              title={coverContent.title}
                              showSection={coverContent.show}
                              label={coverContent.label}
                              hook={coverContent.hook}
                        />

                        <section className="container px-8">
                              <div className="row mb-4">
                                    {articleData.map((article) => (
                                          <div
                                                key={article.id}
                                                className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4"
                                          >
                                                <div className="bg-light shadow-lg p-4 rounded-2xl h-100 d-flex flex-column">
                                                      <img
                                                            className="w-100 h-64 rounded-2xl object-cover"
                                                            src={article.imagePath}
                                                            alt={
                                                                  article.title?.[i18n.language] ||
                                                                  ''
                                                            }
                                                      />
                                                      <h4 className="py-3 px-2 font-nunito font-bold text-sm lg:text-base">
                                                            <i className="far fa-calendar-days text-gold me-2"></i>
                                                            {new Date(
                                                                  article.createAt
                                                            ).toLocaleDateString(i18n.language, {
                                                                  year: 'numeric',
                                                                  month: 'long',
                                                                  day: 'numeric',
                                                            })}
                                                      </h4>
                                                      <a
                                                            href={`/article/${article.id}`}
                                                            className="font-bold font-poppins text-lg"
                                                      >
                                                            {article.title?.[i18n.language] || ''}
                                                      </a>
                                                      <p className="text-sm mt-2 text-muted">
                                                            {article.hook?.[i18n.language] || ''}
                                                      </p>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </section>
                  </section>
            </section>
      );
};

export default FonsejArticle;
