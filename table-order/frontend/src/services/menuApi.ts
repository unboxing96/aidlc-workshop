import api from './api';
import type { Category, Menu } from '../types';

export interface CreateCategoryRequest { name: string; }
export interface CreateMenuRequest { name: string; price: number; description?: string; imageUrl?: string; categoryId: number; }
export interface UpdateMenuRequest { name?: string; price?: number; description?: string; imageUrl?: string; categoryId?: number; }
export interface MenuOrderItem { id: number; displayOrder: number; }

export const menuApi = {
  getCategories: () => api.get<Category[]>('/categories'),
  createCategory: (data: CreateCategoryRequest) => api.post<Category>('/categories', data),
  getMenus: (categoryId?: number) => api.get<Menu[]>('/menus', { params: categoryId ? { categoryId } : {} }),
  createMenu: (data: CreateMenuRequest) => api.post<Menu>('/menus', data),
  updateMenu: (id: number, data: UpdateMenuRequest) => api.put<Menu>(`/menus/${id}`, data),
  deleteMenu: (id: number) => api.delete(`/menus/${id}`),
  updateMenuOrder: (items: MenuOrderItem[]) => api.put('/menus/order', { items }),
};
