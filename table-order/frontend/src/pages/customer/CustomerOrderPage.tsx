import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '@/stores/cartStore';
import { orderApi } from '@/services/orderApi';

export default function CustomerOrderPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { items, totalAmount, clearCart } = useCart();
  const [status, setStatus] = useState<'confirm' | 'loading' | 'success' | 'error'>('confirm');
  const [orderNumber, setOrderNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // tableId는 localStorage에서 가져옴
  const tableId = Number(localStorage.getItem('tableId'));
  const tableNumber = Number(localStorage.getItem('tableNumber'));

  // 빈 장바구니로 접근 시 cart 페이지로 리다이렉트
  useEffect(() => {
    if (items.length === 0 && status === 'confirm') {
      navigate(`/table/${token}/cart`, { replace: true });
    }
  }, [items.length, status, navigate, token]);

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        navigate(`/table/${token}`);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status, navigate, token]);

  const handleConfirm = async () => {
    setStatus('loading');
    try {
      const order = await orderApi.createOrder({
        tableId,
        items: items.map((i) => ({ menuId: i.menuId, quantity: i.quantity })),
      });
      setOrderNumber(order.orderNumber);
      clearCart();
      setStatus('success');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || '주문에 실패했습니다. 다시 시도해주세요.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto p-4 text-center py-12">
        <div className="text-4xl mb-4">✅</div>
        <h1 className="text-2xl font-bold mb-2">주문 완료!</h1>
        <p className="text-lg mb-1" data-testid="order-number">주문번호: {orderNumber}</p>
        <p className="text-gray-500">5초 후 메뉴 화면으로 이동합니다</p>
        <button className="mt-4 text-blue-600 underline" onClick={() => navigate(`/table/${token}`)}>바로 이동</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">주문 확인</h1>

      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-500">테이블 번호</p>
        <p className="font-medium" data-testid="order-table-number">{tableNumber}번 테이블</p>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.menuId} className="flex justify-between py-2 border-b" data-testid={`order-item-${item.menuId}`}>
            <div>
              <span className="font-medium">{item.menuName}</span>
              <span className="text-gray-500 ml-2">x{item.quantity}</span>
            </div>
            <span>{(item.unitPrice * item.quantity).toLocaleString()}원</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between text-lg font-bold border-t pt-4">
        <span>총 금액</span>
        <span data-testid="order-total">{totalAmount().toLocaleString()}원</span>
      </div>

      <p className="mt-2 text-sm text-gray-500">예상 대기 시간: 약 15~20분</p>

      {status === 'error' && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg" data-testid="order-error">{errorMsg}</div>
      )}

      <div className="mt-6 flex gap-3">
        <button
          className="flex-1 py-3 border rounded-lg text-gray-600"
          onClick={() => navigate(`/table/${token}/cart`)}
        >뒤로가기</button>
        <button
          data-testid="order-confirm-button"
          className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50"
          disabled={status === 'loading'}
          onClick={handleConfirm}
        >{status === 'loading' ? '주문 중...' : '주문 확정'}</button>
      </div>
    </div>
  );
}
