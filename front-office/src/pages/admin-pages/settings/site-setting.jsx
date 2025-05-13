import { useState } from 'react';
import CarouselSetting from './carousel-setting';
import YoutubeManageSetting from './youtubeManage-setting';
import PartnerSetting from './partner-setting';

const SiteSettings = () => {
      const [activeTab, setActiveTab] = useState('carousel');

      return (
            <div className="max-w-5xl mx-auto p-6 space-y-8">
                  <h1 className="text-2xl font-bold mb-4">Paramètre du site</h1>
                  <p className="text-gray-600">
                        Configurez les éléments principaux de votre site pour une expérience sur
                        mesure.
                  </p>

                  {/* Onglets */}
                  <div className="flex space-x-4 border-b pb-2">
                        <button
                              onClick={() => setActiveTab('carousel')}
                              className={`px-4 py-2 font-semibold ${
                                    activeTab === 'carousel'
                                          ? 'border-b-2 border-blue-500 text-blue-600'
                                          : 'text-gray-500 hover:text-blue-600'
                              }`}
                        >
                              Carousel
                        </button>
                        <button
                              onClick={() => setActiveTab('youtube')}
                              className={`px-4 py-2 font-semibold ${
                                    activeTab === 'youtube'
                                          ? 'border-b-2 border-blue-500 text-blue-600'
                                          : 'text-gray-500 hover:text-blue-600'
                              }`}
                        >
                              Vidéo Youtube
                        </button>

                        <button
                              onClick={() => setActiveTab('partner')}
                              className={`px-4 py-2 font-semibold ${
                                    activeTab === 'partner'
                                          ? 'border-b-2 border-blue-500 text-blue-600'
                                          : 'text-gray-500 hover:text-blue-600'
                              }`}
                        >
                              Partenaires
                        </button>
                  </div>

                  {/* Contenu de l'onglet */}
                  <div className="mt-6">
                        {activeTab === 'carousel' && <CarouselSetting />}
                        {activeTab === 'youtube' && <YoutubeManageSetting />}
                        {activeTab === 'partner' && <PartnerSetting />}
                  </div>
            </div>
      );
};

export default SiteSettings;
