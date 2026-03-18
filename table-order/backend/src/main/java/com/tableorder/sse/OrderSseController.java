package com.tableorder.sse;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/sse/orders")
@RequiredArgsConstructor
public class OrderSseController {

    private final SseEmitterService sseEmitterService;

    @GetMapping(value = "/admin", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribeAdmin() {
        return sseEmitterService.createAdminEmitter();
    }

    @GetMapping(value = "/table/{tableId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribeTable(@PathVariable Long tableId) {
        return sseEmitterService.createTableEmitter(tableId);
    }
}
