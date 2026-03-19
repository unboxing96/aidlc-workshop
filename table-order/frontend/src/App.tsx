import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CustomerSetupPage from './pages/customer/CustomerSetupPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <p className="text-lg text-gray-600">{title} — 준비 중입니다</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/setup" element={<CustomerSetupPage />} />
        <Route path="/menu" element={<PlaceholderPage title="메뉴 페이지" />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<PlaceholderPage title="관리자 대시보드" />} />
        <Route path="/" element={<Navigate to="/setup" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
