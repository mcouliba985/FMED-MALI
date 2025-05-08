import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home/HomePage';
import About from './pages/About/About';
import Error from './pages/404/Error';
import ArticleDetail from './pages/Articles/ArticleDetail';
import EventsPage from './pages/Events/EventsPage';
import EventDetail from './pages/event-detail/event-detail';
import MemberPage from './pages/Member/member-page';
import FonsejArticle from './pages/fonsej/fonsej-article';
import FonsejForm from './pages/fonsej/fonsej-form';
import FormMember from './pages/Member/form-member';
import PaymentForm from './pages/Donation/PaymentForm';
import GalleryPage from './pages/Gallery/GalleryPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <React.StrictMode>
            <Router>
                  <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/article/:articleId" element={<ArticleDetail />} />
                        <Route path="/list-event" element={<EventsPage />} />
                        <Route path="/event/:eventId" element={<EventDetail />} />
                        <Route path="/members" element={<MemberPage />} />
                        <Route path="/fonsej" element={<FonsejArticle />} />
                        <Route path="/fonsej-form" element={<FonsejForm />} />
                        <Route path="/member-form" element={<FormMember />} />
                        <Route path="/payment" element={<PaymentForm />} />
                        <Route path="/gallery" element={<GalleryPage />} />
                        <Route path="*" element={<Error />} />
                  </Routes>
            </Router>
      </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
