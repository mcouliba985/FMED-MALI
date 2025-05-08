import CoverPageComponent from '../../components/main/cover-page-component';
import Main from '../../layouts/Main/Main';

const FonsejArticle = () => {
      const coverContent = {
            title: 'Les articles Fonsej',
            show: true,
            label: 'Suivez ici toutes les actualités du FONSEJ.',
            hook: 'Tenez-vous informé des dernières initiatives, projets et annonces du FONSEJ à travers nos actualités régulièrement mises à jour.',
      };
      return (
            <Main>
                  <CoverPageComponent
                        title={coverContent.title}
                        showSection={coverContent.show}
                        label={coverContent.label}
                        hook={coverContent.hook}
                  />

                  <section className="conrainer px-8">
                        <div className="row mb-4">
                              {[...Array(20)].map((_, i) => (
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

export default FonsejArticle;
