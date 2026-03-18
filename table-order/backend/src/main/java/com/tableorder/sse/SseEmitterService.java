package com.tableorder.sse;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class SseEmitterService {

    private static final long TIMEOUT = 30 * 60 * 1000L; // 30분

    private final List<SseEmitter> adminEmitters = new CopyOnWriteArrayList<>();
    private final ConcurrentHashMap<Long, List<SseEmitter>> tableEmitters = new ConcurrentHashMap<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public SseEmitter createAdminEmitter() {
        SseEmitter emitter = new SseEmitter(TIMEOUT);
        adminEmitters.add(emitter);
        emitter.onCompletion(() -> adminEmitters.remove(emitter));
        emitter.onTimeout(() -> adminEmitters.remove(emitter));
        emitter.onError(e -> adminEmitters.remove(emitter));
        return emitter;
    }

    public SseEmitter createTableEmitter(Long tableId) {
        SseEmitter emitter = new SseEmitter(TIMEOUT);
        tableEmitters.computeIfAbsent(tableId, k -> new CopyOnWriteArrayList<>()).add(emitter);
        Runnable remove = () -> {
            List<SseEmitter> emitters = tableEmitters.get(tableId);
            if (emitters != null) {
                emitters.remove(emitter);
                if (emitters.isEmpty()) tableEmitters.remove(tableId);
            }
        };
        emitter.onCompletion(remove);
        emitter.onTimeout(remove);
        emitter.onError(e -> remove.run());
        return emitter;
    }

    public void broadcastToAdmin(SseEvent event) {
        sendToEmitters(adminEmitters, event);
    }

    public void sendToTable(Long tableId, SseEvent event) {
        List<SseEmitter> emitters = tableEmitters.get(tableId);
        if (emitters != null) {
            sendToEmitters(emitters, event);
        }
    }

    private void sendToEmitters(List<SseEmitter> emitters, SseEvent event) {
        List<SseEmitter> dead = new CopyOnWriteArrayList<>();
        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(SseEmitter.event()
                        .name(event.getType().name())
                        .data(objectMapper.writeValueAsString(event.getPayload())));
            } catch (IOException e) {
                dead.add(emitter);
            }
        }
        emitters.removeAll(dead);
    }
}
