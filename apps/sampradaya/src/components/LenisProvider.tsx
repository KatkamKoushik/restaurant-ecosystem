"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export const LenisProvider = ({ children }: { children: any }) => {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
};
