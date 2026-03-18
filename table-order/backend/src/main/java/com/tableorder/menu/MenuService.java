package com.tableorder.menu;

import com.tableorder.common.exception.DuplicateException;
import com.tableorder.common.exception.NotFoundException;
import com.tableorder.entity.CategoryEntity;
import com.tableorder.entity.MenuEntity;
import com.tableorder.menu.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuRepository menuRepository;
    private final CategoryRepository categoryRepository;

    public List<CategoryResponse> getCategories() {
        return categoryRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(CategoryResponse::from).toList();
    }

    public CategoryResponse createCategory(CreateCategoryRequest request) {
        if (categoryRepository.existsByName(request.getName())) {
            throw new DuplicateException("이미 존재하는 카테고리명입니다");
        }
        int nextOrder = (int) categoryRepository.count();
        CategoryEntity category = CategoryEntity.builder()
                .name(request.getName()).displayOrder(nextOrder).build();
        return CategoryResponse.from(categoryRepository.save(category));
    }

    public List<MenuResponse> getMenus(Long categoryId) {
        if (categoryId != null) {
            return menuRepository.findByCategoryIdOrderByDisplayOrderAsc(categoryId).stream()
                    .map(MenuResponse::from).toList();
        }
        return menuRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(MenuResponse::from).toList();
    }

    public MenuResponse createMenu(CreateMenuRequest request) {
        if (!categoryRepository.existsById(request.getCategoryId())) {
            throw new NotFoundException("카테고리를 찾을 수 없습니다");
        }
        int nextOrder = menuRepository.countByCategoryId(request.getCategoryId());
        MenuEntity menu = MenuEntity.builder()
                .name(request.getName()).price(request.getPrice())
                .description(request.getDescription()).imageUrl(request.getImageUrl())
                .categoryId(request.getCategoryId()).displayOrder(nextOrder).build();
        return MenuResponse.from(menuRepository.save(menu));
    }

    public MenuResponse updateMenu(Long id, UpdateMenuRequest request) {
        MenuEntity menu = menuRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("메뉴를 찾을 수 없습니다"));
        if (request.getName() != null) menu.setName(request.getName());
        if (request.getPrice() != null) menu.setPrice(request.getPrice());
        if (request.getDescription() != null) menu.setDescription(request.getDescription());
        if (request.getImageUrl() != null) menu.setImageUrl(request.getImageUrl());
        if (request.getCategoryId() != null) {
            if (!categoryRepository.existsById(request.getCategoryId())) {
                throw new NotFoundException("카테고리를 찾을 수 없습니다");
            }
            menu.setCategoryId(request.getCategoryId());
        }
        return MenuResponse.from(menuRepository.save(menu));
    }

    public void deleteMenu(Long id) {
        if (!menuRepository.existsById(id)) {
            throw new NotFoundException("메뉴를 찾을 수 없습니다");
        }
        menuRepository.deleteById(id);
    }

    @Transactional
    public void updateMenuOrder(MenuOrderRequest request) {
        for (MenuOrderRequest.MenuOrderItem item : request.getItems()) {
            MenuEntity menu = menuRepository.findById(item.getId())
                    .orElseThrow(() -> new NotFoundException("메뉴를 찾을 수 없습니다"));
            menu.setDisplayOrder(item.getDisplayOrder());
            menuRepository.save(menu);
        }
    }
}
