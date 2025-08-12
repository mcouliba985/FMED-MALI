import { useParams } from 'react-router-dom';
import CoverPageComponent from '../../components/main/cover-page-component';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../../config/API_ENDPOINT';
import { useTranslation } from 'react-i18next';

const ArticleDetail = () => {
      const coverContent = {
            title: 'Article blog',
      };

      const { i18n } = useTranslation(); // pour savoir la langue active
      const currentLang = i18n.language || 'fr';

      const { articleID } = useParams();
      const IDint = parseInt(articleID);
      const [article, setArticle] = useState({});
      const [recentArticle, setRecentArticle] = useState([]);

      useEffect(() => {
            if (!articleID) return;

            async function previewArticle() {
                  try {
                        const fetchRequest = await fetch(
                              `${API_ENDPOINTS.getArticles}/${articleID}`
                        );
                        const data = await fetchRequest.json();
                        setArticle(data);
                  } catch (error) {
                        console.error('Erreur de chargement :', error);
                  }
            }

            previewArticle();
      }, [articleID]);

      useEffect(() => {
            async function articles() {
                  try {
                        const fetchArticle = await fetch(API_ENDPOINTS.getPublishedArticles);
                        const responseData = await fetchArticle.json();
                        setRecentArticle(responseData);
                  } catch (error) {
                        console.log(error);
                  }
            }

            articles();
      }, []);

      return (
            <section>
                  <CoverPageComponent title={coverContent.title} showSection={coverContent.show} />
                  <section className="container py-8 lg:px-8">
                        <div className="row">
                              {/* Image + Date */}
                              <div className="col-12 col-md-6 col-lg-8 mb-4">
                                    <img
                                          className="w-100 h-auto max-h-[430px] rounded-2xl object-cover"
                                          src={article.imagePath}
                                          alt={article.imageName}
                                    />
                                    <h4 className="py-3 px-2 font-nunito font-bold text-base lg:text-lg">
                                          <i className="far fa-calendar-days text-gold me-2"></i>
                                          {article.createAt &&
                                                new Date(article.createAt).toLocaleDateString(
                                                      'fr-FR',
                                                      {
                                                            day: '2-digit',
                                                            month: 'long',
                                                            year: 'numeric',
                                                      }
                                                )}
                                    </h4>
                              </div>

                              {/* Catégories (placeholder pour l’instant) */}
                              <div className="col-12 col-md-6 col-lg-4">
                                    <div className="p-4 bg-light rounded-2xl">
                                          <h2 className="font-nunito text-xl font-black mb-2">
                                                Fonsej actualité
                                          </h2>
                                          {[...Array(3)].map((_, i) => (
                                                <div key={i} className="flex gap-4 mb-4">
                                                      <div>
                                                            <img
                                                                  className="rounded-lg w-24 h-24"
                                                                  src="https://wowtheme7.com/tf/charifund/charifund/assets/images/blog/ph-one.png"
                                                                  alt="text"
                                                            />
                                                      </div>

                                                      <div className="block">
                                                            <div className="font-nunito mb-2 text-sm">
                                                                  <i className="fas fa-calendar-days me-2"></i>
                                                                  10 Nov 2025
                                                            </div>

                                                            <div className="font-poppins">
                                                                  Études de cas sur les services.
                                                            </div>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </div>

                        {/* Titre + texte */}
                        <div className="row mb-4">
                              <div className="col-12">
                                    <h2 className="font-nunito font-bold text-2xl sm:text-3xl lg:text-4xl mb-4 w-100 sm:w-2/3">
                                          {article.title?.[currentLang]}
                                    </h2>
                                    <p className="mb-4 font-roboto text-justify text-base leading-7">
                                          {article.hook?.[currentLang]}
                                    </p>

                                    <p className="font-roboto text-justify text-base leading-7">
                                          {article.content?.[currentLang]}
                                    </p>
                              </div>
                        </div>

                        {/* Recent posts */}
                        <div className="row">
                              <h2 className="col-12 font-nunito font-bold text-2xl sm:text-3xl lg:text-4xl mb-4">
                                    Les récents posts
                              </h2>

                              {recentArticle
                                    .filter((recent) => recent.id !== IDint)
                                    .slice(0, 4)
                                    .map((recent) => (
                                          <div
                                                key={recent.id}
                                                className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4"
                                          >
                                                <div className="bg-light shadow-lg p-4 rounded-2xl h-100 d-flex flex-column">
                                                      <img
                                                            className="w-100 h-64 rounded-2xl object-cover"
                                                            src={recent.imagePath}
                                                            alt={recent.imageName}
                                                      />
                                                      <h4 className="py-3 px-2 font-nunito font-bold text-sm lg:text-base">
                                                            <i className="far fa-calendar-days text-gold me-2"></i>
                                                            {recent.createAt &&
                                                                  new Date(
                                                                        recent.createAt
                                                                  ).toLocaleDateString('fr-FR', {
                                                                        day: '2-digit',
                                                                        month: 'long',
                                                                        year: 'numeric',
                                                                  })}
                                                      </h4>
                                                      <a
                                                            href={`/article/${recent.id}`}
                                                            className="font-bold font-poppins text-lg hover:text-gold"
                                                      >
                                                            {recent.hook?.[currentLang]?.slice(
                                                                  0,
                                                                  35
                                                            )}{' '}
                                                            ...
                                                      </a>
                                                </div>
                                          </div>
                                    ))}
                        </div>
                  </section>
            </section>
      );
};

export default ArticleDetail;
