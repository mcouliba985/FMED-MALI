// src/layouts/AdminLayout/AdminWrapper.jsx
import { OverlayProvider } from '../../utils/overlay-context';
import AdminLayout from './admin-layout';

const AdminWrapper = () => (
      <OverlayProvider>
            <AdminLayout />
      </OverlayProvider>
);

export default AdminWrapper;
