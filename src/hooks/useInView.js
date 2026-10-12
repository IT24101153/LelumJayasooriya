import { useEffect, useRef, useState } from 'react';

/**
 * Fires once when the element first scrolls into view, then stops observing.
 * Elements are treated as already visible when the user prefers reduced motion,
 * so animations driven by this hook render in their final state instead.
 */
export function useInView({ threshold = 0.35 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setInView(true);
          observer.disconnect();
        });
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}
