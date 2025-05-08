import CoverPageComponent from '../../components/main/cover-page-component';
import Main from '../../layouts/Main/Main';
import PosterTwo from '../../assets/res/poster-two.png';
import AideForm from './../../components/main/aide-form';

const FonsejForm = () => {
      const coverContent = {
            title: 'Formulaire Fonsej',
            show: true,
            label: 'Envoyer votre candidature FONSEJ.',
            hook: 'Vous souhaitez bénéficier du programme FONSEJ ? Remplissez le formulaire et envoyez votre candidature en quelques clics.',
      };
      return (
            <Main>
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
                                                Dernier actualites du FONSEJ
                                          </h2>
                                          <div className="d-flex flex-wrap flex-sm-column gap-2 px-2 px-sm-4 py-2">
                                                {[...Array(5)].map((_, i) => (
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
                                                                        Études de cas sur les
                                                                        services.
                                                                  </div>
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>
            </Main>
      );
};

export default FonsejForm;
