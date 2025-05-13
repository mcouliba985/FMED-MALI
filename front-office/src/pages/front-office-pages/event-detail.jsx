import CoverPageComponent from '../../components/main/cover-page-component';
import GoogleMapComponent from './../../components/main/google-map-component';

const EventDetail = () => {
      const coverContent = {
            title: 'Evénements blog',
      };

      return (
            <section>
                  <CoverPageComponent title={coverContent.title} />
                  <section className="container py-8 lg:px-8">
                        <div className="row">
                              {/* Image + Date */}
                              <div className="col-12 col-md-9 col-lg-8 mb-4">
                                    <img
                                          className="w-100 h-auto max-h-[430px] lg:max-h-[600px] rounded-2xl object-cover"
                                          src="https://scontent-lhr6-2.xx.fbcdn.net/v/t39.30808-6/490070085_667650832621778_5464031922788881425_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=DP7GcIiMRGQQ7kNvwHdTkq4&_nc_oc=Adn5I9NGLeuGmN6Pj4FZWuMQ9YrYz82yGK0ZGhwuu0941J_j7QzcAUCcWcmWwzP-qlItb2XuQx_VtoFTZmBdC-XD&_nc_zt=23&_nc_ht=scontent-lhr6-2.xx&_nc_gid=DBEeFkTSq0RpgSWEIw_dEA&oh=00_AfFUsXfYnKCE9iRTPIyq-cdzINlVNFWRHNwYxD02_k-FqQ&oe=681AA431"
                                          alt="article img"
                                    />
                                    <div className="flex gap-4 py-3 px-2 ">
                                          <h4 className="font-nunito font-bold text-sm lg:text-base">
                                                <i className="far fa-calendar-days text-gold me-2"></i>
                                                01 juin 2025
                                          </h4>
                                          <h4 className="font-nunito font-bold text-sm lg:text-base">
                                                <i className="fas fa-location-dot text-gold me-2"></i>
                                                Kati, Hamdallaye Aci
                                          </h4>
                                    </div>
                              </div>

                              {/* Catégories */}
                              <div className="col-12 col-md-3 col-lg-4">
                                    <div className="p-4 bg-light rounded-2xl">
                                          <h2 className="font-nunito text-xl font-black mb-2">
                                                Programme de l’événements
                                          </h2>
                                          <ol className="d-flex flex-wrap flex-sm-column gap-2 px-2 px-sm-4 py-2 list-decimal list-inside">
                                                <li className="text-sm sm:text-base">
                                                      Charity and Donation is a category that
                                                      involves
                                                </li>
                                                <li className="text-sm sm:text-base">
                                                      Giving financial or material support to
                                                      various causes and organizations.
                                                </li>
                                                <li className="text-sm sm:text-base">
                                                      It allows individuals to contribute toward
                                                      addressing social issues by supporting various
                                                      causes or organizations.
                                                </li>
                                                <li className="text-sm sm:text-base">
                                                      It enables individuals to take part in social
                                                      change.
                                                </li>
                                          </ol>
                                    </div>
                              </div>
                        </div>

                        {/* Titre + texte */}
                        <div className="row mb-4">
                              <div className="col-12">
                                    <h2 className="font-nunito font-bold text-2xl sm:text-3xl lg:text-4xl mb-4 w-100 sm:w-2/3">
                                          Donner une bonne éducation aux enfants africains
                                    </h2>
                                    <p className="font-roboto text-justify text-base sm:text-lg lg:text-base leading-7">
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
                                    Localisations du lieu
                              </h2>

                              <div className="max-h-96">
                                    <GoogleMapComponent className="h-full" />
                              </div>
                        </div>
                  </section>
            </section>
      );
};

export default EventDetail;
