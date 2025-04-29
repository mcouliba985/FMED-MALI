import FooterPage from '../Footer/FooterPage';
import HeaderPage from '../Header/HeaderPage';

const Main = ({ children }) => {
      return (
            <div>
                  <HeaderPage />
                  <main>{children}</main>
                  <FooterPage />
            </div>
      );
};

export default Main;
