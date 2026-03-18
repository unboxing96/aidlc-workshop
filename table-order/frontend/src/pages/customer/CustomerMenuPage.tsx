import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { menuApi } from '../../services/menuApi';
import { useCart } from '../../stores/cartStore';
import CategoryNav from '../../components/CategoryNav';
import MenuCard from '../../components/MenuCard';
import type { Category, Menu } from '../../types';

export default function CustomerMenuPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const addItem = useCart((s) => s.addItem);
  const totalItems = useCart((s) => s.items.reduce((sum: number, i: { quantity: number }) => sum + i.quantity, 0));

  useEffect(() => {
    menuApi.getCategories().then((r) => setCategories(r.data));
    menuApi.getMenus().then((r) => setMenus(r.data));
  }, []);

  const filtered = selectedCategory ? menus.filter((m) => m.categoryId === selectedCategory) : menus;

  const handleAdd = (menu: Menu) => {
    addItem({ menuId: menu.id, menuName: menu.name, unitPrice: menu.price, imageUrl: menu.imageUrl });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">메뉴</h1>
          <button
            onClick={() => navigate(`/table/${token}/cart`)}
            className="px-4 py-2 bg-blue-600 text-white rounded relative"
          >
            장바구니 {totalItems > 0 && <span className="ml-1">({totalItems})</span>}
          </button>
        </div>
        <CategoryNav categories={categories} selectedId={selectedCategory} onSelect={setSelectedCategory} />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {filtered.map((menu) => (
            <MenuCard key={menu.id} menu={menu} onAdd={handleAdd} />
          ))}
        </div>
        {filtered.length === 0 && <p className="text-center text-gray-400 mt-8">메뉴가 없습니다</p>}
      </div>
    </div>
  );
}
