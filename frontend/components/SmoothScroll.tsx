import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
    children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis with luxury settings (tuned for 120 FPS capable devices)
        const lenis = new Lenis({
            duration: 1.5, // Slightly longer duration for a "heavier", more premium momentum feel
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
            infinite: false,
        });

        lenisRef.current = lenis;
        (window as any).lenis = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Synchronize with react state changes if needed (e.g. for modal opens)
        const observer = new MutationObserver(() => {
            lenis.resize();
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            lenis.destroy();
            observer.disconnect();
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
