package com.tableorder.sse;

import lombok.*;

@Getter @AllArgsConstructor
public class SseEvent {
    private SseEventType type;
    private Object data;

    public static SseEvent of(SseEventType type, Object data) {
        return new SseEvent(type, data);
    }
}
