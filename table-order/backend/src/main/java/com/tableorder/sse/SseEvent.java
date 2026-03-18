package com.tableorder.sse;

import lombok.*;

@Getter @AllArgsConstructor
public class SseEvent {
    private SseEventType type;
    private Object payload;

    public static SseEvent of(SseEventType type, Object payload) {
        return new SseEvent(type, payload);
    }
}
