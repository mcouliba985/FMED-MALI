import { useParams } from 'react-router-dom';
import CoverPageComponent from '../../components/main/cover-page-component';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../../config/API_ENDPOINT';

const ArticleDetail = () => {
      const coverContent = {
            title: 'Article blog',
      };

      const { articleID } = useParams(); // ✅ extraction correcte
      const IDint = parseInt(articleID);
      const [article, setArticle] = useState({});
      const [recentArticle, setRecentArticle] = useState([]);

      useEffect(() => {
            if (!articleID) return; // ✅ évite le fetch si l'ID est manquant

            async function previewArticle() {
                  try {
                        const fetchRequest = await fetch(
                              `${API_ENDPOINTS.getArticles}/${articleID}`
                        );
                        const data = await fetchRequest.json();
                        setArticle(data);

                        console.log(data);
                  } catch (error) {
                        console.error('Erreur de chargement :', error);
                  }
            }

            previewArticle();
      }, [articleID]);

      useEffect(() => {
            async function artilces() {
                  try {
                        const fetchArticle = await fetch(API_ENDPOINTS.getPublishedArticles);
                        const responseData = await fetchArticle.json();
                        setRecentArticle(responseData);
                  } catch (error) {
                        console.log(error);
                  }
            }

            artilces();
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
                                          {new Date(article.createAt).toLocaleDateString('fr-FR', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                          })}
                                    </h4>
                              </div>

                              {/* Catégories */}
                              <div className="col-12 col-md-6 col-lg-4">
                                    <div className="p-4 bg-light rounded-2xl">
                                          <h2 className="font-nunito text-xl font-black mb-2">
                                                Fonsej actualite
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
                                          {article.title}
                                    </h2>
                                    <p className="mb-4 font-roboto text-justify text-base leading-7">
                                          {article.hook}
                                    </p>

                                    <p className="font-roboto text-justify text-base leading-7">
                                          {article.content}
                                    </p>
                              </div>
                        </div>

                        {/* Recent posts */}
                        <div className="row">
                              <h2 className="col-12 font-nunito font-bold text-2xl sm:text-3xl lg:text-4xl mb-4">
                                    Les recent posts
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
                                                            {new Date(
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
                                                            {recent.hook.slice(0, 35)} ...
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
