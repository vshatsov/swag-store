/** @format */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function centsToDollarsString(cents: number) {
  const dollars = cents / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(dollars);
}

export type DebouncedRejectedError = Error & { code: "DEBOUNCED" };

function createDebouncedError(
  message = "Debounced by a newer call",
): DebouncedRejectedError {
  const error = new Error(message) as DebouncedRejectedError;
  error.code = "DEBOUNCED";
  return error;
}

type AsyncFn<TArgs extends unknown[], TResult> = (
  ...args: TArgs
) => Promise<TResult>;

interface DebounceOptions {
  leading?: boolean;
}

type DebouncedAsyncFn<TArgs extends unknown[], TResult> = ((
  ...args: TArgs
) => Promise<TResult>) & {
  cancel: (reason?: Error) => void;
  flush: () => Promise<TResult | undefined>;
};

export function debouncePromise<TArgs extends unknown[], TResult>(
  fn: AsyncFn<TArgs, TResult>,
  wait: number,
  options: DebounceOptions = {},
): DebouncedAsyncFn<TArgs, TResult> {
  const { leading = false } = options;

  let timer: ReturnType<typeof setTimeout> | null = null;

  let lastArgs: TArgs | null = null;

  let pendingResolve: ((value: TResult) => void) | null = null;
  let pendingReject: ((reason?: unknown) => void) | null = null;

  const invoke = async () => {
    timer = null;

    const args = lastArgs;
    const resolve = pendingResolve;
    const reject = pendingReject;

    lastArgs = null;
    pendingResolve = null;
    pendingReject = null;

    if (!args || !resolve || !reject) return;

    try {
      const result = await fn(...args);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  };

  const debounced = ((...args: TArgs) => {
    const isFirstCall = !timer;

    // If there's a pending call → reject it
    if (pendingReject) {
      pendingReject(createDebouncedError());
      pendingReject = null;
      pendingResolve = null;
    }

    // LEADING execution
    if (leading && isFirstCall) {
      // Start cooldown timer
      timer = setTimeout(() => {
        timer = null;
      }, wait);

      // Execute immediately
      return fn(...args);
    }

    // TRAILING execution
    lastArgs = args;

    return new Promise<TResult>((resolve, reject) => {
      pendingResolve = resolve;
      pendingReject = reject;

      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        void invoke();
      }, wait);
    });
  }) as DebouncedAsyncFn<TArgs, TResult>;

  debounced.cancel = (reason = createDebouncedError("Debounce cancelled")) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    if (pendingReject) {
      pendingReject(reason);
    }

    lastArgs = null;
    pendingResolve = null;
    pendingReject = null;
  };

  debounced.flush = async () => {
    if (!timer) return undefined;

    clearTimeout(timer);
    await invoke();
    return undefined;
  };

  return debounced;
}

type DelayedFallbackAsyncFn<T> = () => Promise<T>;
type FallbackFn = () => void;

export async function withDelayedFallback<T>(
  asyncFn: DelayedFallbackAsyncFn<T>,
  fallbackFn: FallbackFn,
  delay: number,
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined = undefined;

  const promise = asyncFn();

  const timerPromise = new Promise<void>((resolve) => {
    timer = setTimeout(() => {
      fallbackFn();
      resolve();
    }, delay);
  });

  // Wait whichever happens first
  await Promise.race([promise, timerPromise]);

  // If async finished first → cancel fallback
  clearTimeout(timer);

  // Always return async result
  return promise;
}
