import facebook from '../../assets/icons/facebook.png';
import twitter from '../../assets/icons/twitter.png';
import youtube from '../../assets/icons/youtube.png';
import instagram from '../../assets/icons/insta.png';
import LanguageSelector from '../main/language-selector';

const Toolbar = () => {
      return (
            <div
                  className="hidden lg:flex justify-between items-center bg-deepgreen 
                  text-white rounded-b-[16px] font-poppins h-[32px] px-8 py-3"
            >
                  <div className="flex gap-4">
                        <div className="flex gap-2 items-center">
                              <i className="fas fa-envelope text-gold"></i>
                              <p className="font-light text-[12px]">contact@fmed.ml</p>
                        </div>

                        <div className="flex gap-2 items-center">
                              <i className="fas fa-phone text-gold"></i>
                              <p className="font-light text-[12px]">+223 76 30 45 84</p>
                        </div>
                  </div>

                  <div className="flex items-center gap-3">
                        <div className="w-6 h-6">
                              <a
                                    href="https://www.facebook.com/profile.php?id=100081306009776"
                                    target="_blank"
                                    rel="noopener noreferrer"
                              >
                                    <img src={facebook} alt="logo for facebook" />
                              </a>
                        </div>
                        <div className="w-6 h-6">
                              <a
                                    href="https://www.youtube.com/@Fmed_Officiel"
                                    target="_blank"
                                    rel="noopener noreferrer"
                              >
                                    <img src={youtube} alt="logo for youtube" />
                              </a>
                        </div>
                        <div className="w-6 h-6">
                              <a
                                    href="https://twitter.com/Fmed_Officiel"
                                    target="_blank"
                                    rel="noopener noreferrer"
                              >
                                    <img src={twitter} alt="logo for twitter" />
                              </a>
                        </div>
                        <div className="w-6 h-6">
                              <a
                                    href="https://www.instagram.com/fmed_mali2012/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                              >
                                    <img src={instagram} alt="logo for instagram" />
                              </a>
                        </div>

                        <LanguageSelector />
                  </div>
            </div>
      );
};

export default Toolbar;
