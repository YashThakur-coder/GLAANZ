import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

interface IntersectionVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    threshold?: number;
}

const IntersectionVideo = forwardRef<HTMLVideoElement, IntersectionVideoProps>(({
    threshold = 0.1,
    children,
    ...props
}, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    // Forward the internal ref to the parent ref
    useImperativeHandle(ref, () => videoRef.current!);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (videoRef.current) {
                    if (entry.isIntersecting) {
                        videoRef.current.play().catch(() => { });
                    } else {
                        videoRef.current.pause();
                    }
                }
            },
            { threshold }
        );

        if (videoRef.current) observer.observe(videoRef.current);

        return () => {
            if (videoRef.current) observer.unobserve(videoRef.current);
            observer.disconnect();
        };
    }, [threshold]);

    return (
        <video ref={videoRef} {...props}>
            {children}
        </video>
    );
});

IntersectionVideo.displayName = 'IntersectionVideo';

export default IntersectionVideo;
