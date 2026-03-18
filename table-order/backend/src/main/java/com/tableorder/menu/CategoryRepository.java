package com.tableorder.menu;

import com.tableorder.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    boolean existsByName(String name);
    List<CategoryEntity> findAllByOrderByDisplayOrderAsc();
}
