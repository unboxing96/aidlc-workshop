import { useEffect, useRef, useCallback } from 'react';
import type { SseEventType } from '../types';

interface UseOrderSSEOptions {
  url: string;
  onEvent: (type: SseEventType, payload: unknown) => void;
  enabled?: boolean;
}

export function useOrderSSE({ url, onEvent, enabled = true }: UseOrderSSEOptions) {
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;

  const eventSourceRef = useRef<EventSource | null>(null);

  const connect = useCallback(() => {
    if (!enabled) return;

    const es = new EventSource(url);
    eventSourceRef.current = es;

    const eventTypes: SseEventType[] = [
      'ORDER_CREATED',
      'ORDER_STATUS_CHANGED',
      'ORDER_DELETED',
      'TABLE_SESSION_COMPLETED',
    ];

    eventTypes.forEach((type) => {
      es.addEventListener(type, (e: MessageEvent) => {
        try {
          const payload = JSON.parse(e.data);
          onEventRef.current(type, payload);
        } catch {
          onEventRef.current(type, e.data);
        }
      });
    });

    es.onerror = () => {
      es.close();
      eventSourceRef.current = null;
      // 자동 재연결: 3초 후
      setTimeout(connect, 3000);
    };
  }, [url, enabled]);

  useEffect(() => {
    connect();
    return () => {
      eventSourceRef.current?.close();
      eventSourceRef.current = null;
    };
  }, [connect]);
}
