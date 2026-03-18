import type { CartItem as CartItemType } from '@/types';

interface Props {
  item: CartItemType;
  onUpdateQuantity: (menuId: number, quantity: number) => void;
  onRemove: (menuId: number) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: Props) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg" data-testid={`cart-item-${item.menuId}`}>
      {item.imageUrl ? (
        <img src={item.imageUrl} alt={item.menuName} className="w-16 h-16 object-cover rounded" />
      ) : (
        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">No Image</div>
      )}
      <div className="flex-1">
        <p className="font-medium">{item.menuName}</p>
        <p className="text-sm text-gray-500">{item.unitPrice.toLocaleString()}원</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          data-testid={`cart-item-decrease-${item.menuId}`}
          className="w-8 h-8 rounded-full border flex items-center justify-center"
          onClick={() => onUpdateQuantity(item.menuId, item.quantity - 1)}
        >−</button>
        <span className="w-8 text-center" data-testid={`cart-item-qty-${item.menuId}`}>{item.quantity}</span>
        <button
          data-testid={`cart-item-increase-${item.menuId}`}
          className="w-8 h-8 rounded-full border flex items-center justify-center"
          onClick={() => onUpdateQuantity(item.menuId, item.quantity + 1)}
        >+</button>
      </div>
      <p className="w-24 text-right font-medium">{(item.unitPrice * item.quantity).toLocaleString()}원</p>
      <button
        data-testid={`cart-item-remove-${item.menuId}`}
        className="text-red-500 text-sm"
        onClick={() => onRemove(item.menuId)}
      >삭제</button>
    </div>
  );
}
