import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontRoutes from './routes/FrontRoutes';
import AdminRoutes from './routes/AdminRoutes';
import './i18n'; // Import du système de traduction

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <React.StrictMode>
            <Router>
                  <Routes>
                        <Route path="/*" element={<FrontRoutes />} />
                        {AdminRoutes()}
                  </Routes>
            </Router>
      </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
