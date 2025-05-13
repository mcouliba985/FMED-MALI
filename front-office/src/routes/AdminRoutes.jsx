// routes/AdminRoutes.js
import { Route } from 'react-router-dom';

import AdminLayout from './../layouts/AdminLayout/admin-layout';
import EventList from '../pages/admin-pages/Events/event-list';
import ArticleList from './../pages/admin-pages/articles/list-article';
import AddArticleForm from '../pages/admin-pages/articles/add-article';
import PreviewArticle from '../pages/admin-pages/articles/preview-article';
import MemberList from '../pages/admin-pages/member/list-member';
import DonateurList from '../pages/admin-pages/donateur/list-donateur';
import DonateurPreview from '../pages/admin-pages/donateur/preview-donateur';
import PaymentRegister from '../pages/admin-pages/transaction/payment-register';
import TestimonialForm from '../pages/admin-pages/temoignage/TestimonialForm';
import TestimonialList from '../pages/admin-pages/temoignage/TestimonialList';
import SiteSettings from '../pages/admin-pages/settings/site-setting';

const AdminRoutes = () => {
      return (
            <Route path="/admin" element={<AdminLayout />}>
                  <Route path="list-article" element={<ArticleList />} />
                  <Route path="add-article" element={<AddArticleForm />} />
                  <Route path="preview-article/:articleID" element={<PreviewArticle />} />
                  <Route path="list-member" element={<MemberList />} />
                  <Route path="event-list" element={<EventList />} />
                  <Route path="list-donateur" element={<DonateurList />} />
                  <Route path="preview-donator/:donatorID" element={<DonateurPreview />} />
                  <Route path="payment-register" element={<PaymentRegister />} />
                  <Route path="create-testimonial" element={<TestimonialForm />} />
                  <Route path="list-testimonial" element={<TestimonialList />} />
                  <Route path="settings" element={<SiteSettings />} />
            </Route>
      );
};

export default AdminRoutes;
