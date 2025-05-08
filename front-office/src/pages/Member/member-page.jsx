import Main from './../../layouts/Main/Main';
import CoverPageComponent from './../../components/main/cover-page-component';
import members from '../../utils/member.json';

const MemberPage = () => {
      const coverContent = {
            title: 'Les membres',
            show: true,
            label: 'Rencontrez les membres de notre équipe de bénévoles',
            hook: 'Derrière chaque action, il y a des visages engagés. Découvrez les femmes et les hommes qui donnent de leur temps et de leur cœur pour FMED MALI.',
      };
      return (
            <Main>
                  <CoverPageComponent
                        title={coverContent.title}
                        showSection={coverContent.show}
                        label={coverContent.label}
                        hook={coverContent.hook}
                  />

                  <section className="container">
                        <div className="row mb-4">
                              <h1 className="font-nunito font-black mb-4 text-2xl">
                                    Conseil d’administration
                              </h1>
                              {members.map((member) => {
                                    if (member.type === 'conseil' || member.type === 'double') {
                                          return (
                                                <div className="col-12 col-md-4 col-lg-3">
                                                      <img
                                                            key={member.id}
                                                            src={member.imagePath}
                                                            alt=""
                                                      />
                                                </div>
                                          );
                                    }
                                    return null;
                              })}
                        </div>

                        <div className="row mb-4">
                              <h1 className="font-nunito font-black mb-4 text-2xl">Coordination</h1>
                              {members.map((member) => {
                                    if (
                                          member.type === 'coordinateur' ||
                                          member.type === 'double'
                                    ) {
                                          return (
                                                <div
                                                      className="col-12 col-md-4 col-lg-3"
                                                      key={member.id}
                                                >
                                                      <img src={member.imagePath} alt="" />
                                                </div>
                                          );
                                    }
                                    return null;
                              })}
                        </div>
                  </section>
            </Main>
      );
};

export default MemberPage;
