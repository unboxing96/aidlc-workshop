package com.tableorder.common.exception;

import com.tableorder.common.dto.ErrorResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;
import static org.junit.jupiter.api.Assertions.*;

class GlobalExceptionHandlerTest {

    private final GlobalExceptionHandler handler = new GlobalExceptionHandler();

    @Test
    void handleNotFoundException() {
        ResponseEntity<ErrorResponse> res = handler.handle(new NotFoundException("테이블을 찾을 수 없습니다"));
        assertEquals(404, res.getStatusCode().value());
        assertEquals("NOT_FOUND", res.getBody().getCode());
    }

    @Test
    void handleDuplicateException() {
        ResponseEntity<ErrorResponse> res = handler.handle(new DuplicateException("이미 존재합니다"));
        assertEquals(409, res.getStatusCode().value());
        assertEquals("CONFLICT", res.getBody().getCode());
    }

    @Test
    void handleBusinessException() {
        ResponseEntity<ErrorResponse> res = handler.handle(new BusinessException("CUSTOM", "커스텀 에러"));
        assertEquals(400, res.getStatusCode().value());
        assertEquals("CUSTOM", res.getBody().getCode());
    }
}
