import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CustomerSetupPage from './pages/customer/CustomerSetupPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/setup" element={<CustomerSetupPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/" element={<Navigate to="/setup" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
