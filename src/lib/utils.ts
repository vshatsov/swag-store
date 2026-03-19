/** @format */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DebouncedFunction<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): void;
  cancel: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  options?: { leading?: boolean; trailing?: boolean },
): DebouncedFunction<T> {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;

  const leading = options?.leading ?? false;
  const trailing = options?.trailing ?? true;

  const debounced = (...args: Parameters<T>) => {
    const isFirstCall = !timer;

    lastArgs = args;

    if (timer) {
      clearTimeout(timer);
    }

    if (leading && isFirstCall) {
      fn(...args);
    }

    timer = setTimeout(() => {
      if (trailing && (!leading || !isFirstCall)) {
        if (lastArgs) {
          fn(...lastArgs);
        }
      }

      timer = null;
      lastArgs = null;
    }, delay);
  };

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    lastArgs = null;
  };

  return debounced;
}

type AccumulatedFn<T> = {
  (value: T): void;
  flush: () => void;
  cancel: () => void;
};

export function accumulateDebounce<T, K>(
  fn: (items: T[]) => K,
  delay: number,
  options?: { leading?: boolean },
): AccumulatedFn<T> {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let queue: T[] = [];

  const leading = options?.leading ?? false;

  const flush = () => {
    if (queue.length > 0) {
      fn(queue);
      queue = [];
    }
  };

  const debounced = (value: T) => {
    const isFirstCall = !timer;

    queue.push(value);

    if (leading && isFirstCall) {
      flush();
    }

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      flush();
      timer = null;
    }, delay);
  };

  debounced.flush = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    flush();
  };

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    queue = [];
  };

  return debounced;
}

export function centsToDollarsString(cents: number) {
  const dollars = cents / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(dollars);
}
