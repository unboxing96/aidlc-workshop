package com.tableorder.common.exception;

import com.tableorder.common.dto.ErrorResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import static org.junit.jupiter.api.Assertions.*;

class GlobalExceptionHandlerTest {

    private final GlobalExceptionHandler handler = new GlobalExceptionHandler();

    @Test
    void handleNotFound() {
        ResponseEntity<ErrorResponse> response = handler.handleNotFound(new NotFoundException("not found"));
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("NOT_FOUND", response.getBody().getCode());
    }

    @Test
    void handleDuplicate() {
        ResponseEntity<ErrorResponse> response = handler.handleDuplicate(new DuplicateException("duplicate"));
        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals("CONFLICT", response.getBody().getCode());
    }

    @Test
    void handleGeneral() {
        ResponseEntity<ErrorResponse> response = handler.handleGeneral(new RuntimeException("error"));
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("INTERNAL_ERROR", response.getBody().getCode());
    }
}
