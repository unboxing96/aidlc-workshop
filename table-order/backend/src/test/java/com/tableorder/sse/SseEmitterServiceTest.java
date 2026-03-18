package com.tableorder.sse;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import static org.assertj.core.api.Assertions.*;

class SseEmitterServiceTest {

    private SseEmitterService service;

    @BeforeEach
    void setUp() {
        service = new SseEmitterService();
    }

    @Test
    void createAdminEmitter_returnsNonNull() {
        SseEmitter emitter = service.createAdminEmitter();
        assertThat(emitter).isNotNull();
        assertThat(emitter.getTimeout()).isEqualTo(30 * 60 * 1000L);
    }

    @Test
    void createTableEmitter_returnsNonNull() {
        SseEmitter emitter = service.createTableEmitter(1L);
        assertThat(emitter).isNotNull();
        assertThat(emitter.getTimeout()).isEqualTo(30 * 60 * 1000L);
    }

    @Test
    void broadcastToAdmin_noEmitters_doesNotThrow() {
        SseEvent event = SseEvent.of(SseEventType.ORDER_CREATED, "test");
        assertThatCode(() -> service.broadcastToAdmin(event)).doesNotThrowAnyException();
    }

    @Test
    void sendToTable_noEmitters_doesNotThrow() {
        SseEvent event = SseEvent.of(SseEventType.ORDER_CREATED, "test");
        assertThatCode(() -> service.sendToTable(99L, event)).doesNotThrowAnyException();
    }

    @Test
    void broadcastToAdmin_withEmitter_sendsEvent() {
        SseEmitter emitter = service.createAdminEmitter();
        SseEvent event = SseEvent.of(SseEventType.ORDER_CREATED, "payload");
        // emitter가 완료되지 않은 상태에서 전송 시 예외 없이 동작
        assertThatCode(() -> service.broadcastToAdmin(event)).doesNotThrowAnyException();
    }

    @Test
    void sendToTable_withEmitter_sendsEvent() {
        service.createTableEmitter(1L);
        SseEvent event = SseEvent.of(SseEventType.ORDER_STATUS_CHANGED, "payload");
        assertThatCode(() -> service.sendToTable(1L, event)).doesNotThrowAnyException();
    }

    @Test
    void createMultipleTableEmitters_sameTables() {
        SseEmitter e1 = service.createTableEmitter(1L);
        SseEmitter e2 = service.createTableEmitter(1L);
        assertThat(e1).isNotSameAs(e2);
    }
}
