import { useEffect, useRef, useState, useCallback } from 'react';

interface UseOrderSSEOptions {
  onOrderCreated?: (payload: unknown) => void;
  onOrderStatusChanged?: (payload: unknown) => void;
  onOrderDeleted?: (payload: unknown) => void;
  onTableSessionCompleted?: (payload: unknown) => void;
}

export function useOrderSSE(options: UseOrderSSEOptions) {
  const [connected, setConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const connect = useCallback(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    const es = new EventSource(
      `http://localhost:8080/api/admin/sse?token=${encodeURIComponent(token)}`
    );

    es.onopen = () => setConnected(true);

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const handlers: Record<string, ((p: unknown) => void) | undefined> = {
          ORDER_CREATED: optionsRef.current.onOrderCreated,
          ORDER_STATUS_CHANGED: optionsRef.current.onOrderStatusChanged,
          ORDER_DELETED: optionsRef.current.onOrderDeleted,
          TABLE_SESSION_COMPLETED: optionsRef.current.onTableSessionCompleted,
        };
        handlers[data.type]?.(data.payload);
      } catch { /* ignore parse errors */ }
    };

    es.onerror = () => {
      setConnected(false);
      es.close();
      setTimeout(connect, 1000);
    };

    eventSourceRef.current = es;
  }, []);

  useEffect(() => {
    connect();
    return () => eventSourceRef.current?.close();
  }, [connect]);

  return { connected };
}
