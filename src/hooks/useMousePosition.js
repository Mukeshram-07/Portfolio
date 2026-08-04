import { useState, useEffect } from 'react';

export function useMousePosition() {
  const [position, setPosition] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    const handler = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return position;
}
