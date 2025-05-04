import CoverPageComponent from '../../components/main/cover-page-component';
import Main from '../../layouts/Main/Main';

const EventsPage = () => {
      const coverContent = {
            title: 'Nos événements',
            show: true,
            label: 'Decouvrez nos événements',
            hook: 'Revivez nos moments marquants et restez informé des événements à venir qui façonnent l’avenir avec FMED MALI.',
      };
      return (
            <Main>
                  <CoverPageComponent
                        title={coverContent.title}
                        showSection={coverContent.show}
                        label={coverContent.label}
                        hook={coverContent.hook}
                  />

                  <section className="container py-8">
                        {/* Événement principal + secondaires */}
                        <div className="row g-4">
                              {/* Événement principal */}
                              <div className="col-12 col-lg-8">
                                    <h1 className="font-poppins text-xl sm:text-2xl font-bold mb-4">
                                          Les événements à venir avec FMED MALI
                                    </h1>
                                    <div className="relative rounded-[16px] overflow-hidden w-full">
                                          <img
                                                src="https://scontent-lhr8-1.xx.fbcdn.net/v/t39.30808-6/483065445_644018854984976_5934716556973029904_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=6ryP4M49XI4Q7kNvwEC0vmy&_nc_oc=AdmTD3FeboV4czAym690yUSTmmXS5ae1ECoGxghLkOnCRdQz7HzPaKK9OtChUN-PKnSVzy8w8JQjXXHTosb3BJiM&_nc_zt=23&_nc_ht=scontent-lhr8-1.xx&_nc_gid=5FULF2DGIEptv-_brmSCuQ&oh=00_AfEB5SxrW0bBFnQPnqqhd4dEkbfDa2AFEV9YBVnhENufOw&oe=681AEF4D "
                                                alt="Illustration"
                                                className="w-full h-auto lg:max-h-[600px] object-cover"
                                          />
                                          <div className="absolute inset-0 bg-black bg-opacity-50" />
                                          <div className="absolute bottom-0 left-0 w-full p-6 z-10 text-white">
                                                <h4 className="font-poppins mb-2">
                                                      Pour le 19 mai 2025
                                                </h4>
                                                <h4 className="font-poppins mb-2">
                                                      <i className="fas fa-location-dot me-2"></i>
                                                      Kati, Hamdallaye Aci
                                                </h4>
                                                <a
                                                      href="/"
                                                      className="hover:text-gold mt-2 text-sm sm:text-base text-justify"
                                                >
                                                      Comme chaque année, la ville de Kati a
                                                      respecté la tradition en organisant à
                                                      plusieurs étapes des dons destinés à certains
                                                      leaders religieux, aux malades de l’hôpital en
                                                      collaboration avec le service social de la
                                                      structure hospitalière. Tout cela a été
                                                      possible avec l’accompagnement de la{' '}
                                                      <strong>#FMED</strong>.
                                                </a>
                                          </div>
                                    </div>
                              </div>

                              {/* Événements secondaires */}
                              <div className="col-12 col-lg-4 d-flex flex-column gap-3">
                                    {[1, 2].map((_, idx) => (
                                          <div
                                                key={idx}
                                                className="relative rounded-[16px] overflow-hidden w-full"
                                          >
                                                <img
                                                      src="https://scontent-lhr6-2.xx.fbcdn.net/v/t39.30808-6/482211098_644018834984978_3547219339158458914_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=CqhzExYyzsUQ7kNvwF1wrDm&_nc_oc=AdmmviCbOA7zVXINcZd6gFg4I4Qx0NXu6OsN1S8yC1jFkjBsGkoZo8ilLUHs0dC2SpFbk-TbOloubRTsjKM7ebc_&_nc_zt=23&_nc_ht=scontent-lhr6-2.xx&_nc_gid=Bz8jEWKUhpBoAah_giH0dA&oh=00_AfFpU9U-x1t7XDEE4Mth-p454Nic1mrWWX49NLwr4ZH5dw&oe=681B190D "
                                                      alt="Illustration"
                                                      className="w-full h-auto lg:max-h-[250px] object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-50" />
                                                <div className="absolute bottom-0 left-0 w-full p-4 z-10 text-white">
                                                      <h4 className="font-poppins text-sm mb-1">
                                                            Pour le 19 mai 2025
                                                      </h4>
                                                      <h4 className="font-poppins text-sm mb-2">
                                                            <i className="fas fa-location-dot me-2"></i>
                                                            Kati, Hamdallaye Aci
                                                      </h4>
                                                      <a
                                                            href="/"
                                                            className="hover:text-gold text-xs sm:text-sm"
                                                      >
                                                            Comme chaque année, la ville de Kati
                                                            organise des dons pour les leaders
                                                            religieux.
                                                      </a>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>

                        {/* Événements passés */}
                        <div className="row mt-5">
                              <div className="col-12">
                                    <h2 className="font-nunito font-black text-xl sm:text-3xl mb-2">
                                          Les événements passés avec FMED MALI
                                    </h2>
                                    <p className="font-poppins mb-4">
                                          Voici les 4 derniers événements avec FMED MALI
                                    </p>
                              </div>

                              {[...Array(4)].map((_, i) => (
                                    <div key={i} className="col-12 col-sm-6 col-lg-3 mb-4">
                                          <div className="bg-light shadow-lg rounded-2xl h-100 d-flex flex-column">
                                                <img
                                                      className="w-100 h-64 rounded-2xl object-cover"
                                                      src="https://scontent-lhr6-1.xx.fbcdn.net/v/t39.30808-6/481281497_640561815330680_4819685669519576348_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=q2hqVgxLxxsQ7kNvwFLVygI&_nc_oc=Adm2kpE1yUL2jG240ukjPWnQNw35JE96uw-ODzZIocW73VmQkQhpy0AzwrdpabcWeWQJagUe08ZxERPI_cUf8Bpt&_nc_zt=23&_nc_ht=scontent-lhr6-1.xx&_nc_gid=KkYbQ0SSxM-wOWi1mb4-SA&oh=00_AfGSTWPbtH0N-igkMO4MfGHP_9dsLftWKwubSFqNhoZFxg&oe=681B03B9"
                                                      alt="img recent article"
                                                />
                                                <div className="px-4 pb-4">
                                                      <h4 className="pt-3 px-2 font-nunito font-bold text-sm lg:text-base">
                                                            <i className="far fa-calendar-days text-gold me-2"></i>{' '}
                                                            01 juin 2025
                                                      </h4>
                                                      <h4 className="pt-1 pb-3 px-2 font-nunito font-bold text-sm lg:text-base">
                                                            <i className="fas fa-location-dot text-gold me-2"></i>
                                                            Kati, Hamdallaye Aci
                                                      </h4>
                                                      <a
                                                            href="/"
                                                            className="hover:text-gold font-bold font-poppins text-sm lg:text-lg"
                                                      >
                                                            Études de cas sur les services
                                                            informatiques...
                                                      </a>
                                                </div>
                                          </div>
                                    </div>
                              ))}
                        </div>
                  </section>
            </Main>
      );
};

export default EventsPage;
