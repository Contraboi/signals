type Listener<T> = (value: T) => void;

export type SignalGetter<T> = (listener?: Listener<T>) => T;
export type SignalSetter<T> = (value: T) => void;

export function createSignal<T>(initialValue: T): [SignalGetter<T>, SignalSetter<T>] {
  const listeners: Listener<T>[] = [];
  let _state = initialValue;

  function notify(value: T) {
    listeners.forEach((listener) => listener(value));
  }

  const state: SignalGetter<T> = (listener) => {
    if (listener) {
      listeners.push(listener);
    }

    return _state;
  };

  const setState: SignalSetter<T> = (value) => {
    _state = value;
    notify(value);
  };

  return [state, setState] as const;
}
