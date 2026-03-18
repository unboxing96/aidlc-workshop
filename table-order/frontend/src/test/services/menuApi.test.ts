import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from '../../services/api';
import { menuApi } from '../../services/menuApi';

vi.mock('../../services/api');

describe('menuApi', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('getCategories', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [] });
    await menuApi.getCategories();
    expect(api.get).toHaveBeenCalledWith('/categories');
  });

  it('getMenus with categoryId', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [] });
    await menuApi.getMenus(1);
    expect(api.get).toHaveBeenCalledWith('/menus', { params: { categoryId: 1 } });
  });

  it('createMenu', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: {} });
    await menuApi.createMenu({ name: '김치찌개', price: 9000, categoryId: 1 });
    expect(api.post).toHaveBeenCalledWith('/menus', { name: '김치찌개', price: 9000, categoryId: 1 });
  });

  it('deleteMenu', async () => {
    vi.mocked(api.delete).mockResolvedValue({});
    await menuApi.deleteMenu(1);
    expect(api.delete).toHaveBeenCalledWith('/menus/1');
  });
});
