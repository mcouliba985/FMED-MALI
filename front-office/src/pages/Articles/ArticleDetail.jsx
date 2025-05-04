import CoverPageComponent from '../../components/main/cover-page-component';
import Main from '../../layouts/Main/Main';

const ArticleDetail = () => {
      const coverContent = {
            title: 'Article blog',
      };

      return (
            <Main>
                  <CoverPageComponent title={coverContent.title} showSection={coverContent.show} />
                  <section className="container py-8 lg:px-8">
                        <div className="row">
                              {/* Image + Date */}
                              <div className="col-12 col-md-9 col-lg-9 mb-4">
                                    <img
                                          className="w-100 h-auto max-h-[430px] lg:max-h-[600px] rounded-2xl object-cover"
                                          src="https://scontent-lhr6-2.xx.fbcdn.net/v/t39.30808-6/490070085_667650832621778_5464031922788881425_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=DP7GcIiMRGQQ7kNvwHdTkq4&_nc_oc=Adn5I9NGLeuGmN6Pj4FZWuMQ9YrYz82yGK0ZGhwuu0941J_j7QzcAUCcWcmWwzP-qlItb2XuQx_VtoFTZmBdC-XD&_nc_zt=23&_nc_ht=scontent-lhr6-2.xx&_nc_gid=DBEeFkTSq0RpgSWEIw_dEA&oh=00_AfFUsXfYnKCE9iRTPIyq-cdzINlVNFWRHNwYxD02_k-FqQ&oe=681AA431"
                                          alt="article img"
                                    />
                                    <h4 className="py-3 px-2 font-nunito font-bold text-base lg:text-lg">
                                          <i className="far fa-calendar-days text-gold me-2"></i>
                                          01 juin 2025
                                    </h4>
                              </div>

                              {/* Catégories */}
                              <div className="col-12 col-md-3 col-lg-3">
                                    <div className="p-4 bg-light rounded-2xl">
                                          <h2 className="font-nunito text-xl font-black mb-2">
                                                Catégories
                                          </h2>
                                          <ul className="d-flex flex-wrap flex-sm-column gap-2 px-2 px-sm-4 py-2">
                                                <li className="text-sm sm:text-base">Donation</li>
                                                <li className="text-sm sm:text-base">Donation</li>
                                                <li className="text-sm sm:text-base">Donation</li>
                                                <li className="text-sm sm:text-base">Donation</li>
                                                <li className="text-sm sm:text-base">Donation</li>
                                                <li className="text-sm sm:text-base">Donation</li>
                                          </ul>
                                    </div>
                              </div>
                        </div>

                        {/* Titre + texte */}
                        <div className="row mb-4">
                              <div className="col-12">
                                    <h2 className="font-nunito font-bold text-2xl sm:text-3xl lg:text-4xl mb-4 w-100 sm:w-2/3">
                                          Donner une bonne éducation aux enfants africains
                                    </h2>
                                    <p className="font-roboto text-justify text-base sm:text-lg lg:text-xl leading-7">
                                          La charité et le don sont des catégories qui impliquent un
                                          soutien financier Catégorie qui implique un soutien
                                          financier ou matériel à diverses causes d'organisations.
                                          Elle permet aux individus de s'adresser aux catégories
                                          sociales qui impliquent de soutenir financièrement ou
                                          matériellement diverses causes d'organisations. Il permet
                                          aux individus de s'adresser à la catégorie sociale Charité
                                          et dons est une catégorie qui implique un soutien
                                          financier Catégorie qui implique un soutien financier ou
                                          matériel à diverses causes d'organisations. Il permet aux
                                          individus de s'adresser à la catégorie sociale Charity And
                                          Donation Is A Categorys That Involves Giving Financial
                                          Category That Involves Giving Financial Or Material
                                          Support Various Causes Organizations. Il permet aux
                                          individus de s'adresser à la catégorie sociale Charity And
                                          Donation Is A Categorys That Involves Giving Financial
                                          Category That Involves Giving Financial Or Material
                                          Support Various Causes Organizations. Il permet aux
                                          individus de s'adresser à la catégorie sociale Charity And
                                          Donation Is A Categorys That Involves Giving Financial
                                          Category That Involves Giving Financial Or Material
                                          Support Various Causes Organizations.
                                    </p>
                              </div>
                        </div>

                        {/* Recent posts */}
                        <div className="row">
                              <h2 className="col-12 font-nunito font-bold text-2xl sm:text-3xl lg:text-4xl mb-4">
                                    Les recent posts
                              </h2>

                              {[...Array(4)].map((_, i) => (
                                    <div key={i} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                                          <div className="bg-light shadow-lg p-4 rounded-2xl h-100 d-flex flex-column">
                                                <img
                                                      className="w-100 h-64 rounded-2xl object-cover"
                                                      src="https://scontent-lhr6-1.xx.fbcdn.net/v/t39.30808-6/489464830_667649472621914_3156975079092902195_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=6C82uCu568kQ7kNvwG9Zmer&_nc_oc=AdmRIDPGEiVBrbbBq25GuHM0au8jpTkR-VoaOb68skq9rj5qUTsbqVW5ZYZnAMr686hq_RlgKvkhkIgR-w0DfqLz&_nc_zt=23&_nc_ht=scontent-lhr6-1.xx&_nc_gid=MEB8h7FiNYsdLp5J8UWl6Q&oh=00_AfHRnhnfVVT440gvcHQNC0zPSEFut1OzR7hd20WJhRr8ug&oe=681AC4E6"
                                                      alt="img recent article"
                                                />
                                                <h4 className="py-3 px-2 font-nunito font-bold text-sm lg:text-base">
                                                      <i className="far fa-calendar-days text-gold me-2"></i>
                                                      01 juin 2025
                                                </h4>
                                                <h2 className="font-bold font-poppins text-lg">
                                                      Études de cas sur les services
                                                      informatiques...
                                                </h2>
                                          </div>
                                    </div>
                              ))}
                        </div>
                  </section>
            </Main>
      );
};

export default ArticleDetail;
