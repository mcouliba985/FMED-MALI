import facebook from '../../assets/icons/facebook.png';
import twitter from '../../assets/icons/twitter.png';
import youtube from '../../assets/icons/youtube.png';
import instagram from '../../assets/icons/insta.png';

const Toolbar = () => {
      return (
            <div
                  className="hidden lg:flex justify-between items-center bg-deepgreen text-white 
                  rounded-b-[16px] font-poppins h-[32px] px-8"
            >
                  <div className="flex gap-4">
                        <div className="flex gap-2 items-center">
                              <i class="fas fa-envelope text-gold"></i>
                              <p className="font-light text-[12px]">contact@fmed.ml</p>
                        </div>

                        <div className="flex gap-2 items-center">
                              <i class="fas fa-phone text-gold"></i>
                              <p className="font-light text-[12px]">+223 00 00 00 00</p>
                        </div>
                  </div>

                  <div className="flex items-center gap-3">
                        <div className="w-6 h-6">
                              <img src={facebook} alt="logo for facebook" />
                        </div>
                        <div className="w-6 h-6">
                              <img src={youtube} alt="logo for youtube" />
                        </div>
                        <div className="w-6 h-6">
                              <img src={twitter} alt="logo for twitter" />
                        </div>
                        <div className="w-6 h-6">
                              <img src={instagram} alt="logo for instagram" />
                        </div>
                  </div>
            </div>
      );
};

export default Toolbar;
