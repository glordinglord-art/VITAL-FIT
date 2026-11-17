"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  VSL_CHAPTERS,
  VSL_TOTAL_SECONDS,
  VSL_VIDEO_URL,
  type VslBeat,
  type VslChapter,
} from "../vsl-data";

interface VslPlayerProps {
  onOpenReservation: () => void;
}

function formatTime(totalSeconds: number): string {
  const clamped = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function getActiveChapterAndBeat(currentTime: number): {
  chapter: VslChapter;
  chapterIndex: number;
  beat: VslBeat;
} {
  let chapterIndex = 0;
  for (let i = 0; i < VSL_CHAPTERS.length; i++) {
    if (currentTime >= VSL_CHAPTERS[i].startSeconds) {
      chapterIndex = i;
    }
  }
  const chapter = VSL_CHAPTERS[chapterIndex];
  let beat = chapter.beats[0];
  for (const b of chapter.beats) {
    if (currentTime >= b.atSeconds) {
      beat = b;
    }
  }
  return { chapter, chapterIndex, beat };
}

export default function VslPlayer({ onOpenReservation }: VslPlayerProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState<1 | 1.25 | 1.5>(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(VSL_TOTAL_SECONDS);
  const [isOutOfView, setIsOutOfView] = useState(false);
  const [dockDismissed, setDockDismissed] = useState(false);

  // Track if main VSL stage is scrolled out of view for the floating mini-dock
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOutOfView(!entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Mockup playback timer when no real MP4 URL is configured
  useEffect(() => {
    if (VSL_VIDEO_URL || !isPlaying) return;
    const intervalMs = 200;
    const id = window.setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + (intervalMs / 1000) * speed;
        if (next >= VSL_TOTAL_SECONDS) {
          setIsPlaying(false);
          return VSL_TOTAL_SECONDS;
        }
        return next;
      });
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [isPlaying, speed]);

  // Sync speed & mute if real <video> is used
  useEffect(() => {
    if (!VSL_VIDEO_URL || !videoRef.current) return;
    videoRef.current.playbackRate = speed;
    videoRef.current.muted = isMuted;
  }, [speed, isMuted]);

  const mappedTime =
    duration > 0 ? (currentTime / duration) * VSL_TOTAL_SECONDS : 0;

  const { chapter, chapterIndex, beat } = useMemo(
    () => getActiveChapterAndBeat(mappedTime),
    [mappedTime]
  );

  const progressPct =
    duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const showFloatingDock = isOutOfView && isPlaying && !dockDismissed;

  const togglePlay = () => {
    if (VSL_VIDEO_URL && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
      return;
    }
    if (currentTime >= duration) {
      setCurrentTime(0);
    }
    setDockDismissed(false);
    setIsPlaying((p) => !p);
  };

  const seekTo = (seconds: number, autoPlay = true) => {
    const clamped = Math.max(0, Math.min(duration, seconds));
    setCurrentTime(clamped);
    if (VSL_VIDEO_URL && videoRef.current) {
      videoRef.current.currentTime = clamped;
      if (autoPlay) {
        videoRef.current.play();
      }
    }
    if (autoPlay) {
      setDockDismissed(false);
      setIsPlaying(true);
    }
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    seekTo(ratio * duration, isPlaying);
  };

  const cycleSpeed = () => {
    setSpeed((prev) => (prev === 1 ? 1.25 : prev === 1.25 ? 1.5 : 1));
  };

  return (
    <>
      <div ref={stageRef} className="w-full">
        {/* 16:9 VSL Cinema Frame */}
        <div className="relative w-full aspect-video bg-[#0d0d0d] overflow-hidden border border-[#262626]">
          {VSL_VIDEO_URL ? (
            <video
              ref={videoRef}
              src={VSL_VIDEO_URL}
              poster="/images/gym-hero-vsl.jpg"
              preload="metadata"
              className="w-full h-full object-contain bg-[#000000]"
              playsInline
              onLoadedMetadata={(e) => {
                if (e.currentTarget.duration && Number.isFinite(e.currentTarget.duration)) {
                  setDuration(e.currentTarget.duration);
                }
              }}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />
          ) : (
            <>
              {/* Active Chapter Visual */}
              <Image
                key={chapter.id}
                src={chapter.image}
                alt={chapter.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 1200px"
                className={`object-cover grayscale contrast-125 transition-opacity duration-500 ${
                  isPlaying ? "vsl-ken-burns opacity-55" : "opacity-45"
                }`}
                priority
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-black/55"
              />
            </>
          )}

          {/* Top HUD inside player */}
          <div className="absolute top-0 inset-x-0 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 z-20 pointer-events-none">
            <div className="flex items-center gap-3">
              <span
                className="inline-block px-2.5 py-1 text-[13px] font-bold uppercase tracking-wider text-[#000000]"
                style={{ backgroundColor: chapter.accentColor }}
              >
                {chapter.code}
              </span>
              <span className="hidden sm:inline text-[14px] font-medium text-[#ffffff]/90">
                {chapter.title}
              </span>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              {/* Audio Waveform Indicator */}
              <div
                className="flex items-end gap-[3px] h-4 px-2"
                aria-hidden="true"
              >
                <span
                  className={`w-[3px] h-full bg-[#00f0ff] origin-bottom ${
                    isPlaying && !isMuted ? "eq-bar-1" : "scale-y-[0.3]"
                  }`}
                />
                <span
                  className={`w-[3px] h-full bg-[#00f0ff] origin-bottom ${
                    isPlaying && !isMuted ? "eq-bar-2" : "scale-y-[0.5]"
                  }`}
                />
                <span
                  className={`w-[3px] h-full bg-[#00f0ff] origin-bottom ${
                    isPlaying && !isMuted ? "eq-bar-3" : "scale-y-[0.25]"
                  }`}
                />
                <span
                  className={`w-[3px] h-full bg-[#00f0ff] origin-bottom ${
                    isPlaying && !isMuted ? "eq-bar-4" : "scale-y-[0.4]"
                  }`}
                />
              </div>

              <button
                type="button"
                onClick={cycleSpeed}
                className="h-8 px-2.5 bg-[#000000]/80 text-[#ffffff] text-[13px] font-bold border border-[#ffffff]/25 hover:border-[#00f0ff] transition-colors cursor-pointer"
                aria-label={`Velocidad de reproducción ${speed}x`}
              >
                {speed}x
              </button>

              <button
                type="button"
                onClick={() => setIsMuted((m) => !m)}
                className="h-8 px-2.5 bg-[#000000]/80 text-[#ffffff] text-[13px] font-medium border border-[#ffffff]/25 hover:border-[#00f0ff] transition-colors cursor-pointer"
                aria-label={isMuted ? "Activar sonido" : "Silenciar"}
              >
                {isMuted ? "SIN AUDIO" : "AUDIO ON"}
              </button>
            </div>
          </div>

          {/* Center Play Button / Kinetic VSL Subtitles */}
          <div
            onClick={togglePlay}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                togglePlay();
              }
            }}
            aria-label={isPlaying ? "Pausar video VSL" : "Reproducir video VSL"}
            className="absolute inset-0 flex flex-col items-center justify-center px-5 sm:px-12 text-center cursor-pointer z-10"
          >
            {!isPlaying && (
              <div className="mb-5 sm:mb-6 flex flex-col items-center gap-3">
                <span className="vf-play-pulse w-16 h-16 sm:w-20 sm:h-20 bg-[#00f0ff] text-[#000000] flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span className="px-3 py-1 bg-[#000000] text-[#ffffff] text-[13px] font-bold uppercase tracking-wider">
                  {currentTime > 0 && currentTime < duration
                    ? "Continuar explicación"
                    : `Ver explicación completa · ${formatTime(duration)}`}
                </span>
              </div>
            )}

            {/* Dynamic VSL Captions (shown in mockup mode when no MP4 is set) */}
            {!VSL_VIDEO_URL && (
              <div
                key={beat.atSeconds}
                className="vsl-beat-enter max-w-[780px] space-y-2 sm:space-y-3 pointer-events-none"
              >
                <p className="text-[20px] sm:text-[32px] lg:text-[40px] font-bold uppercase leading-[0.98] tracking-[-0.02em] text-[#ffffff]">
                  {beat.headline}
                </p>
                <p className="text-[15px] sm:text-[19px] font-normal leading-[1.4] text-[#ffffff]/90 max-w-[58ch] mx-auto">
                  {beat.caption}
                </p>
                {beat.emphasis && (
                  <p className="inline-block px-3 py-1 bg-[#00f0ff] text-[#000000] text-[14px] sm:text-[16px] font-bold uppercase tracking-wide">
                    {beat.emphasis}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Bottom Scrubber & Controls */}
          <div className="absolute bottom-0 inset-x-0 z-20 bg-[#000000]/85 px-4 py-3 sm:px-6">
            <div
              onClick={handleScrub}
              role="slider"
              aria-label="Progreso del video"
              aria-valuemin={0}
              aria-valuemax={Math.floor(duration)}
              aria-valuenow={Math.floor(currentTime)}
              tabIndex={0}
              className="w-full h-2.5 bg-[#333333] cursor-pointer mb-2.5 relative"
            >
              <div
                className="h-full bg-[#00f0ff] transition-[width] duration-150"
                style={{ width: `${progressPct}%` }}
              />
              {/* Chapter markers */}
              {VSL_CHAPTERS.slice(1).map((ch) => (
                <span
                  key={ch.id}
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 w-[2px] bg-[#000000]"
                  style={{
                    left: `${(ch.startSeconds / VSL_TOTAL_SECONDS) * 100}%`,
                  }}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] sm:text-[14px]">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="font-bold uppercase tracking-wider text-[#00f0ff] hover:underline cursor-pointer"
                >
                  {isPlaying ? "Pausar" : "Reproducir"}
                </button>
                <span className="text-[#ffffff]/80 tabular-nums">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <button
                type="button"
                onClick={onOpenReservation}
                className="px-3.5 py-1.5 bg-[#00f0ff] text-[#000000] font-bold uppercase text-[13px] tracking-wide hover:bg-[#ffffff] transition-colors cursor-pointer"
              >
                Reservar Pase Fundador
              </button>
            </div>
          </div>
        </div>

        {/* 4 Interactive Chapter Tabs below Video */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mt-3">
          {VSL_CHAPTERS.map((ch, idx) => {
            const isActive = idx === chapterIndex;
            const targetSeconds =
              (ch.startSeconds / VSL_TOTAL_SECONDS) * duration;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => seekTo(targetSeconds, true)}
                className={`text-left p-4 transition-colors cursor-pointer border ${
                  isActive
                    ? "bg-[#00f0ff] text-[#000000] border-[#00f0ff]"
                    : "bg-[#141414] text-[#ffffff] border-[#2a2a2a] hover:border-[#00f0ff]"
                }`}
              >
                <span className="block text-[13px] font-bold uppercase tracking-wider opacity-80">
                  {ch.code} · {formatTime(targetSeconds)}
                </span>
                <span className="block mt-1 text-[16px] font-bold leading-snug">
                  {ch.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Mini-VSL Dock when scrolling down while playing */}
      {showFloatingDock && (
        <aside
          aria-label="Reproductor flotante Vital Fit"
          className="vf-dock-enter fixed bottom-4 right-4 z-40 w-[300px] sm:w-[340px] bg-[#000000] text-[#ffffff] border-2 border-[#00f0ff] p-3.5 shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[13px] font-bold uppercase tracking-wider text-[#00f0ff]">
              {chapter.code} · {formatTime(currentTime)}
            </span>
            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                type="button"
                onClick={togglePlay}
                className="px-2 py-0.5 bg-[#00f0ff] text-[#000000] text-[13px] font-bold uppercase cursor-pointer"
              >
                {isPlaying ? "Pausar" : "Play"}
              </button>
              <button
                type="button"
                onClick={() => setDockDismissed(true)}
                aria-label="Cerrar reproductor flotante"
                className="px-2 py-0.5 text-[#ffffff]/75 hover:text-[#ffffff] text-[13px] font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>
          <p className="text-[14px] font-bold leading-snug line-clamp-2">
            {beat.headline}
          </p>
          <div className="mt-2.5 flex items-center justify-between gap-2">
            <a
              href="#vsl-video"
              className="text-[13px] font-medium underline text-[#ffffff]/85 hover:text-[#00f0ff]"
            >
              Volver al video
            </a>
            <button
              type="button"
              onClick={onOpenReservation}
              className="text-[13px] font-bold uppercase text-[#00f0ff] hover:underline cursor-pointer"
            >
              Quiero mi plaza →
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
