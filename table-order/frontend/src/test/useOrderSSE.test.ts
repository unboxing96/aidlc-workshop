import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useOrderSSE } from '../hooks/useOrderSSE';

class MockEventSource {
  onopen: (() => void) | null = null;
  onmessage: ((event: { data: string }) => void) | null = null;
  onerror: (() => void) | null = null;
  close = vi.fn();
  constructor(public url: string) {
    MockEventSource.instances.push(this);
  }
  static instances: MockEventSource[] = [];
  static reset() { MockEventSource.instances = []; }
}

describe('useOrderSSE', () => {
  beforeEach(() => {
    MockEventSource.reset();
    (global as any).EventSource = MockEventSource;
    localStorage.setItem('adminToken', 'test-token');
  });

  afterEach(() => {
    localStorage.clear();
    delete (global as any).EventSource;
  });

  it('connects to SSE endpoint', () => {
    renderHook(() => useOrderSSE({}));
    expect(MockEventSource.instances).toHaveLength(1);
    expect(MockEventSource.instances[0].url).toContain('/api/admin/sse');
  });

  it('calls onOrderCreated handler', () => {
    const onOrderCreated = vi.fn();
    renderHook(() => useOrderSSE({ onOrderCreated }));

    const es = MockEventSource.instances[0];
    act(() => {
      es.onmessage?.({ data: JSON.stringify({ type: 'ORDER_CREATED', payload: { id: 1 } }) });
    });

    expect(onOrderCreated).toHaveBeenCalledWith({ id: 1 });
  });

  it('closes EventSource on unmount', () => {
    const { unmount } = renderHook(() => useOrderSSE({}));
    const es = MockEventSource.instances[0];
    unmount();
    expect(es.close).toHaveBeenCalled();
  });
});
