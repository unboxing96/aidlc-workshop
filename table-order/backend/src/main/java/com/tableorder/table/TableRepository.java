package com.tableorder.table;

import com.tableorder.entity.TableEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TableRepository extends JpaRepository<TableEntity, Long> {
    Optional<TableEntity> findByAccessToken(String accessToken);
}
