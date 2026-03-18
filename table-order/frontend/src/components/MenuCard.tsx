import type { Menu } from '../types';

interface Props {
  menu: Menu;
  onAdd?: (menu: Menu) => void;
}

export default function MenuCard({ menu, onAdd }: Props) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <div className="h-40 bg-gray-100 flex items-center justify-center">
        {menu.imageUrl ? (
          <img src={menu.imageUrl} alt={menu.name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-gray-400 text-sm">이미지 없음</span>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold">{menu.name}</h3>
        <p className="text-blue-600 font-bold">{menu.price.toLocaleString()}원</p>
        {menu.description && <p className="text-gray-500 text-sm mt-1 line-clamp-2">{menu.description}</p>}
        {onAdd && (
          <button
            onClick={() => onAdd(menu)}
            className="mt-2 w-full py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            aria-label={`${menu.name} 장바구니에 추가`}
          >
            담기
          </button>
        )}
      </div>
    </div>
  );
}
