import { useState, useEffect } from 'react';
import { menuApi, type CreateMenuRequest } from '../../services/menuApi';
import { imageApi } from '../../services/imageApi';
import type { Category, Menu } from '../../types';

export default function AdminMenuManagePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
  const [form, setForm] = useState({ name: '', price: 0, description: '', imageUrl: '', categoryId: 0 });
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    menuApi.getCategories().then((r) => setCategories(r.data));
    menuApi.getMenus().then((r) => setMenus(r.data));
  };
  useEffect(load, []);

  const filtered = selectedCategory ? menus.filter((m) => m.categoryId === selectedCategory) : menus;

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      await menuApi.createCategory({ name: newCategoryName.trim() });
      setNewCategoryName('');
      load();
    } catch (e: any) { setError(e.response?.data?.message || '카테고리 등록 실패'); }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { data } = await imageApi.upload(file);
      setForm((f) => ({ ...f, imageUrl: data.imageUrl }));
    } catch (err: any) { setError(err.response?.data?.message || '이미지 업로드 실패'); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (editingMenu) {
        await menuApi.updateMenu(editingMenu.id, form);
      } else {
        await menuApi.createMenu(form as CreateMenuRequest);
      }
      setForm({ name: '', price: 0, description: '', imageUrl: '', categoryId: categories[0]?.id || 0 });
      setEditingMenu(null);
      load();
    } catch (e: any) { setError(e.response?.data?.message || '저장 실패'); }
  };

  const handleEdit = (menu: Menu) => {
    setEditingMenu(menu);
    setForm({ name: menu.name, price: menu.price, description: menu.description || '', imageUrl: menu.imageUrl || '', categoryId: menu.categoryId });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('메뉴를 삭제하시겠습니까?')) return;
    await menuApi.deleteMenu(id);
    load();
  };

  const handleMoveOrder = async (menu: Menu, direction: -1 | 1) => {
    const siblings = menus.filter((m) => m.categoryId === menu.categoryId).sort((a, b) => a.displayOrder - b.displayOrder);
    const idx = siblings.findIndex((m) => m.id === menu.id);
    const swapIdx = idx + direction;
    if (swapIdx < 0 || swapIdx >= siblings.length) return;
    await menuApi.updateMenuOrder([
      { id: menu.id, displayOrder: siblings[swapIdx].displayOrder },
      { id: siblings[swapIdx].id, displayOrder: menu.displayOrder },
    ]);
    load();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">메뉴 관리</h1>

        {/* 카테고리 관리 */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">카테고리</h2>
          <div className="flex gap-2 mb-2">
            <input value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="카테고리명" className="border px-3 py-1 rounded flex-1" aria-label="새 카테고리명" />
            <button onClick={handleAddCategory} className="px-4 py-1 bg-blue-600 text-white rounded">추가</button>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1 rounded text-sm ${!selectedCategory ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>전체</button>
            {categories.map((c) => (
              <button key={c.id} onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1 rounded text-sm ${selectedCategory === c.id ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>{c.name}</button>
            ))}
          </div>
        </div>

        {/* 메뉴 등록/수정 폼 */}
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-3">
          <h2 className="font-semibold">{editingMenu ? '메뉴 수정' : '메뉴 등록'}</h2>
          <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="메뉴명" className="w-full border px-3 py-2 rounded" aria-label="메뉴명" />
          <input type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
            placeholder="가격" className="w-full border px-3 py-2 rounded" aria-label="가격" />
          <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="설명" className="w-full border px-3 py-2 rounded" rows={2} aria-label="설명" />
          <select value={form.categoryId} onChange={(e) => setForm((f) => ({ ...f, categoryId: Number(e.target.value) }))}
            className="w-full border px-3 py-2 rounded" aria-label="카테고리">
            <option value={0}>카테고리 선택</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input type="file" accept="image/*" onChange={handleImageUpload} aria-label="이미지 업로드" />
          {form.imageUrl && <p className="text-sm text-green-600">이미지: {form.imageUrl}</p>}
          {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{editingMenu ? '수정' : '등록'}</button>
            {editingMenu && <button type="button" onClick={() => { setEditingMenu(null); setForm({ name: '', price: 0, description: '', imageUrl: '', categoryId: 0 }); }}
              className="px-4 py-2 bg-gray-300 rounded">취소</button>}
          </div>
        </form>

        {/* 메뉴 목록 */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">메뉴 목록</h2>
          {filtered.length === 0 && <p className="text-gray-400">메뉴가 없습니다</p>}
          {filtered.map((menu) => (
            <div key={menu.id} className="flex items-center justify-between py-2 border-b last:border-0">
              <div>
                <span className="font-medium">{menu.name}</span>
                <span className="ml-2 text-blue-600">{menu.price.toLocaleString()}원</span>
              </div>
              <div className="flex gap-1">
                <button onClick={() => handleMoveOrder(menu, -1)} className="px-2 py-1 text-sm bg-gray-100 rounded" aria-label="위로">↑</button>
                <button onClick={() => handleMoveOrder(menu, 1)} className="px-2 py-1 text-sm bg-gray-100 rounded" aria-label="아래로">↓</button>
                <button onClick={() => handleEdit(menu)} className="px-2 py-1 text-sm bg-yellow-100 rounded">수정</button>
                <button onClick={() => handleDelete(menu.id)} className="px-2 py-1 text-sm bg-red-100 rounded">삭제</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
