"use client";

import { ComponentType, ReactNode, useEffect, useState } from "react";

export type AnimateOnAppearOptions = {
  delay?: number;
  duration?: number;
  className?: string;
  children?: ReactNode;
};

export function AnimateOnAppear({
  children,
  className = "",
  delay = 0,
  duration = 300,
}: AnimateOnAppearOptions) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);

  return (
    <div
      style={{
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
      }}
      className={`${className} transition-all ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      }`}
    >
      {children}
    </div>
  );
}

export function withAppearAnimation<P extends object>(
  WrappedComponent: ComponentType<P>,
) {
  return function WithAppearAnimation(
    props: P & Omit<AnimateOnAppearOptions, "children">
  ) {
    const { delay = 0, duration = 300, className = "", ...rest } = props as any;

    return (
      <AnimateOnAppear delay={delay} duration={duration} className={className}>
        <WrappedComponent {...(rest as P)} />
      </AnimateOnAppear>
    );
  };
}
