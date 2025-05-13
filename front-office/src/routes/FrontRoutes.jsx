import { Route, Routes } from 'react-router-dom';
import Home from './../pages/front-office-pages/HomePage';
import About from './../pages/front-office-pages/About';
import ArticleDetail from './../pages/front-office-pages/ArticleDetail';
import EventsPage from './../pages/front-office-pages/EventsPage';
import EventDetail from './../pages/front-office-pages/event-detail';
import MemberPage from './../pages/front-office-pages/member-page';
import FonsejArticle from './../pages/front-office-pages/fonsej-article';
import FonsejForm from './../pages/front-office-pages/fonsej-form';
import FormMember from './../pages/front-office-pages/form-member';
import PaymentForm from './../pages/front-office-pages/PaymentForm';
import GalleryPage from './../pages/front-office-pages/GalleryPage';
import Error from './../pages/404/Error';
import Main from './../layouts/Main/Main';
import DomainDetail from '../pages/front-office-pages/domain-detail';

const FrontRoutes = () => {
      return (
            <Main>
                  <Routes>
                        <Route path="" element={<Home />} />
                        <Route path="about/:aboutKey" element={<About />} />
                        <Route path="article/:articleID" element={<ArticleDetail />} />
                        <Route path="list-event" element={<EventsPage />} />
                        <Route path="event/:eventId" element={<EventDetail />} />
                        <Route path="our-teams" element={<MemberPage />} />
                        <Route path="fonsej-news" element={<FonsejArticle />} />
                        <Route path="fonsej-form" element={<FonsejForm />} />
                        <Route path="member-form" element={<FormMember />} />
                        <Route path="payment" element={<PaymentForm />} />
                        <Route path="gallery" element={<GalleryPage />} />
                        <Route path="domain/:key" element={<DomainDetail />} />
                        <Route path="*" element={<Error />} />
                  </Routes>
            </Main>
      );
};

export default FrontRoutes;
