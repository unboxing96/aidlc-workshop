package com.tableorder.menu;

import com.tableorder.menu.dto.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    @GetMapping("/api/categories")
    public ResponseEntity<List<CategoryResponse>> getCategories() {
        return ResponseEntity.ok(menuService.getCategories());
    }

    @PostMapping("/api/categories")
    public ResponseEntity<CategoryResponse> createCategory(@Valid @RequestBody CreateCategoryRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(menuService.createCategory(request));
    }

    @GetMapping("/api/menus")
    public ResponseEntity<List<MenuResponse>> getMenus(@RequestParam(required = false) Long categoryId) {
        return ResponseEntity.ok(menuService.getMenus(categoryId));
    }

    @PostMapping("/api/menus")
    public ResponseEntity<MenuResponse> createMenu(@Valid @RequestBody CreateMenuRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(menuService.createMenu(request));
    }

    @PutMapping("/api/menus/{id}")
    public ResponseEntity<MenuResponse> updateMenu(@PathVariable Long id, @RequestBody UpdateMenuRequest request) {
        return ResponseEntity.ok(menuService.updateMenu(id, request));
    }

    @DeleteMapping("/api/menus/{id}")
    public ResponseEntity<Void> deleteMenu(@PathVariable Long id) {
        menuService.deleteMenu(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/api/menus/order")
    public ResponseEntity<Void> updateMenuOrder(@Valid @RequestBody MenuOrderRequest request) {
        menuService.updateMenuOrder(request);
        return ResponseEntity.ok().build();
    }
}
