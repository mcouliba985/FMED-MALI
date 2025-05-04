import CoverPageComponent from '../../components/main/cover-page-component';
import Main from '../../layouts/Main/Main';
import { motion } from 'framer-motion';

const About = () => {
      const title = 'A propos de nous';

      return (
            <Main>
                  <CoverPageComponent title={title} />

                  <section className="container py-8">
                        <div className="row lg:px-10">
                              <div className="col-12 col-lg-5 mb-4 mb-lg-0">
                                    <div className="w-full h-full lg:h-[28rem]">
                                          <img
                                                className="w-full h-full rounded-2xl object-cover"
                                                src="https://scontent-lhr6-2.xx.fbcdn.net/v/t39.30808-6/490070085_667650832621778_5464031922788881425_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=DP7GcIiMRGQQ7kNvwHdTkq4&_nc_oc=Adn5I9NGLeuGmN6Pj4FZWuMQ9YrYz82yGK0ZGhwuu0941J_j7QzcAUCcWcmWwzP-qlItb2XuQx_VtoFTZmBdC-XD&_nc_zt=23&_nc_ht=scontent-lhr6-2.xx&_nc_gid=DBEeFkTSq0RpgSWEIw_dEA&oh=00_AfFUsXfYnKCE9iRTPIyq-cdzINlVNFWRHNwYxD02_k-FqQ&oe=681AA431"
                                                alt="couverture about"
                                          />
                                    </div>
                              </div>

                              <div className="col-12 col-lg-7">
                                    <h1 className="font-poppins font-black text-2xl md:text-4xl leading-normal mb-4 px-4">
                                          <span className="text-gold">FMED MALI</span>, de quoi
                                          s'agit-il exactement ?
                                    </h1>

                                    <p className="text-justify font-roboto leading-7 px-4 md:px-7">
                                          La FMED est une organisation caritative créée en 2012 et
                                          reconnue par l’Etat Malien. Elle dispose d’un récépissé de
                                          déclaration N° 099/MATD-DGAT et d’un Numéro
                                          d’identification fiscale N° 084130797Y. Elle est aussi
                                          membre du Conseil National des Organisations Caritatives
                                          sous la direction du Ministre en charge du développement
                                          social. Elle est présente dans le soutien aux populations
                                          sous la forme d’aides alimentaires, de fournitures de
                                          soins, de facilitation de l’accès à l’eau, d’aide à
                                          l’insertion socio-professionnelle, d’interventions
                                          humanitaires d’urgence. La FMED est gouvernée par un
                                          conseil d’administration (CA) composé de (philanthropes,
                                          leaders religieux, acteurs de la société civile…) et
                                          dirigé par un coordinateur assisté par une équipe
                                          (administration, communication, financier). La FMED a mené
                                          des interventions multiformes ces dix dernières années
                                          dans les différentes régions du Mali et à Bamako.
                                    </p>
                              </div>
                        </div>

                        <div className="row px-4 lg:px-10 mt-4">
                              <div className="col-12 col-lg-10">
                                    <h1 className="font-poppins font-black text-2xl md:text-4xl leading-normal mb-4">
                                          Une Fondation Inspirée du Modèle Turc au Service du
                                          Développement
                                    </h1>
                                    <p className="text-justify font-roboto leading-7">
                                          Regrouper les homes d’affaires et les leaders du Mali en
                                          vue de collecter des fonds auprès d’eux pour assurer aux
                                          populations défavorisées l’accès aux services essentiels
                                          et contribuer ainsi à leur bien-être ; Regrouper les
                                          hommes d’affaires et les leaders du Mali en vue de
                                          collecter des fonds auprès d’eux pour assurer aux
                                          populations défavorisées l’accès aux services essentiels
                                          et contribuer ainsi à leur bien-être ; Mener ou
                                          accompagner les opérations humanitaires d’urgence à
                                          l’intérieur du Mali ;- Promouvoir au Mali, l’organisation
                                          et le développement d’actions d’ordre social, économique
                                          et culturel en faveurdes populations notamment dans les
                                          domaines suivants : Education ;- Formation professionnelle
                                          ;- Santé ;- Emploi des jeunes ;- Infrastructures rurales,
                                          l’humanitaire.- Encourager les performances dans tous les
                                          domaines.En conséquence la Fondation organise et soutient
                                          des sélections et concours entre les projets à chaque fois
                                          pour retenir et promouvoir les meilleurs ;• Représenter ou
                                          s’associer à toute action, entreprise ou programme
                                          d’organismes étrangers opérant ou voulant opérer au Mali
                                          dans le sens des idéaux de la Fondation ;• Rechercher sur
                                          le plan national et international des initiatives ou
                                          bonnes volontés pour l’accomplissement des idéaux de la
                                          Fondation ;• Initier ou créer toute activité, organisme,
                                          projet ou programme dont l’objectif peut maintenir et
                                          promouvoir les œuvres inspirées des initiatives généreuses
                                          de la Fondation ou qui concourent à renforcer ses moyens
                                          humains, matériels ou financiers;• Initier, soutenir et
                                          accompagner les projets de développement sur sa propre
                                          initiative, mais également à travers des partenariats
                                          financiers et techniques élaborés avec des organisations
                                          de solidarité internationales, nationales et des
                                          institutions spécialisées ;• Contribuer au développement
                                          durable dans toutes ses thématiques ;
                                    </p>
                              </div>

                              <div className="col-12 col-lg-2 d-flex justify-content-center align-items-start mt-4 mt-lg-0">
                                    <motion.div
                                          animate={{
                                                x: [0, 30, 0, -30, 0],
                                                y: [0, 15, 30, 15, 0],
                                                rotate: [0, 90, 180, 270, 360],
                                          }}
                                          transition={{
                                                repeat: Infinity,
                                                duration: 5,
                                                ease: 'easeInOut',
                                          }}
                                          className="w-20 h-20 rounded-full bg-gold shadow-lg"
                                    />

                                    <motion.div
                                          animate={{
                                                x: [0, 30, 0, -30, 0],
                                                y: [0, 15, 30, 15, 0],
                                                rotate: [0, 90, 180, 270, 360],
                                          }}
                                          transition={{
                                                repeat: Infinity,
                                                duration: 5,
                                                ease: 'easeInOut',
                                          }}
                                          className="w-20 h-20 rounded-full bg-gold shadow-lg"
                                    />
                              </div>
                        </div>
                  </section>
            </Main>
      );
};

export default About;
