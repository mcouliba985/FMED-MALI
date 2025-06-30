import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
      const { i18n } = useTranslation();

      const changeLanguage = (e) => {
            i18n.changeLanguage(e.target.value);
      };

      return (
            <select
                  onChange={changeLanguage}
                  defaultValue={i18n.language}
                  className="bg-transparent lg:text-white border lg:border-white text-xs rounded px-2 py-[2px] focus:outline-none"
            >
                  <option value="fr" className="text-black">
                        Français
                  </option>
                  <option value="en" className="text-black">
                        English
                  </option>
            </select>
      );
};

export default LanguageSelector;
