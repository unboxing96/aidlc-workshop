import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '@/stores/cartStore';
import CartItem from '@/components/CartItem';

export default function CustomerCartPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, clearCart, totalAmount } = useCart();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">장바구니</h1>

      {items.length === 0 ? (
        <div className="text-center py-12 text-gray-500" data-testid="cart-empty">
          <p>장바구니가 비어있습니다</p>
          <button className="mt-4 text-blue-600 underline" onClick={() => navigate(`/table/${token}`)}>메뉴 보기</button>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {items.map((item) => (
              <CartItem key={item.menuId} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>총 금액</span>
              <span data-testid="cart-total">{totalAmount().toLocaleString()}원</span>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              data-testid="cart-clear-button"
              className="flex-1 py-3 border rounded-lg text-gray-600"
              onClick={clearCart}
            >장바구니 비우기</button>
            <button
              data-testid="cart-order-button"
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium"
              onClick={() => navigate(`/table/${token}/order`)}
            >주문하기</button>
          </div>
        </>
      )}
    </div>
  );
}
