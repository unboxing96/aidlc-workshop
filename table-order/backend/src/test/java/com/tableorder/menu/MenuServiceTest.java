package com.tableorder.menu;

import com.tableorder.common.exception.DuplicateException;
import com.tableorder.common.exception.NotFoundException;
import com.tableorder.entity.CategoryEntity;
import com.tableorder.entity.MenuEntity;
import com.tableorder.menu.dto.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MenuServiceTest {

    @Mock private MenuRepository menuRepository;
    @Mock private CategoryRepository categoryRepository;
    @InjectMocks private MenuService menuService;

    @Test
    void 카테고리_생성_성공() {
        when(categoryRepository.existsByName("한식")).thenReturn(false);
        when(categoryRepository.count()).thenReturn(0L);
        when(categoryRepository.save(any())).thenAnswer(inv -> {
            CategoryEntity c = inv.getArgument(0); c.setId(1L); c.setCreatedAt(LocalDateTime.now()); return c;
        });
        CategoryResponse res = menuService.createCategory(createCategoryReq("한식"));
        assertThat(res.getName()).isEqualTo("한식");
    }

    @Test
    void 카테고리_중복() {
        when(categoryRepository.existsByName("한식")).thenReturn(true);
        assertThatThrownBy(() -> menuService.createCategory(createCategoryReq("한식")))
                .isInstanceOf(DuplicateException.class);
    }

    @Test
    void 메뉴_생성_성공() {
        when(categoryRepository.existsById(1L)).thenReturn(true);
        when(menuRepository.countByCategoryId(1L)).thenReturn(0);
        when(menuRepository.save(any())).thenAnswer(inv -> {
            MenuEntity m = inv.getArgument(0); m.setId(1L); m.setCreatedAt(LocalDateTime.now()); return m;
        });
        MenuResponse res = menuService.createMenu(createMenuReq("김치찌개", 9000, 1L));
        assertThat(res.getName()).isEqualTo("김치찌개");
        assertThat(res.getPrice()).isEqualTo(9000);
    }

    @Test
    void 메뉴_생성_카테고리_없음() {
        when(categoryRepository.existsById(99L)).thenReturn(false);
        assertThatThrownBy(() -> menuService.createMenu(createMenuReq("김치찌개", 9000, 99L)))
                .isInstanceOf(NotFoundException.class);
    }

    @Test
    void 메뉴_수정_성공() {
        MenuEntity menu = MenuEntity.builder().id(1L).name("old").price(1000).categoryId(1L)
                .displayOrder(0).createdAt(LocalDateTime.now()).build();
        when(menuRepository.findById(1L)).thenReturn(Optional.of(menu));
        when(menuRepository.save(any())).thenReturn(menu);

        UpdateMenuRequest req = new UpdateMenuRequest();
        setField(req, "name", "new");
        setField(req, "price", 2000);
        MenuResponse res = menuService.updateMenu(1L, req);
        assertThat(res.getName()).isEqualTo("new");
    }

    @Test
    void 메뉴_삭제_없음() {
        when(menuRepository.existsById(99L)).thenReturn(false);
        assertThatThrownBy(() -> menuService.deleteMenu(99L)).isInstanceOf(NotFoundException.class);
    }

    private CreateCategoryRequest createCategoryReq(String name) {
        CreateCategoryRequest req = new CreateCategoryRequest();
        setField(req, "name", name); return req;
    }

    private CreateMenuRequest createMenuReq(String name, int price, Long categoryId) {
        CreateMenuRequest req = new CreateMenuRequest();
        setField(req, "name", name); setField(req, "price", price); setField(req, "categoryId", categoryId);
        return req;
    }

    private void setField(Object obj, String field, Object value) {
        try { var f = obj.getClass().getDeclaredField(field); f.setAccessible(true); f.set(obj, value); }
        catch (Exception e) { throw new RuntimeException(e); }
    }
}
