import { useEffect, useState } from 'react';
import CoverPageComponent from '../../components/main/cover-page-component';
import { API_ENDPOINTS } from '../../config/API_ENDPOINT';
import { useTranslation } from 'react-i18next';

const MemberPage = () => {
      const { t } = useTranslation();

      const coverContent = {
            title: t('members.cover.title'),
            show: true,
            label: t('members.cover.label'),
            hook: t('members.cover.hook'),
      };

      const [members, setMembers] = useState([]);

      useEffect(() => {
            async function memberFunc() {
                  try {
                        const fetchRequest = await fetch(API_ENDPOINTS.getMembers);
                        const response = await fetchRequest.json();

                        setMembers(response);
                  } catch (error) {
                        console.log(error);
                  }
            }

            memberFunc();
      }, []);

      console.log(members);

      return (
            <section>
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
                                    if (
                                          member.memberType === 'conseil' ||
                                          member.memberType === 'double'
                                    ) {
                                          return (
                                                <div className="col-12 col-md-4 col-lg-3">
                                                      <img
                                                            key={member.id}
                                                            src={member.imagePath}
                                                            alt={member.imageName}
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
                                          member.memberType === 'coordinateur' ||
                                          member.memberType === 'double'
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
            </section>
      );
};

export default MemberPage;
