import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CustomerSetupPage from './pages/customer/CustomerSetupPage';
import CustomerMenuPage from './pages/customer/CustomerMenuPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminMenuManagePage from './pages/admin/AdminMenuManagePage';
import CustomerCartPage from '@/pages/customer/CustomerCartPage';
import CustomerOrderPage from '@/pages/customer/CustomerOrderPage';
import CustomerOrderHistoryPage from '@/pages/customer/CustomerOrderHistoryPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Routes */}
        <Route path="/table/:token" element={<CustomerMenuPage />} />
        <Route path="/table/:token/cart" element={<CustomerCartPage />} />
        <Route path="/table/:token/order" element={<CustomerOrderPage />} />
        <Route path="/table/:token/orders" element={<CustomerOrderHistoryPage />} />
        <Route path="/setup" element={<CustomerSetupPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<div>Dashboard (Unit 5)</div>} />
        <Route path="/admin/tables" element={<div>Table Manage (Unit 5)</div>} />
        <Route path="/admin/menus" element={<AdminMenuManagePage />} />

        {/* Default */}
        <Route path="/" element={<Navigate to="/setup" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
