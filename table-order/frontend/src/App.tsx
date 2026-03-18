import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminTableManagePage from './pages/admin/AdminTableManagePage';
import CustomerSetupPage from './pages/customer/CustomerSetupPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import CustomerCartPage from '@/pages/customer/CustomerCartPage';
import CustomerOrderPage from '@/pages/customer/CustomerOrderPage';
import CustomerOrderHistoryPage from '@/pages/customer/CustomerOrderHistoryPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Routes */}
        <Route path="/table/:token" element={<div>Customer Menu (Unit 2)</div>} />
        <Route path="/table/:token/cart" element={<CustomerCartPage />} />
        <Route path="/table/:token/order" element={<CustomerOrderPage />} />
        <Route path="/table/:token/orders" element={<CustomerOrderHistoryPage />} />
        <Route path="/setup" element={<CustomerSetupPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/tables" element={<AdminTableManagePage />} />
        <Route path="/admin/menus" element={<div>Menu Manage (Unit 2)</div>} />

        {/* Default */}
        <Route path="/" element={<Navigate to="/setup" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
