import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminTableManagePage from './pages/admin/AdminTableManagePage';

// Customer Pages (lazy loaded by each unit)
// Admin Pages (lazy loaded by each unit)

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Routes */}
        <Route path="/table/:token" element={<div>Customer Menu (Unit 2)</div>} />
        <Route path="/table/:token/cart" element={<div>Cart (Unit 3)</div>} />
        <Route path="/table/:token/order" element={<div>Order (Unit 3)</div>} />
        <Route path="/table/:token/orders" element={<div>Order History (Unit 3)</div>} />
        <Route path="/setup" element={<div>Table Setup (Unit 1)</div>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<div>Admin Login (Unit 1)</div>} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/tables" element={<AdminTableManagePage />} />
        <Route path="/admin/menus" element={<div>Menu Manage (Unit 2)</div>} />

        {/* Default */}
        <Route path="/" element={<Navigate to="/setup" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
