import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useOrderSSE } from '../hooks/useOrderSSE';

class MockEventSource {
  url: string;
  listeners: Record<string, ((e: MessageEvent) => void)[]> = {};
  onerror: ((e: Event) => void) | null = null;
  closed = false;

  constructor(url: string) {
    this.url = url;
    MockEventSource.instances.push(this);
  }

  addEventListener(type: string, cb: (e: MessageEvent) => void) {
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type].push(cb);
  }

  close() {
    this.closed = true;
  }

  simulateEvent(type: string, data: string) {
    this.listeners[type]?.forEach((cb) =>
      cb({ data } as MessageEvent)
    );
  }

  static instances: MockEventSource[] = [];
  static reset() {
    MockEventSource.instances = [];
  }
}

beforeEach(() => {
  MockEventSource.reset();
  vi.stubGlobal('EventSource', MockEventSource);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('useOrderSSE', () => {
  it('EventSource 연결을 생성한다', () => {
    const onEvent = vi.fn();
    renderHook(() =>
      useOrderSSE({ url: 'http://localhost:8080/api/sse/orders/admin', onEvent })
    );
    expect(MockEventSource.instances).toHaveLength(1);
    expect(MockEventSource.instances[0].url).toBe('http://localhost:8080/api/sse/orders/admin');
  });

  it('이벤트를 수신하면 onEvent 콜백을 호출한다', () => {
    const onEvent = vi.fn();
    renderHook(() =>
      useOrderSSE({ url: 'http://localhost:8080/api/sse/orders/admin', onEvent })
    );
    const es = MockEventSource.instances[0];
    act(() => {
      es.simulateEvent('ORDER_CREATED', JSON.stringify({ orderId: 1 }));
    });
    expect(onEvent).toHaveBeenCalledWith('ORDER_CREATED', { orderId: 1 });
  });

  it('unmount 시 EventSource를 닫는다', () => {
    const onEvent = vi.fn();
    const { unmount } = renderHook(() =>
      useOrderSSE({ url: 'http://localhost:8080/api/sse/orders/admin', onEvent })
    );
    const es = MockEventSource.instances[0];
    unmount();
    expect(es.closed).toBe(true);
  });

  it('enabled=false이면 연결하지 않는다', () => {
    const onEvent = vi.fn();
    renderHook(() =>
      useOrderSSE({ url: 'http://localhost:8080/api/sse/orders/admin', onEvent, enabled: false })
    );
    expect(MockEventSource.instances).toHaveLength(0);
  });
});
