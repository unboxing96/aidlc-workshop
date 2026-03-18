import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CustomerSetupPage from './pages/customer/CustomerSetupPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Routes */}
        <Route path="/table/:token" element={<div>Customer Menu (Unit 2)</div>} />
        <Route path="/table/:token/cart" element={<div>Cart (Unit 3)</div>} />
        <Route path="/table/:token/order" element={<div>Order (Unit 3)</div>} />
        <Route path="/table/:token/orders" element={<div>Order History (Unit 3)</div>} />
        <Route path="/setup" element={<CustomerSetupPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<div>Dashboard (Unit 5)</div>} />
        <Route path="/admin/tables" element={<div>Table Manage (Unit 5)</div>} />
        <Route path="/admin/menus" element={<div>Menu Manage (Unit 2)</div>} />

        {/* Default */}
        <Route path="/" element={<Navigate to="/setup" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
