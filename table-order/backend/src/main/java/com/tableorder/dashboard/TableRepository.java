package com.tableorder.dashboard;

import com.tableorder.entity.TableEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

// TODO: [통합] Unit 1(테이블/인증)의 TableRepository가 완성되면 이 파일 삭제하고 Unit 1의 Repository를 참조할 것
// 통합 시 패키지 경로 변경: com.tableorder.table.TableRepository
public interface TableRepository extends JpaRepository<TableEntity, Long> {
    List<TableEntity> findAllByOrderByTableNumberAsc();
}
