import CoverPageComponent from '../../components/main/cover-page-component';
import Main from '../../layouts/Main/Main';
import PosterTwo from '../../assets/res/poster-two.png';
import DonationForm from '../../components/main/donation-form';
import LockComponent from '../../components/main/lock-component';

const PaymentForm = () => {
      const coverContent = {
            title: 'Faire un don maintenant',
            show: true,
            label: 'Besoin d’aide ou de plus d’informations ?',
            hook: 'N’hésitez pas à nous contacter pour toute question concernant votre inscription en tant que donateur. Notre équipe se fera un plaisir de vous accompagner.',
      };

      return (
            <>
                  <LockComponent />
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
                                                <DonationForm />
                                          </div>
                                    </div>
                                    <div className="col-12 col-lg-4">
                                          <div className="p-4 bg-light rounded-2xl">
                                                <h2 className="font-nunito text-xl font-black mb-2">
                                                      Dernier actualites du FONSEJ
                                                </h2>
                                                <div className="d-flex flex-wrap flex-sm-column gap-2 px-2 px-sm-4 py-2">
                                                      {[...Array(5)].map((_, i) => (
                                                            <div
                                                                  key={i}
                                                                  className="flex gap-4 mb-4"
                                                            >
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
            </>
      );
};

export default PaymentForm;
