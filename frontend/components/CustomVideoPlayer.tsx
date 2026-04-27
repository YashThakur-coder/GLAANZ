
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, PictureInPicture, X, AlertCircle } from 'lucide-react';

interface CustomVideoPlayerProps {
  videoId: string;
  title: string;
  thumbnail?: string;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT: any;
  }
}

let isYTLoading = false;

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ videoId, title, thumbnail }) => {
  const [isPlayerActive, setIsPlayerActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const [playerError, setPlayerError] = useState(false);

  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressInterval = useRef<number | null>(null);

  useEffect(() => {
    if (!window.YT && !isYTLoading) {
      isYTLoading = true;
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, []);

  const stopProgressTimer = () => {
    if (progressInterval.current) {
      window.clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  const startProgressTimer = () => {
    stopProgressTimer();
    progressInterval.current = window.setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        try {
          setCurrentTime(playerRef.current.getCurrentTime());
        } catch (e) { }
      }
    }, 500);
  };

  const initializePlayer = () => {
    if (playerRef.current) return;

    if (!window.YT || !window.YT.Player) {
      setTimeout(initializePlayer, 200);
      return;
    }

    const playerId = `youtube-player-${videoId}`;
    const playerElement = document.getElementById(playerId);

    if (!playerElement) {
      setTimeout(initializePlayer, 100);
      return;
    }

    try {
      playerRef.current = new window.YT.Player(playerId, {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: any) => {
            setDuration(event.target.getDuration());
            event.target.unMute();
            setIsMuted(false);
            event.target.playVideo();
          },
          onStateChange: (event: any) => {
            if (event.data === 1) { // YT.PlayerState.PLAYING
              setIsPlaying(true);
              startProgressTimer();
            } else {
              setIsPlaying(false);
              stopProgressTimer();
            }
          },
          onError: (e: any) => {
            console.error("YouTube Player Error:", e.data);
            setPlayerError(true);
          }
        },
      });
    } catch (err) {
      console.error("Failed to initialize YT Player:", err);
      setPlayerError(true);
    }
  };

  useEffect(() => {
    return () => {
      stopProgressTimer();
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) { }
        playerRef.current = null;
      }
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!playerRef.current) return;
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    } catch (e) { }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setVolume(val);
    if (playerRef.current) {
      try {
        playerRef.current.setVolume(val);
        if (val > 0) {
          playerRef.current.unMute();
          setIsMuted(false);
        }
      } catch (e) { }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!playerRef.current) return;
    try {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
        playerRef.current.setVolume(volume || 100);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } catch (e) { }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (playerRef.current) {
      try {
        playerRef.current.seekTo(time, true);
      } catch (e) { }
    }
  };

  const handleFullScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (containerRef.current?.requestFullscreen) {
      containerRef.current.requestFullscreen();
    }
  };

  const toggleFloating = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFloating(!isFloating);
  };

  const handleStartPlayer = () => {
    if (playerError) {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
      return;
    }
    setIsPlayerActive(true);
    setTimeout(initializePlayer, 50);
  };

  const thumbnailUrl = thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <>
      {isFloating && (
        <div className="aspect-[3/4] w-full rounded-2xl bg-stone-900/40 border border-dashed border-stone-800 flex flex-col items-center justify-center text-stone-600 gap-2">
          <PictureInPicture className="w-8 h-8 opacity-20" />
          <span className="text-[10px] font-black uppercase tracking-widest">Watching in Mini Player</span>
        </div>
      )}

      <div
        ref={containerRef}
        className={`relative aspect-[3/4] overflow-hidden cursor-pointer group shadow-2xl border border-stone-800 bg-stone-900 transition-all duration-700 ease-in-out ${isFloating
          ? 'fixed bottom-6 right-6 w-72 md:w-[400px] z-[100] rounded-xl ring-2 ring-amber-500/30 shadow-2xl shadow-stone-950/80 animate-in slide-in-from-bottom-10'
          : 'w-full rounded-2xl'
          }`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={!isPlayerActive ? handleStartPlayer : undefined}
      >
        {!isPlayerActive ? (
          <>
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover transition-all duration-700 opacity-70 group-hover:opacity-100 group-hover:scale-110 group-hover:blur-[1px]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/0.jpg`;
              }}
            />
            {playerError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950/80 text-amber-500 z-10 gap-3">
                <AlertCircle className="w-10 h-10" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Playback Error - Click to watch on YouTube</span>
              </div>
            )}
            <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/50 transition-colors duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-stone-950/20"></div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-24 h-24 rounded-full border border-amber-500/0 group-hover:border-amber-500/40 group-hover:scale-[1.6] group-hover:animate-ping transition-all duration-1000"></div>
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-stone-950/80 backdrop-blur-md border border-white/10 group-hover:border-amber-500/50 flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-115 group-hover:bg-amber-500 group-hover:shadow-[0_0_35px_rgba(245,158,11,0.5)]">
                  <Play className="w-7 h-7 md:w-9 md:h-9 text-amber-500 group-hover:text-stone-950 fill-current ml-1.5 transition-colors duration-300" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-black relative">
            <div id={`youtube-player-${videoId}`} className="w-full h-full"></div>
            <div
              className={`absolute inset-0 flex flex-col justify-end transition-opacity duration-300 ${isHovering || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-b from-stone-950/90 to-transparent flex justify-between items-start">
                <h4 className="text-white font-serif text-xs md:text-lg font-bold truncate max-w-[80%]">{title}</h4>
                {isFloating && (
                  <button
                    onClick={toggleFloating}
                    className="p-1.5 rounded-full bg-stone-900/80 text-white hover:bg-amber-500 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="absolute inset-0 flex items-center justify-center" onClick={togglePlay}>
                {!isPlaying && (
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-stone-900/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <Play className="w-6 h-6 md:w-10 md:h-10 text-white fill-white ml-1" />
                  </div>
                )}
              </div>

              <div className="p-3 md:p-4 bg-gradient-to-t from-stone-950/95 to-transparent space-y-2">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-6">
                    <button onClick={togglePlay} className="text-white hover:text-amber-400 transition-colors">
                      {isPlaying ? <Pause className="w-4 h-4 md:w-5 md:h-5 fill-current" /> : <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />}
                    </button>
                    <div className="flex items-center gap-2 group/volume">
                      <button onClick={toggleMute} className="text-white hover:text-amber-400 transition-colors">
                        {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={toggleFloating} className={`transition-colors ${isFloating ? 'text-amber-500' : 'text-white hover:text-amber-400'}`}>
                      <PictureInPicture className="w-4 h-4" />
                    </button>
                    <button onClick={handleFullScreen} className="text-white hover:text-amber-400 transition-colors">
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomVideoPlayer;
