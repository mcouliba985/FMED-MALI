import videoCouverture from '../../assets/images/H3.jpg';
import line from '../../assets/icons/line.png';
import SIMG3 from '../../assets/icons/s-img (3).png';
import don from '../../assets/icons/dons.png';
import don2 from '../../assets/icons/don2.png';
import check from '../../assets/icons/check.png';

const VideoComponent = () => {
      return (
            <section className="container">
                  <div className="row">
                        <div className="col-12 col-lg-5">
                              <div>
                                    <img src={line} alt="line" className="mb-4" />
                              </div>
                              <div className="relative w-full h-64 md:h-[32rem] lg:h-[660px]">
                                    {/* Image */}
                                    <img
                                          src={videoCouverture}
                                          className="w-full h-full rounded-2xl object-cover"
                                          alt="video couverture"
                                    />

                                    {/* Overlay sombre */}
                                    <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>

                                    {/* Bouton Play */}
                                    <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-lg">
                                          <i className="fas fa-play"></i>
                                    </button>
                              </div>
                        </div>
                        <div className="col-12 col-lg-7 px-4">
                              <div>
                                    <h2 className="font-poppins font-bold text-2xl md:text-4xl leading-[normal] mb-4 w-full pt-10 ">
                                          Aider nous à rendre heureuse les démunis
                                    </h2>
                                    <p className="font-roboto text-base">
                                          Le bénévolat offre la possibilité de développer de
                                          nouvelles compétences et d'acquérir une expérience
                                          précieuse. Il peut s'agir de compétences en matière de
                                          leadership, de communication, de gestion de projet et de
                                          travail d'équipe.
                                    </p>

                                    <div className="flex flex-col md:flex-row mt-3 gap-4">
                                          <div className="flex flex-row gap-2">
                                                <div>
                                                      <img
                                                            className="w-24"
                                                            src={SIMG3}
                                                            alt="s1112"
                                                      />
                                                </div>

                                                <div className="font-roboto ">
                                                      <h3 className="font-bold">
                                                            Commencer à les aider
                                                      </h3>
                                                      <p>
                                                            Sensibilisation à la mission et à la
                                                            cause de l'organisation caritative.
                                                      </p>
                                                </div>
                                          </div>

                                          <div className="flex flex-row gap-2">
                                                <div>
                                                      <img
                                                            className="w-[50px] md:w-[96px]"
                                                            src={don}
                                                            alt="faire un don"
                                                      />
                                                </div>

                                                <div className="font-roboto ">
                                                      <h3 className="font-bold">Faire des dons</h3>
                                                      <p>Aidez-nous à aider nos compatriotes.</p>
                                                </div>
                                          </div>
                                    </div>
                              </div>

                              <div className="mt-4 flex gap-4">
                                    <div>
                                          <img
                                                className="w-[128px] md:w-24"
                                                src={don2}
                                                alt="sdonss2"
                                          />
                                    </div>

                                    <div className="font-roboto ">
                                          <h3 className="font-bold border-b-2 border-black text-2xl">
                                                3 Raisons de faire les{' '}
                                                <span className="text-gold">dons</span> à la FMED
                                          </h3>

                                          <ul className="flex flex-col mt-4 gap-6">
                                                {/* Item 1 */}
                                                <li className="flex items-center gap-3">
                                                      <img
                                                            src={check}
                                                            alt="check"
                                                            className="w-8"
                                                      />
                                                      <span className="text-base md:text-lg font-medium">
                                                            Nous sommes une organisation humanitaire
                                                            créée par les maliens et pour venir en
                                                            aide aux maliens.
                                                      </span>
                                                </li>

                                                {/* Item 2 */}
                                                <li className="flex items-center gap-3">
                                                      <img
                                                            src={check}
                                                            alt="check"
                                                            className="w-8"
                                                      />
                                                      <span className="text-base md:text-lg font-medium">
                                                            Aidez-nous à aider nos compatriotes qui
                                                            sont dans le besoin afin qu’ils ne se
                                                            sentent pas exclus.
                                                      </span>
                                                </li>

                                                {/* Item 3 */}
                                                <li className="flex items-center gap-3">
                                                      <img
                                                            src={check}
                                                            alt="check"
                                                            className="w-8"
                                                      />

                                                      <span className="text-base md:text-lg font-medium">
                                                            Le Mali, un pays légendaire de
                                                            solidarité et la FMED ne dérobera pas à
                                                            cette règle. Nous travaillerons à
                                                            maintenir cet équilibre entre les
                                                            maliens.
                                                      </span>
                                                </li>

                                                {/* Ajoute d'autres items si besoin */}
                                          </ul>
                                    </div>
                              </div>

                              <div className="flex flex-col md:flex-row mt-4 gap-4">
                                    <button className="bg-gold text-gray-600 hover:bg-gray-600 hover:text-gold transition-all px-4 py-2 rounded-lg">
                                          A propos de nous
                                    </button>

                                    <button className="bg-transparent text-gray-600 hover:bg-gray-600 hover:text-gold transition-all px-4 py-2 rounded-lg">
                                          <i class="fas fa-phone me-2 text-2xl"></i>
                                          <span className="mt-2">+223 00 00 00 00</span>
                                    </button>
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default VideoComponent;
