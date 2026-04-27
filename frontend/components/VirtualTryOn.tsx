import React, { useEffect, useRef, useState } from 'react';
import { X, Camera, SwitchCamera, Loader2 } from 'lucide-react';
import { Product, Category } from '../types';

declare global {
    interface Window {
        FaceMesh: any;
        Camera: any;
    }
}

interface VirtualTryOnProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ product, isOpen, onClose }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const faceMeshRef = useRef<any>(null);
    const cameraRef = useRef<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeCamera, setActiveCamera] = useState<'user' | 'environment'>('user');

    // Load scripts dynamically to avoid Vite bundler issues with mediapipe
    useEffect(() => {
        if (!isOpen) return;

        const loadScripts = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Define script URLs
                const urls = [
                    'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js',
                    'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js'
                ];

                // Load all scripts
                for (const url of urls) {
                    if (!document.querySelector(`script[src="${url}"]`)) {
                        await new Promise<void>((resolve, reject) => {
                            const script = document.createElement('script');
                            script.src = url;
                            script.crossOrigin = 'anonymous';
                            script.onload = () => resolve();
                            script.onerror = () => reject(new Error(`Failed to load ${url}`));
                            document.body.appendChild(script);
                        });
                    }
                }

                initFaceMesh();
            } catch (err) {
                console.error("Script load error:", err);
                setError("Failed to load AR engines.");
                setIsLoading(false);
            }
        };

        loadScripts();

        return () => {
            stopCamera();
        };
    }, [isOpen]);

    const stopCamera = () => {
        if (cameraRef.current) {
            cameraRef.current.stop();
        }
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    };

    const toggleCamera = () => {
        stopCamera();
        setActiveCamera(prev => prev === 'user' ? 'environment' : 'user');
        setTimeout(() => {
            initFaceMesh();
        }, 100);
    };

    const initFaceMesh = () => {
        if (!window.FaceMesh || !window.Camera) {
            setTimeout(initFaceMesh, 100);
            return;
        }

        const faceMesh = new window.FaceMesh({
            locateFile: (file: string) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
            }
        });

        faceMesh.setOptions({
            maxNumFaces: 1,
            refineLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        faceMesh.onResults(onResults);
        faceMeshRef.current = faceMesh;

        if (videoRef.current) {
            const camera = new window.Camera(videoRef.current, {
                onFrame: async () => {
                    if (videoRef.current && faceMeshRef.current) {
                        await faceMeshRef.current.send({ image: videoRef.current });
                    }
                },
                width: 1280,
                height: 720,
                facingMode: activeCamera
            });
            camera.start().then(() => {
                setIsLoading(false);
            }).catch((e: Error) => {
                console.error("Camera error:", e);
                setError("Could not access camera. Please check permissions.");
                setIsLoading(false);
            });
            cameraRef.current = camera;
        }
    };

    // Image assets for overlay
    const overlayImage = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        if (product.arAsset) {
            const img = new Image();
            img.src = product.arAsset;
            img.crossOrigin = "anonymous";
            img.onload = () => {
                overlayImage.current = img;
            };
        } else {
            // Fallback visualization if no arAsset is provided
            overlayImage.current = null;
        }
    }, [product]);

    const onResults = (results: any) => {
        if (!canvasRef.current || !videoRef.current) return;

        const canvasCtx = canvasRef.current.getContext('2d');
        if (!canvasCtx) return;

        // Set canvas dimensions to match video exactly
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        const width = canvasRef.current.width;
        const height = canvasRef.current.height;

        canvasCtx.save();
        canvasCtx.clearRect(0, 0, width, height);

        // Flip context horizontally if using front camera (user)
        if (activeCamera === 'user') {
            canvasCtx.translate(width, 0);
            canvasCtx.scale(-1, 1);
        }

        if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
            const landmarks = results.multiFaceLandmarks[0];

            if (overlayImage.current && product.arAsset) {
                drawJewellery(canvasCtx, landmarks, width, height);
            } else {
                // Fallback: Just draw a wireframe or dots on key points to show it's "working"
                canvasCtx.fillStyle = '#f59e0b';
                // Neck/Chin (152)
                drawPoint(canvasCtx, landmarks[152], width, height);
                // Left Ear (234)
                drawPoint(canvasCtx, landmarks[234], width, height);
                // Right Ear (454)
                drawPoint(canvasCtx, landmarks[454], width, height);
            }
        }
        canvasCtx.restore();
    };

    const drawPoint = (ctx: CanvasRenderingContext2D, point: any, width: number, height: number) => {
        ctx.beginPath();
        ctx.arc(point.x * width, point.y * height, 5, 0, 2 * Math.PI);
        ctx.fill();
    };

    const drawJewellery = (ctx: CanvasRenderingContext2D, landmarks: any[], width: number, height: number) => {
        if (!overlayImage.current) return;

        // Logic based on category
        const isEarring = [Category.TEMPLE, Category.AMERICAN_DIAMOND, Category.KUNDAN, Category.OXIDIZED].includes(product.category) && (product.name.toLowerCase().includes('earring') || product.name.toLowerCase().includes('jhumka') || product.name.toLowerCase().includes('chandbali') || product.name.toLowerCase().includes('studs'));

        // For simplicity, if it's earrings, draw on both ears. Otherwise, assume necklace.
        if (isEarring) {
            // Left Ear
            const leftEar = landmarks[234];
            drawOverlayAt(ctx, leftEar, width, height, 0.15); // Adjust scale as needed

            // Right Ear
            const rightEar = landmarks[454];
            drawOverlayAt(ctx, rightEar, width, height, 0.15);
        } else {
            // Necklace (attach to chin / lower neck approx)
            const chin = landmarks[152];
            // Offset Y down slightly
            const neckPoint = { x: chin.x, y: chin.y + 0.1 };
            drawOverlayAt(ctx, neckPoint, width, height, 0.4);
        }
    };

    const drawOverlayAt = (ctx: CanvasRenderingContext2D, point: any, width: number, height: number, scaleFactor: number) => {
        const img = overlayImage.current!;
        const px = point.x * width;
        const py = point.y * height;

        // Calculate size based on face width or static scale
        const drawWidth = width * scaleFactor;
        const drawHeight = (img.height / img.width) * drawWidth;

        ctx.drawImage(
            img,
            px - drawWidth / 2,
            py, // Start from top of point going down
            drawWidth,
            drawHeight
        );
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] bg-stone-950 flex flex-col animate-in fade-in duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-stone-950/80 to-transparent">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center p-2">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-sm sm:text-base leading-tight">{product.name}</h3>
                        <span className="text-amber-500 text-[10px] sm:text-xs font-black uppercase tracking-widest">Virtual Try-On</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                    <button onClick={toggleCamera} className="p-3 sm:p-4 rounded-full bg-stone-900/50 backdrop-blur-xl border border-stone-800 text-stone-100 hover:text-amber-500 hover:border-amber-500/50 transition-all">
                        <SwitchCamera className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    <button onClick={onClose} className="p-3 sm:p-4 rounded-full bg-stone-900/50 backdrop-blur-xl border border-stone-800 text-stone-100 hover:text-red-500 hover:border-red-500/50 transition-all">
                        <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>
            </div>

            {/* Camera Area */}
            <div ref={containerRef} className="flex-grow relative overflow-hidden flex items-center justify-center bg-black">
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950 z-20">
                        <Loader2 className="w-10 h-10 text-amber-500 animate-spin mb-4" />
                        <p className="text-stone-400 font-black text-xs uppercase tracking-widest animate-pulse">Initializing Mirror Engine...</p>
                    </div>
                )}

                {error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950 z-20 px-6 text-center">
                        <Camera className="w-12 h-12 text-red-500 mb-4 opacity-50" />
                        <p className="text-white font-bold mb-2">{error}</p>
                        <p className="text-stone-500 text-sm max-w-sm">Please ensure camera permissions are granted and you are on a secure (HTTPS) connection or localhost.</p>
                    </div>
                )}

                <video
                    ref={videoRef}
                    className={`w-full h-full object-cover ${activeCamera === 'user' ? 'scale-x-[-1]' : ''}`}
                    playsInline
                    muted
                ></video>
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                ></canvas>

                {/* Bottom Banner */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-stone-900/80 backdrop-blur-xl border border-stone-800 px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-white">Live AR Active</span>
                </div>
            </div>
        </div>
    );
};

export default VirtualTryOn;
